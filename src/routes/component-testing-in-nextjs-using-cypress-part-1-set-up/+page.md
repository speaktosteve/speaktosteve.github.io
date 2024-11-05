---
heading: 'Component testing in Next.js using Cypress - Part 1 - Set up'
description: 'First part in a full explainer for setting up and writing component tests for Next.js using Cypress'
date: '2024-10-25'
tags: ['next.js', 'component testing', 'cypress', 'automated testing']
references: [{
    "type": "repo", 
    "link": "https://github.com/speaktosteve/nextjs-cypress",
    "title": "Reference repo",
  },
  {
    "type": "external", 
    "link": "https://nextjs.org/docs/app/building-your-application/configuring/environment-variables",
    "title": "Next.js docs",
  },
  {
    "type": "external", 
    "link": "https://docs.cypress.io",
    "title": "Cypress docs",
  },

]
---

## Overview

There is enough material out there that covers the value of automated testing, the [test pyramid](https://martinfowler.com/articles/practical-test-pyramid.html), the [terrible test hourglass](https://testing.googleblog.com/2020/11/fixing-test-hourglass.html), so I wont preach here.

What I want to provide is a practical guide, on how to set up your Next.js app to included focussed component tests, for server and client rendered flavours.

Component tests, like standard unit tests, should be rapid and only test the target code, i.e. not any external dependencies. Like unit tests, they should avoid instigating things like network calls, database writes etc. 

In this article we are going to:

- set up a simple, API-fed, client-side component in a new Next.js application
- add Cypress and set up a component test

In subsequent articles we are going to build on this to:

- use interceptors to allow us to test how the component reacts to various API responses
- get it to work without a network connection
- get test coverage over our server-side components 👍

---

## Setup Next.js app

The usual Next.js setup, with all the defaults: https://nextjs.org/docs/getting-started/installation

```bash
npx create-next-app@latest
```

Now create a couple of files. I want to architect this in a realistic way, so we'll have a:

- client-side component that is responsible for rendering some products
- a custom hook that is responsible for handling the collecting of product data along with loading and error states
- a basic API service for fetching the data from an external API

...which will have this structure:

```md
src
└───app
    └─── components
        └─── products.tsx
    └─── hooks
        └───useProducts.tsx
    └─── types
        └─── product.ts
    └─── utils
        └─── api.ts
    └─── page.tsx

```

Here are the main files you will need to add/update, you can leave the rest of the app alone for now.


```tsx
//src/app/components/products.tsx

"use client"

import Image from "next/image";
import { useProducts } from "../hooks/useProducts";

export const Products = () => {
    const { products, isLoading, isError } = useProducts();
    
    return (
        <section>
        <h1 className="text-xl pb-4">Products</h1>
        <ul className="grid md:grid-cols-2">
            {isLoading && <p>Loading...</p>}
            {isError && <p>Something went wrong...</p>}
            {products && products.length === 0 && <p>No products found</p>}
            {products && products.map((product) => (
                <li key={product.id} className="border rounded m-4 p-8">
                    <h2>{product.title}</h2>
                    <p>{product.price}</p>
                    <p>{product.category}</p>   
                    <p>{product.description}</p>
                    <Image src={product.image} alt={product.title} width={100} height={100} />
                </li>
            ))}
        </ul>
        </section>
    );
}
```

```tsx
//src/app/hooks/useProducts.ts

import { useEffect, useState } from "react";

import { getProducts } from "../utils/api";
import { IProduct } from "../types/product";


export const useProducts = () => {
    const [products, setProducts] = useState<IProduct[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                setProducts(products);
            }
            catch (error: unknown) {
                console.error("Error fetching products", error);
                setIsError(true);
            }
            setIsLoading(false);
        };

        fetchProducts();
    }, []);

    return { products, isLoading, isError };
}
```


```tsx
//src/app/types/product.ts

export interface IProduct {
    id:number;
    title:string;    
    price:string;
    category:string;
    description:string;
    image:string;
}
```

```tsx
//src/app/utils/api.ts

import { IProduct } from "../types/product";

export const getProducts = async (): Promise<IProduct[]> => {
    return (await fetch('https://fakestoreapi.com/products')).json();
}

```

Finally, we we are going to update the root `main.tsx` to reference our new `Products` component:

```tsx
import { Products } from "./components/products";

const Home = () => {
  return (
    <div className="mx-auto py-8 w-3/4">
      <Products />
    </div>
  )
}


export default Home;
```

In summary we now have:
 - products.tsx - a client component that renders a list of products retrieved using the useProducts hook
 - useProducts.ts - a custom hook responsible for handling the state of the retrieved products
 - product.ts - a simple interface defining our Product object
 - api.ts - a simple service for fetching products from the very useful https://fakestoreapi.com

## Run the Next.js app

Now we have our components in place, its time to install the packages:


```bash
npm i
```

and then test run the app:


```bash
npm run dev
```

Navigate to http://localhost:3000/ and you should have a site that looks like:

<a href="/post-assets/5/1.png" target="_blank">
<img src="/post-assets/5/1.png" alt="Running Next.js app" />
</a>

-----


## Writing our first component test

Now we want to cover our client-side component with some simple tests. We are going to leverage the very popular [Cypress](https://www.cypress.io/) testing library to allow us to quickly set up and run our tests.

Following the [Next.js docs for setting up Cypress](https://nextjs.org/docs/pages/building-your-application/testing/cypress)
from 

### Install Cypress

```bash
npm i -D cypress
```

Add the command to `packages.json`

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "cypress:open": "cypress open"
  }
}
```

And then run Cypress for the first time:

```bash
npm run cypress:open
```

You should see that Cypress will launch, offering you something like the following options:

<a href="/post-assets/5/2.png" target="_blank">
<img src="/post-assets/5/2.png" alt="Cypress interface" />
</a>

For this first component we want to configure **Component Testing**. This will create the `cypress.config.js` file and allow us to execute focussed tests on our client-side `Products` component.

Once you have chosen **Component Testing** select **Next.js** as the front-end framework and move through the setup.

<a href="/post-assets/5/3.png" target="_blank">
<img src="/post-assets/5/3.png" alt="Cypress interface" />
</a>

### Executing Cypress

Finally, choose how you wish to view and execute your tests:

<a href="/post-assets/5/4.png" target="_blank">
<img src="/post-assets/5/4.png" alt="Cypress interface" />
</a>

<div class="border p-4 not-italic">
<strong>Side Note</strong>

I typically choose the very rapid <strong>Electron</strong> browser which comes built-in to Chromium (used by Cypress as the environment for exectuting our tests) if I want the shiny interface.

Alternatively I use the command line if I want to use my VS Code terminal, adding the `cypress:run-component` command to the `packages.json` file:

```bash
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "cypress:open": "cypress open",
    "cypress:run-component": "cypress run --component"
  }  
}
```

And executing:

```bash
npm run cypress:run-component
```
</div>

You should now be up and running, with Cypress in its starting state:

<a href="/post-assets/5/5.png" target="_blank">
<img src="/post-assets/5/5.png" alt="Cypress interface" />
</a>

Cypress has a very convenient **Create from component** option for generating our first test specification - lets do that:

<a href="/post-assets/5/6.png" target="_blank">
<img src="/post-assets/5/6.png" alt="Cypress interface" />
</a>

And select our `Products` component:



Click through and you should have Cypress generating the test specification for you. Its conveniently added the `productsProducts.tsx` file containing the scaffolding for our first test.

<a href="/post-assets/5/7.png" target="_blank">
<img src="/post-assets/5/7.png" alt="Cypress interface" />
</a>

I'm going to rename it to `products.cy.txt` because I am precious/weird like that. We should now have the following structure:

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
import React from 'react'
import { Products } from './products'

describe('<Products />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Products />)
  })
})
```

Now, when you look at the Cypress window, you should see the **products** specification in the **Specs** section:

<a href="/post-assets/5/8.png" target="_blank">
<img src="/post-assets/5/8.png" alt="Cypress interface" />
</a>

Selecting the **products** specification, Cypress will run the tests and display the results:

<a href="/post-assets/5/9.png" target="_blank">
<img src="/post-assets/5/9.png" alt="Cypress interface showing test execution" />
</a>

If we change the test file, chacking that the header text is as expected:

```tsx
import React from 'react'
import { Products } from './products'

describe('<Products />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Products />)
    cy.get('h1').should('have.text', 'Products')
  })
})
```

Save that change and we can see the specification automatically re-run:

<a href="/post-assets/5/10.png" target="_blank">
<img src="/post-assets/5/10.png" alt="Cypress interface showing test execution" />
</a>


----

https://docs.cypress.io/app/guides/network-requests

https://docs.cypress.io/api/commands/intercept


### TODO

intercepts

screen shots

server component testing

CI/CD  and reporting
