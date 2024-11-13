---
heading: 'Component testing in Next.js using Cypress - Part 2 - Intercepting network requests'
description: 'This is the second part in a series of articles explaining how to set up and write component tests for Next.js using Cypress. It describes the benefits of intercepting network requests and how to set it up.'
date: '2024-11-05'
tags: ['next.js', 'component testing', 'cypress', 'automated testing']
references: [{
    "type": "repo", 
    "link": "https://github.com/speaktosteve/nextjs-cypress-part1-and-part2",
    "title": "Reference repo",
  },
  {
    "type": "internal", 
    "link": "/component-testing-in-nextjs-using-cypress-part-1-set-up",
    "title": "Component testing in Next.js using Cypress - Part 1 - Set up",
  },
  {
    "type": "external", 
    "link": "https://nextjs.org/docs",
    "title": "Next.js docs",
  },
  {
    "type": "external", 
    "link": "https://docs.cypress.io/api/commands/intercept",
    "title": "Cypress docs - intercept method",
  },
    {
        "type": "external", 
    "link": "https://www.cypress.io/blog/cypress-component-testing-for-developers",
    "title": "Cypress blog - What Cypress Component Testing Means for Developers",
    
  },

]
---
## Table of Contents

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [Overview](#overview)
- [Stubbing network responses](#stubbing-network-responses)
- [Setup](#setup)
- [Introducing cy.intercept()](#introducing-cyintercept)
- [Test for non-success HTTP status codes and timeouts](#test-for-non-success-http-status-codes-and-timeouts)
   * [Non-success status codes](#non-success-status-codes)
   * [Network errors](#network-errors)
   * [Timeouts](#timeouts)
- [Other features of cy.intercept](#other-features-of-cyintercept)
- [References](#references)

<!-- TOC end -->

---

<!-- TOC --><a name="overview"></a>
### Overview

My team often works on component-centric projects, building component libraries and using frameworks such as Storybook to present each component in isolation, in all of its various states.

Using component tests on these types of projects is vital, we need fast, repeatable automated tests to ensure that our components are functioning and appearing correctly.


<div class="border p-4 not-italic">
<p>
Refer to the previous article this series, which details how to set up an example Next.js application with Cypress and how to get started with running and viewing component tests: <a href="/component-testing-in-nextjs-using-cypress-part-1-set-up">Component testing in Next.js using Cypress - Part 1 - Set up</a>.
</p>
<p>
Also see <a href="/component-testing-in-nextjs-using-cypress-part-3-server-components">Component testing in Next.js using Cypress - Part 3 - Server components</a> for a guide on server component testing.
</p>
</div>

Component tests, like standard unit tests, should be rapid and only test the target code, i.e. not any external dependencies. Like unit tests, they should avoid instigating network calls, database writes, etc. 

In this article we are going to:

- build out a test specification for our **Products** client-side component
- introduce the **intercept** method to gain fine-grained control of the data passed into our component. This allows us to test how the component reacts to various API responses

---

<!-- TOC --><a name="stubbing-network-responses"></a>
### Stubbing network responses

An end-to-end (e2e) test is one that drives your code in the same way that a real user would, resulting in real HTTP requests to APIs. This type of test provides a good level of confidence that your system is working as a whole.

However, in a complex system, running e2e tests across all user journeys, both happy and sad, becomes hard to manage. 

e2e tests involve seeding different test data for different test scenarios, they are typically slow to run and make testing edge cases and failure states a headache. They can have a monetary impact too - imagine sending real SMS notifications every time a test runs, or causing some infrastructure to have to scale to handle the fake traffic you are generating**

** In reality you should not be running these e2e tests at scale without understanding and planning for the impact on your infrastructure and external providers. It does happen though! A lot!

The Cypress docs [Network Requests article](https://docs.cypress.io/app/guides/network-requests) recommends that you have end-to-end tests around the critical paths of your application. 

The rest of the time the use of stubbed responses is ideal, allowing you to control the data entering your component and ensure that the component is reacting correctly.

`cy.intercept()` can be used to control all aspects of an HTTP response, headers, status code, and the body. We can also add delays to simulate latency.

<!-- TOC --><a name="setup"></a>
### Setup

For this article, I will assume you have a Next.js app set up as per [the previous article in this series](/component-testing-in-nextjs-using-cypress-part-1-set-up). 

The main focus is on the **products.cy.tsx** specification which tests a client-side component driven with data fetched from an external API.

I will refer to the files created in the previous article, the structure is:

```md
src
└───app
    └─── components
        └─── products.cy.tsx
        └─── products.tsx
    └─── hooks
        └───useProducts.tsx
    └─── types
        └─── product.ts
    └─── utils
        └─── api.ts

```
With the `products.cy.tsx` file looking like:

```tsx
//src/app/components/products.cy.tsx

import React from 'react'
import { Products } from './products'

describe('Tests for the <Products /> component', () => {
  it('renders component', () => {
    cy.mount(<Products />)
  })
  // test that the component shows the correct header
   it('renders header', () => {
    cy.mount(<Products />)
    cy.get('h1').should('have.text', 'Products')
  })
  // test that the component shows a loading message
  it('shows loading message', () => {
    cy.mount(<Products />)
    cy.contains('Loading...').should('be.visible')
  })
  // test that the component renders the products
  it('renders at least one item', () => {
    cy.mount(<Products />)
    cy.get('li').should('have.length.gt', 0)
  })
  // test that the component renders the product title
  it('renders a product title', () => {
    cy.mount(<Products />)
    cy.get('li').first().get('h2').should('exist').invoke('text').should('not.be.empty')
  })
  // test that the component renders some product details
  it('renders product details', () => {
    cy.mount(<Products />)
    cy.get('li') 
    .first() 
    .find('p')
    .should('have.length', 3)         
    .each(($p) => {                   
      cy.wrap($p)                     
        .invoke('text')               
        .should('not.be.empty');      
    });
  })
})
```

<!-- TOC --><a name="introducing-cyintercept"></a>
### Introducing cy.intercept()

Running the above we can see that the tests are passing. We can also see that the external API is getting hit.

Spot the `(fetch)GET https://fakestoreapi.com/products` outputted to the log with the purple icon next to it:

<a href="/post-assets/6/1.png" target="_blank">
<img src="/post-assets/6/1.png" alt="Cypress interface showing test execution" />
</a>

Also note the execution time is a whopping 953ms (this is a fresh request, before any responses were cached).

Right now, every time we run these tests, data is being retrieved from the external API. This is the end-to-end behaviour that we want to avoid - we need to use our first `cy.intercept()`.

Firstly, add a `beforeEach` step to the tests. This will execute before each step. It basically avoids you writing the same code for every test.

```tsx
import React from 'react'
import { Products } from './products'

describe('Tests for the <Products /> component', () => {
  beforeEach(() => {
    cy.log('Adding intercept to return stubbed data')
  })
  it('renders component', () => {
    cy.mount(<Products />)
  })
  // test that the component shows the correct header
   it('renders header', () => {
    cy.mount(<Products />)
    cy.get('h1').should('have.text', 'Products')
  })
  // test that the component shows a loading message
  it('shows loading message', () => {
    cy.mount(<Products />)
    cy.contains('Loading...').should('be.visible')
  })
  // test that the component renders the products
  it('renders at least one item', () => {
    cy.mount(<Products />)
    cy.get('li').should('have.length.gt', 0)
  })
  // test that the component renders the product title
  it('renders product title', () => {
    cy.mount(<Products />)
    cy.get('li').first().get('h2').should('exist').invoke('text').should('not.be.empty')
  })
  // test that the component renders the product details
  it('renders product details', () => {
    cy.mount(<Products />)
    cy.get('li') 
    .first() 
    .find('p')
    .should('have.length', 3)         
    .each(($p) => {                   
      cy.wrap($p)                     
        .invoke('text')               
        .should('not.be.empty');      
    });
  })
})
```

You should be able to see the corresponding log in the Cypress interface:

<a href="/post-assets/6/2.png" target="_blank">
<img src="/post-assets/6/2.png" alt="Cypress interface showing test execution" />
</a>

Now, the important stuff. Add the following file name `fakeProducts.json` to the `/cypress/fixtures` folder:

```json
[
    {
        "id": 1,
        "title": "Fake Product From The Stubbed Data",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
    },
    {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
            "rate": 4.1,
            "count": 259
        }
    }    
]
```

And add the following to the `beforeEach()` method:

```tsx
    cy.intercept('GET', 'https://fakestoreapi.com/products', { fixture: 'fakeProducts.json' })
```

The above line will register our interceptor. Cypress will then intercept requests to "https://fakestoreapi.com/products" and return the JSON found in the corresponding file.

After a new run, we can spot a couple of differences:

<a href="/post-assets/6/3.png" target="_blank">
<img src="/post-assets/6/3.png" alt="Cypress interface showing test execution" />
</a>

The 'ROUTES' output confirms that we are now hitting the stubbed API, we can also see in the visual that the test data is coming back (spot the 'Fake Product....' item). Also, the entire run was substantially faster than before.

<!-- TOC --><a name="test-for-non-success-http-status-codes-and-timeouts"></a>
### Test for non-success HTTP status codes and timeouts

Now we have stubbing set up it would be good to add some more tests around our component. We want to make sure the component handles a situation where the external API is not available, having a bad day, or not being as responsive as we would like.

<!-- TOC --><a name="non-success-status-codes"></a>
#### Non-success status codes

We want our component to display a catch-all 'something went wrong fetching the data' message if a fetch operation to our API fails. This is hard to test for with end-to-end tests, but the work of a moment if we are using `cy.intercept()`.

Let's move the API URL to a constant, so we arent repeating ourselves:

```tsx
const apiURL = 'https://fakestoreapi.com/products'
```

And create a new test, to re-define an interceptor to return a stubbed response with an error status code and expect that an error message is displayed:

```tsx
  // test that the component shows an error message if the API call failsß
  it('shows error message', () => {
    // set up the API call to return a 500 status code
    cy.intercept('GET', apiURL, {
      statusCode: 500
    })
    
    cy.mount(<Products />)
    
    cy.contains('Something went wrong...').should('be.visible')
  })
```

The entire file should look like this:

```tsx
//src/app/components/products.cy.tsx
import React from 'react'
import { Products } from './products'

const apiURL = 'https://fakestoreapi.com/products'

describe('Tests for the <Products /> component', () => {
  beforeEach(() => {
    cy.log('Adding interceptor to return stubbed data')
    cy.intercept('GET', apiURL, { fixture: 'fakeProducts.json' })
  })
  it('renders component', () => {
    cy.mount(<Products />)
  })
  // test that the component shows the correct header
   it('renders header', () => {
    cy.mount(<Products />)
    cy.get('h1').should('have.text', 'Products')
  })
  // test that the component shows a loading message
  it('shows loading message', () => {
    cy.mount(<Products />)
    cy.contains('Loading...').should('be.visible')
  })
  // test that the component renders the products
  it('renders at least one item', () => {
    cy.mount(<Products />)
    cy.get('li').should('have.length.gt', 0)
  })
  // test that the component renders the product title
  it('renders product title', () => {
    cy.mount(<Products />)
    cy.get('li').first().get('h2').should('exist').invoke('text').should('not.be.empty')
  })
  // test that the component renders the product details
  it('renders product details', () => {
    cy.mount(<Products />)
    cy.get('li') 
    .first() 
    .find('p')
    .should('have.length', 3)         
    .each(($p) => {                   
      cy.wrap($p)                     
        .invoke('text')               
        .should('not.be.empty');      
    });
  })
  // test that the component shows an error message if the API call failsß
  it('shows error message if the API returns a 500 status code', () => {
    // set up the API call to return a 500 status code
    cy.intercept('GET', apiURL, {
      statusCode: 500
    })
    
    cy.mount(<Products />)
    
    cy.contains('Something went wrong...').should('be.visible')
  })
})
```

When the test is run, we can see the new 'shows error message'. This time there are two entries in the routes table, the first is the one defined in the `beforeAll` method, the second is the one defined in the new test.

We can also see that the fetch method is returning a 500 and the error message is displayed in the visual - proof that our interceptor is working.

<a href="/post-assets/6/4.png" target="_blank">
<img src="/post-assets/6/4.png" alt="Cypress interface showing test execution" />
</a>

<!-- TOC --><a name="network-errors"></a>
#### Network errors

Imagine that the network connection fails, something that is common when browsing on a mobile device. The end result on the component might be the same - a generic "something went wrong" message is displayed - but the cause is different to the previous 500 status code, so we want to test for this unhappy path as well.

```tsx
    // test that the component shows an error message if there is a network error
    it('shows error message if there is a network error', () => {
        cy.intercept('GET', apiURL, { forceNetworkError: true }).as('err')
        // assert that this request happened
        cy.mount(<Products />)
        cy.contains('Something went wrong...').should('be.visible')
        // and that it ended in a network error
        cy.wait('@err').should('have.property', 'error')
    })
```

A few new things are happening here:

```tsx
cy.intercept('GET', apiURL, { forceNetworkError: true }).as('err')
```

`cy.intercept` is used to intercept the GET request to the API with `{ forceNetworkError: true }` used to force this request to fail, simulating a network error.
`.as('err')` gives this intercepted request the alias 'err' so it can be referenced later.


```tsx
cy.wait('@err').should('have.property', 'error')
```

`cy.wait('@err')` waits for the GET request to apiURL to complete. Since this request is set to fail, Cypress expects an error.
.should('have.property', 'error') verifies that the intercepted request has an error property, confirming the network error occurred as intended.


<!-- TOC --><a name="timeouts"></a>
#### Timeouts

On many web and native apps you would have seen a message displayed if the app is deems that its taking too long to retrieve and display some information, e.g. 'Sorry, this is taking longer than expected'. Testing for this type of network latency is pretty hard in standard end-to-end automated tests, but not if we fake it using our interceptor!

Firstly, update our custom hook to handle a state if the data retrieval from the API is taking longer than 5 seconds:

```tsx
//src/app/hooks/useProducts.ts

import { useEffect, useState } from "react";
import { getProducts } from "../utils/api";
import { IProduct } from "../types/product";

export const useProducts = () => {
    const [products, setProducts] = useState<IProduct[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingTooSlow, setIsLoadingTooSlow] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const slowLoadingTolerance = 5000; // 5 seconds

    useEffect(() => {
        const fetchProducts = async () => {
            const slowLoadingTimer = setTimeout(() => {
                setIsLoadingTooSlow(true);
            }, slowLoadingTolerance); // 5 seconds delay

            try {
                const products = await getProducts();
                setProducts(products);
            }
            catch (error: unknown) {
                console.error("Error fetching products", error);
                setIsError(true);
            } finally {
                clearTimeout(slowLoadingTimer); // clear timer if fetch completes
                setIsLoading(false);
                setIsLoadingTooSlow(false); // Reset to false when response arrives
            }
        };

        fetchProducts();
    }, []);

    return { products, isLoading, isLoadingTooSlow, isError };
};

```

What's new?
 - A `slowLoadingTimer` is set with a setTimeout function to delay setting isLoadingTooSlow to true after 5 seconds.
 - If `getProducts` completes within 5 seconds, the timeout is cleared, and `isLoadingTooSlow` remains false.
 - Once the response is received or an error occurs, `isLoadingTooSlow` is reset to false, and `isLoading` is also set to false.

Next, update our component to react to this `isLoadingTooSlow` state, displaying a "This is taking longer than expected..." message if the flag is true:

```tsx
//src/app/components/products.tsx

'use client'

import Image from 'next/image'
import { useProducts } from '../hooks/useProducts'

export const Products = () => {
    const { products, isLoading, isError, isLoadingTooSlow } = useProducts()

    return (
        <section>
            <h1 className="text-xl pb-4">Products</h1>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Something went wrong...</p>}
            {isLoadingTooSlow && <p>This is taking longer than expected...</p>}
            {products && products.length === 0 && <p>No products found</p>}
            <ul className="grid md:grid-cols-2">
                {products &&
                    products.map((product) => (
                        <li key={product.id} className="border rounded m-4 p-8">
                            <h2>{product.title}</h2>
                            <p>{product.price}</p>
                            <p>{product.category}</p>
                            <p>{product.description}</p>
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={100}
                                height={100}
                            />
                        </li>
                    ))}
            </ul>
        </section>
    )
}

```

For a situation where the request is taking longer than the tolerance, the user should see:

<a href="/post-assets/6/5.png" target="_blank">
<img src="/post-assets/6/5.png" alt="Cypress interface showing test execution" />
</a>

 We can then write a new test to ensure that the "This is taking longer than expected..." message is displayed if the response takes longer than the tolerated time.

```tsx
 // test that the component shows a message if the API call takes too long
  it('shows slow loading message', {
      // set the default timeout to 10 seconds, so this test doesnt time out
      defaultCommandTimeout: 20000
    }, () => {
    // set up the API call to delay for 6 seconds
    cy.intercept('GET', apiURL, {
      delay: 10000
    })
    
    cy.mount(<Products />)
    
    cy.contains('This is taking longer than expected...').should('be.visible')
  })
```

Note the following addition to the test declaration:

```tsx
{
  // set the default timeout to 10 seconds, so this test doesn't time out
  defaultCommandTimeout: 20000
}
```

We are updating the default duration (just for this test) that Cypress will wait until it deems the test to have timed out - i.e. the amount of time allowed for our `cy.contains('This is taking longer than expected...').should('be.visible')` assertion to be true. Without this, the test will timeout before the message appears.

Like the previous test, we are defining the interceptor for our API request, this time adding a delay of 10 seconds before a response is returned. We aren't concerned with the response from the API for this test, just that the component reacts to this latency in the correct way.

The final test file looks like this:

```tsx
//src/app/components/products.cy.tsx
import React from 'react'
import { Products } from './products'

const apiURL = 'https://fakestoreapi.com/products'

describe('Tests for the <Products /> component', () => {
    beforeEach(() => {
        cy.log('Adding interceptor to return stubbed data')
        cy.intercept('GET', apiURL, { fixture: 'fakeProducts.json' })
    })
    it('renders component', () => {
        cy.mount(<Products />)
    })
    // test that the component shows the correct header
    it('renders header', () => {
        cy.mount(<Products />)
        cy.get('h1').should('have.text', 'Products')
    })
    // test that the component shows a loading message
    it('shows loading message', () => {
        cy.mount(<Products />)
        cy.contains('Loading...').should('be.visible')
    })
    // test that the component renders the products
    it('renders at least one item', () => {
        cy.mount(<Products />)
        cy.get('li').should('have.length.gt', 0)
    })
    // test that the component renders the product title
    it('renders product title', () => {
        cy.mount(<Products />)
        cy.get('li')
            .first()
            .get('h2')
            .should('exist')
            .invoke('text')
            .should('not.be.empty')
    })
    // test that the component renders the product details
    it('renders product details', () => {
        cy.mount(<Products />)
        cy.get('li')
            .first()
            .find('p')
            .should('have.length', 3)
            .each(($p) => {
                cy.wrap($p).invoke('text').should('not.be.empty')
            })
    })
    // test that the component shows an error message if the API call fails
    it('shows error message if the API returns a 500 status code', () => {
        // set up the API call to return a 500 status code
        cy.intercept('GET', apiURL, {
            statusCode: 500,
        })

        cy.mount(<Products />)

        cy.contains('Something went wrong...').should('be.visible')
    })
    // test that the component shows an error message if there is a network error
    it('shows error message if there is a network error', () => {
        cy.intercept('GET', apiURL, { forceNetworkError: true }).as('err')
        // assert that this request happened
        cy.mount(<Products />)
        cy.contains('Something went wrong...').should('be.visible')
        // and that it ended in a network error
        cy.wait('@err').should('have.property', 'error')
    })
    // test that the component shows a message if the API call takes too long
    it(
        'shows slow loading message',
        {
            // set the default timeout to 10 seconds, so this test doesn't time out
            defaultCommandTimeout: 20000,
        },
        () => {
            // set up the API call to delay for 6 seconds
            cy.intercept('GET', apiURL, {
                delay: 10000,
            })

            cy.mount(<Products />)

            cy.contains('This is taking longer than expected...').should(
                'be.visible'
            )
        }
    )
})

```

Note, you can find the full code here: https://github.com/speaktosteve/nextjs-cypress-part1-and-part2

<!-- TOC --><a name="other-features-of-cyintercept"></a>
### Other features of cy.intercept

With the use of the `cy.intercept` you can also:

 - stub outgoing requests, to remove outbound traffic from your target code
 - use middleware to fake add auth headers that your external API is expected to add - https://docs.cypress.io/api/commands/intercept#Passing-a-request-to-the-next-request-handler
 - see official docs for lots more: https://docs.cypress.io/api/commands/intercept

---

<!-- TOC --><a name="references"></a>
### References