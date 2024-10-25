---
heading: 'Component testing in Next.js using Cypress and Cypress Intercept'
description: ''
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

Component tests, like standard unit tests, should be rapid and only test the target code, i.e. not any external dependencies. Like unit tests, they should not result in things like network calls, database writes etc. 

We are going to:

- set up a simple, API-fed, client-side component in a new Next.js application
- add Cypress and set up a component test
- add interceptors to allow us to test how the component reacts to various API responses
- get it to work without a network connection

We also want to do the above with a server-side component 👍

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

```


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


from https://nextjs.org/docs/pages/building-your-application/testing/cypress

install cypress

```bash
npm install -D cypress
# or
yarn add -D cypress
# or
pnpm install -D cypress
```

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


```bash
npm run cypress:open
```


https://docs.cypress.io/app/guides/network-requests

https://docs.cypress.io/api/commands/intercept




----

### Runtime Environment Variables
