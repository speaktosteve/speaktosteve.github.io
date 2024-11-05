---
heading: 'Component testing in Next.js using Cypress - Part 2 - Intercepting network requests'
description: 'The second part in a series of articles explaining how to set up and write component tests for Next.js using Cypress. It describes the benefits of intercepting network requests and how to set it up.'
date: '2024-10-25'
tags: ['next.js', 'component testing', 'cypress', 'automated testing']
references: [{
    "type": "repo", 
    "link": "https://github.com/speaktosteve/nextjs-cypress",
    "title": "Reference repo",
  },
  {
    "type": "internal", 
    "link": "/component-testing-in-nextjs-using-cypress-part-1-set-up",
    "title": "Component testing in Next.js using Cypress - Part 1 - Set up",
  },
  {
    "type": "external", 
    "link": "https://nextjs.org/docs/app/building-your-application/configuring/environment-variables",
    "title": "Next.js docs",
  },
  {
    "type": "external", 
    "link": "https://docs.cypress.io/api/commands/intercept",
    "title": "Cypress docs - intercept method",
  },

]
---

## Overview

There is enough material out there that covers the value of automated testing, the [test pyramid](https://martinfowler.com/articles/practical-test-pyramid.html), and the [terrible test hourglass](https://testing.googleblog.com/2020/11/fixing-test-hourglass.html), so I won't preach here.

What I want to provide is a practical guide, on how to set up your Next.js app to ßnclude focused component tests, for server and client-rendered flavours.

Component tests, like standard unit tests, should be rapid and only test the target code, i.e. not any external dependencies. Like unit tests, they should avoid instigating network calls, database writes, etc. 

<div class="border p-4 not-italic">
Refer to the previous article this series, which details how to set up an example Next.js application with Cypress and how to get started with running and viewing component tests: <a href="/component-testing-in-nextjs-using-cypress-part-1-set-up">Component testing in Next.js using Cypress - Part 1 - Set up</a>.
</div>

In this article we are going to:

- build out a test specification for our **Products** client-side component
- introduce the the **intercept** method to gain fine-grained control of the data passed into our component. This allows us to test how the component reacts to various API responses

---

## Stubbing network responses

An end-to-end (e2e) test is one that drives your code in the same way that a real user would, resulting in real HTTP requests to APIs. This type of test provides a good level of confidence that your system is working as a whole.

However, in a complex system, running e2e tests across all user journeys, both happy and sad, becomes hard to manage. 

e2e tests involve seeding different test data for different test scenarios, they are typically slow to run and make testing edge cases and failure states a headache. They can have a monetary impact too - imagine sending real SMS notifications every time a test runs, or causing some infrastructure to have to scale to handle the fake traffic you are generating**

** in reality you should not be running these e2e tests at scale without understanding and planning for the impact on your infrastructure and external providers. It does happen though! A lot!

The Cypress docs [Network Requests article](https://docs.cypress.io/app/guides/network-requests) recommends that you have end-to-end tests around the critical paths of your application. 

The rest of the time the use of stubbed responses is ideal, allowing you to control the data entering your component and ensure that the component is reacting correctly.

Using `cy.intercept()` we can control all aspects of an HTTP response, the headers, status code, body. We can also add delays to simulate latency.

## Setup

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
    └─── page.tsx

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

## Introducing cy.intercept()

Running the above we can see that the tests are passing. We can also see that the external API is getting hit.

Spot the `(fetch)GET https://fakestoreapi.com/products` outputted to the log with the purple icon next to it:

<a href="/post-assets/6/1.png" target="_blank">
<img src="/post-assets/6/1.png" alt="Cypress interface showing test execution" />
</a>

Also note the execution time is a whopping 953ms (this is a fresh request, before any responses were cached).

Right now, every time we run these tests, data is being retrieved from the external API. This is the end-to-end behaviour that we want to avoid, so lets introduce our first `cy.intercept()`.

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

The routes output confirms that we are now hitting the stubbed API, we can also see in the visual that the test data is coming back (spot the 'Fake Product....' item). Also, the entire run was substantially faster than before.

