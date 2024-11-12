---
heading: 'Component testing in Next.js using Cypress - Part 3 - Server components'
description: 'This is the third part in a series of articles explaining how to set up and write component tests for Next.js using Cypress. It describes how to cover your server-rendered components with automated tests.'
date: '2024-11-07'
tags: ['next.js', 'component testing', 'cypress', 'automated testing']
references: [{
    "type": "repo", 
    "link": "https://github.com/speaktosteve/nextjs-cypress-part3",
    "title": "Reference repo",
  },
  {
    "type": "internal", 
    "link": "/component-testing-in-nextjs-using-cypress-part-1-set-up",
    "title": "Component testing in Next.js using Cypress - Part 1 - Set up",
  },
    {
    "type": "internal", 
    "link": "/component-testing-in-nextjs-using-cypress-part-2-network-intercepting",
    "title": "Component testing in Next.js using Cypress - Part 2 - Intercepting network requests",
  },
  {
        "type": "external", 
    "link": "https://www.cypress.io/blog/cypress-component-testing-for-developers",
    "title": "Cypress blog - What Cypress Component Testing Means for Developers",
    
  },
  {
    "type": "external", 
    "link": "https://storybook.js.org/docs/get-started/frameworks/nextjs",
    "title": "Storybook for Next.js docs",
  },
  
  {
    "type": "external", 
    "link": "https://www.youtube.com/watch?v=b9LH2gYubSo",
    "title": "Murat Ozcan - test Next.js server components with Cypress component tests",
  },
  

]
---
### Table of Contents

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [Overview](#overview)
- [Create a server component](#create-a-server-component)
- [Create tests](#create-tests)
- [Approach 1 - an end-to-end test pretending to be a component test](#approach-1-an-end-to-end-test-pretending-to-be-a-component-test)
   * [Install Storybook](#install-storybook)
   * [Create a Storybook story](#create-a-storybook-story)
   * [Run Storybook](#run-storybook)
   * [Add custom CSS](#add-custom-css)
   * [Open the component in isolation](#open-the-component-in-isolation)
   * [Summary](#summary)
- [Approach 2 - a true component test using `cy.stub`](#approach-2-a-true-component-test-using-cystub)
   * [Await the loading of the component](#await-the-loading-of-the-component)
   * [Use the `cy.stub` function](#use-the-cystub-function)
   * [Summary](#summary-1)
- [Other possible solutions:](#other-possible-solutions)
- [References](#references)

<!-- TOC end -->

---

<!-- TOC --><a name="overview"></a>
### Overview

My team often works on component-centric projects, building component libraries and using frameworks such as Storybook to present each component in isolation, in all of its various states.

Using component tests on these types of projects is vital, we need fast, repeatable automated tests to ensure that our components are functioning and appearing correctly.

<div class="border p-4 not-italic">
Refer to the previous articles in this series:
<ul>
<li><a href="/component-testing-in-nextjs-using-cypress-part-1-set-up">Component testing in Next.js using Cypress - Part 1 - Set up</a></li>
<li><a href="/component-testing-in-nextjs-using-cypress-part-2-network-intercepting">Component testing in Next.js using Cypress - Part 2 - Intercepting network requests</a></li>
</div>

In the previous articles we have been using Cypress to test **client-rendered** components and used `cy.intercept` to set up different stubbed responses from an API.
For server components its not quite as simple 😔. But dont worry, there are answers 😊! In fact, there are two approaches that I can see, read on to find out...

In this article we are going to:

- expand on the application that we created in [part 1](/component-testing-in-nextjs-using-cypress-part-1-set-up) and [part 2](/component-testing-in-nextjs-using-cypress-part-2-network-intercepting) of this series. The complete code for those two articles can be found here: https://github.com/speaktosteve/nextjs-cypress-part1-and-part2
- add a simple server component to the application
- explore **two options** for adding tests for the server component:
  - `await` the call to the component and use `cy.stub` to stub the API response
  - run our component in a standalone view using Storybook and write an end-to-end test
---

<!-- TOC --><a name="create-a-server-component"></a>
### Create a server component

I'm going to assume you have a Next.js application with Cypress set up. A full guide to setting this up can be found in [this previous article](/component-testing-in-nextjs-using-cypress-part-1-set-up). 

First step is to introduce a simple server component:

```tsx
//src/app/components/productsServer/productsServer.tsx

import { getProducts } from '@/app/utils/api'
import { ProductCard } from '../productCard/productCard'
import { IProduct } from '@/app/types/product'

export const ProductsServer = async () => {
    const response = await getProducts()

    if (!response.ok) {
        return <p>Something went wrong...</p>
    }

    const products: IProduct[] = await response.json()
    return (
        <section>
            <h2 className="text-xl pb-4">Products</h2>
            <ul>
                {products && products.length === 0 && <p>No products found</p>}
                <ul className="grid md:grid-cols-2">
                    {products &&
                        products.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                </ul>
            </ul>
        </section>
    )
}

```

This component displays product data in exactly the same way as our  `<Products />` client component. You will see that:
 - it is imaginatively named `<ProductsServer />` to differentiate it from the `<Products />` client component
 - there is no `use client` declaration, so Next.js will assume this code needs to run on the server
 - its asynchronous
 - it retrieves the data from the same `getProducts()` function as the client component
 
I have incorporated the new component into the app, along with a way to navigate between it and the original client component. You can access the full code in the [reference repo](https://github.com/speaktosteve/nextjs-cypress-part3).

The app structure is now:

```md
src
└───app
    └─── components
      └─── products
        └─── products.cy.tsx
        └─── products.tsx
      └─── productsServer
        └─── productsServer.tsx
      └─── hooks
          └───useProducts.tsx
      └─── types
          └─── product.ts
      └─── utils
          └─── api.ts
      └─── page.

```

And when you run it, it looks like this:

<a href="/post-assets/7/1.png" target="_blank">
<img src="/post-assets/7/1.png" alt="Next.js app" />
</a>

Next step, get some test coverage over our server component...


<!-- TOC --><a name="create-tests"></a>
### Create tests

Starting with a simple Cypress test, I want to ensure the component has loaded correctly...

```tsx
//src/app/components/productsServer/productsServer.cy.tsx
import { ProductsServer } from './productsServer'

describe('Tests for the <ProductsServer /> component', () => {
    it('renders component', () => {
        cy.mount(<ProductsServer />)
    })
})
```
And run the test:

```bash
yarn cypress
```

NB: the above is my alias for `cypress open`

Running this new test in Cypress we see a confusing error:

> Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.

<a href="/post-assets/7/2.png" target="_blank">
<img src="/post-assets/7/2.png" alt="Cypress app showing error" />
</a>

The underlying issue here is that the server component is executing its data fetch asynchronously before returning any content, but the Cypress test is not set up to handle this asynchronous behaviour.

<!-- TOC --><a name="approach-1-an-end-to-end-test-pretending-to-be-a-component-test"></a>
### Approach 1 - an end-to-end test pretending to be a component test

Having looking at the official [Next.js docs on using Cypress](https://nextjs.org/docs/pages/building-your-application/testing/cypress)...

> Cypress currently doesn't support Component Testing for async Server Components. We recommend using E2E testing.

...I moved my focus onto using E2E tests instead of Component tests. This felt like a compromise as I wanted to test the component in memory, without worrying about spinning them up in a browser. This approach does work, but technically its not a component test.

In my research I settled on the following approach:
 - To use E2E tests I needed the component to be available to Cypress's `cy.visit()` method, basically it needs to be viewable in a browser.
 - For this, I decided to use [Storybook](https://storybook.js.org/docs/get-started/frameworks/nextjs), which would allow me to access a component in isolation at a specific URL

<!-- TOC --><a name="install-storybook"></a>
#### Install Storybook

Please checkout the [Storybook docs](https://storybook.js.org/docs/) if you aren't familiar with the tool. Also, the full installation guide for adding Storybook to a Next.js app can be found [here](https://storybook.js.org/docs/get-started/frameworks/nextjs).

I'm going to assume you don't have Storybook installed and are starting from scratch.

Firstly, install Storybook:

```bash
npx storybook@latest init
```

This will add all of the required scaffolding for Storybook, including some sample stories.

<!-- TOC --><a name="create-a-storybook-story"></a>
#### Create a Storybook story

We will now add our first story for the `<ProductsServer />` component. This will allow us access to the isolated component in a browser using Storybook.

I'm adding the story file to the same `src/app/components/productsServer` folder as the component itself.

```ts
//src/app/components/productsServer/productsServer.stories.ts

import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { ProductsServer } from './productsServer'

const meta = {
    title: 'Products (Server Rendered)',
    component: ProductsServer,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        onLogin: fn(),
        onLogout: fn(),
        onCreateAccount: fn(),
    },
} satisfies Meta<typeof ProductsServer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

```

<!-- TOC --><a name="run-storybook"></a>
#### Run Storybook

Then, run Storybook:

```bash
npm run storybook
```

Navigate to the Storybook UI at http://localhost:6006/ and you should see something like this:

<a href="/post-assets/7/4.png" target="_blank">
<img src="/post-assets/7/4.png" alt="Storybook UI" />
</a>

If you navigate to the `Products (Server Rendered)` component (and click on 'Default') you will see an error:

>> async/await is not yet supported in Client Components, only Server Components. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.

<a href="/post-assets/7/5.png" target="_blank">
<img src="/post-assets/7/5.png" alt="Storybook UI" />
</a>

But don't worry! This is simple to fix via the experimental RSC support flag. Enable the `experimentalRSC` feature in your `.storybook/main.ts` file. This provides support for React Server Components:

```ts
import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-onboarding',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    features: {
        experimentalRSC: true,
    },
    staticDirs: ['../public'],
}
export default config

```

If you restart Storybook you should now be able to see the `<ProductsServer />` component:

<a href="/post-assets/7/6.png" target="_blank">
<img src="/post-assets/7/6.png" alt="Storybook UI" />
</a>

<!-- TOC --><a name="add-custom-css"></a>
#### Add custom CSS

Good, but it looks ugly. Lets make sure Storybook loads our CSS in when previewing our components. In `.storybook/preview.ts` simply add a reference to the main .css file:

```ts
// .storybook/preview.ts
import type { Preview } from '@storybook/react'
import './../src/app/globals.css'

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
}

export default preview
```

Now, the CSS will kick in and you can see the component in all of its beautiful glory:

<a href="/post-assets/7/7.png" target="_blank">
<img src="/post-assets/7/7.png" alt="Storybook UI" />
</a>

<!-- TOC --><a name="open-the-component-in-isolation"></a>
#### Open the component in isolation

If you click on the 'Open canvas in new tab' button in the top right...

<a href="/post-assets/7/8.png" target="_blank">
<img src="/post-assets/7/8.png" alt="Storybook UI" />
</a>

...the component will load in its own tab, with no frame or other elements.

<a href="/post-assets/7/9.png" target="_blank">
<img src="/post-assets/7/9.png" alt="Storybook UI" />
</a>

We now have a URL that we can point our Cypress E2E test at for testing our component. It should look a little something like this:

http://localhost:6006/iframe.html?globals=&args=&id=products-server-rendered--default&viewMode=story

#### Add an E2E test

I have chosen to add the E2E test in the same folder as the component. This makes sense to me, unlike traditional E2E tests this is specifically targetting the component. 

To ensure Cypress knows where to look for your E2E component test you will need to tweak the `specPattern` in the `cypress.config.ts` file. The following tells Cypress that specification files can be found within our `src/app/components` folder as well as the usual `cypress/e2e` folder.

```ts
import { defineConfig } from 'cypress'

export default defineConfig({
    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack',
        },
    },

    watchForFileChanges: true,

    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        specPattern: [
            'cypress/e2e/*.{js,ts,jsx,tsx}',
            'src/app/components/**/*.e2e.cy.{js,ts,jsx,tsx}',
        ], // Change this to your preferred folder
    },
})

```

Here is the initial E2E test:

```ts
//src/app/component/productsServer/productsServer.e2e.cy.ts

describe('Tests for the <ProductsServer /> component', () => {
    it('is available', () => {
        cy.visit(
            'http://localhost:6006/iframe.html?globals=&args=&id=products-server-rendered--default&viewMode=story'
        )
    })
})
```

It's a simple check to ensure there is something at the corresponding URL.

If you launch Cypress and navigate to 'E2E Testing':

<a href="/post-assets/7/10.png" target="_blank">
<img src="/post-assets/7/10.png" alt="Storybook UI" />
</a>

You should then see the E2E test passing:

<a href="/post-assets/7/11.png" target="_blank">
<img src="/post-assets/7/11.png" alt="Storybook UI" />
</a>

#### Build out E2E test and add response stubbing

Now lets add some further tests and leverage the same `cy.intercept` function that we use in our client component tests in [part2](/component-testing-in-nextjs-using-cypress-part-2-network-intercepting) of this series.

```ts
//src/app/component/productsServer/productsServer.e2e.cy.ts

const apiURL = 'https://fakestoreapi.com/products'
const componentURL =
    'http://localhost:6006/iframe.html?globals=&args=&id=products-server-rendered--default&viewMode=story'

describe('Tests for the <ProductsServer /> component', () => {
    beforeEach(() => {
        cy.log('Adding interceptor to return stubbed data')
        cy.intercept('GET', apiURL, { fixture: 'fakeProducts.json' })
        cy.visit(componentURL)
    })
    // test that the component shows the correct header
    it('renders header', () => {
        cy.get('h2').should('have.text', 'Products (Server-Rendered)')
    })
    // test that the component renders the products
    it('renders at least one item', () => {
        cy.get('li').should('have.length.gt', 0)
    })
    // test that the component renders the product title
    it('renders product title', () => {
        cy.get('li')
            .first()
            .get('h3')
            .should('exist')
            .invoke('text')
            .should('not.be.empty')
    })
    // test that the component renders the product details
    it('renders product details', () => {
        cy.get('li')
            .find('p')
            .should('exist')
            .invoke('text')
            .should('not.be.empty')
    })
    // test that the component shows an error message if the API call fails
    it('shows error message if the API returns a 500 status code', () => {
        // set up the API call to return a 500 status code
        cy.intercept('GET', apiURL, {
            statusCode: 500,
        })

        cy.visit(componentURL)

        cy.contains('Something went wrong...').should('be.visible')
    })
})

```

In the above you can see that we set up the `cy.intercept` and also the `cy.visit` calls in our `beforeEach` step.

Running the test, we can see it is succeeding:

<a href="/post-assets/7/12.png" target="_blank">
<img src="/post-assets/7/12.png" alt="Storybook UI" />
</a>

There we go a 'sort of' component test for our server-rendered component.

<!-- TOC --><a name="summary"></a>
#### Summary

The main thing is that it works, but I can't help feeling its a bit of a hack.

- its a lot slower than a true Cypress component test
- its involved some tricky setup and adding Storybook (which might not be desirable)
- on the plus side the test itself is very similar to the client component equivalent, same use of `cy.intercept`, so little knowledge to gain if you are already comfortable with that function.

<!-- TOC --><a name="approach-2-a-true-component-test-using-cystub"></a>
### Approach 2 - a true component test using `cy.stub`

**Firstly kudos to [@MuratKeremOzcan](https://www.youtube.com/@MuratKeremOzcan), I leaned on the approach outlined in [his video](https://www.youtube.com/watch?v=b9LH2gYubSo).**


<!-- TOC --><a name="await-the-loading-of-the-component"></a>
#### Await the loading of the component

In order to resolve this, we need to await the loading of the component. Lets make the test `async` and reference the `<ProductsServer />` with an `await`

```tsx
//src/app/components/productsServer/productsServer.cy.tsx
import { ProductsServer } from './productsServer'

describe('Tests for the <ProductsServer /> component', () => {
    it('renders component', async () => {
        cy.mount(await ProductsServer())
    })
})
```

Success! The test is now passing. We are loading the component in using `await ProductServer()` - this works as React components are plain old functions after all.

<a href="/post-assets/7/3.png" target="_blank">
<img src="/post-assets/7/3.png" alt="Cypress app" />
</a>

<!-- TOC --><a name="use-the-cystub-function"></a>
#### Use the `cy.stub` function

Now for the network calls. As with our client component tests, its important for us to be able to control the data coming into our component, so we can test how the component reacts to different responses.

So lets try our initial approach of using `cy.intercept`:

```tsx
//src/app/components/productsServer/productsServer.cy.tsx
import { ProductsServer } from './productsServer'

describe('Tests for the <ProductsServer /> component', () => {
    it('renders component', async () => {
        cy.mount(await ProductsServer())
    })
})
```


metnion alias for json file (or dont use it)

<!-- TOC --><a name="summary-1"></a>
#### Summary
- fast
- easy to set up

<!-- TOC --><a name="other-possible-solutions"></a>
### Other possible solutions:

 - move asynchronous data fetches out of the server component that you want to test


Note, you can find the full code here: https://github.com/speaktosteve/nextjs-cypress-part3

---

<!-- TOC --><a name="references"></a>
### References
