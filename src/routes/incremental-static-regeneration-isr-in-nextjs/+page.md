---
heading: 'Incremental Static Regeneration (ISR) in Next.js: What, Why, and How?'
description: 'A detailed explanation of ISR and how it can improve website performance with dynamic content, with examples for various scenarios using Page and App Router'
date: '2024-10-22'
tags: ['next.js', 'ISR', 'Incremental Static Regeneration', 'SSG', 'Performance']
references: [
  {
    "type": "external", 
    "link": "https://nextjs.org/docs/canary/app/building-your-application/data-fetching/incremental-static-regeneration",
    "title": "Next.js docs",
  }
]
---

<script context="module">
  import { base } from "$app/paths";
</script>


## Overview

**Incremental Static Regeneration (ISR)** is a powerful feature in Next.js that allows you to generate or update static pages after the site has been built, on demand, without rebuilding the entire site.

I'll take a look at how ISR can help you retain the performance benefits of a statically-generated site whilst ensuring that your content can be easily updated without re-building.

See official docs: https://nextjs.org/docs/canary/app/building-your-application/data-fetching/incremental-static-regeneration


----

## What

Simply put, ISR allows you to update or generate pages after your statically-generated site has been built without requiring a full re-build.

You can control whether you want pages to be regenerated in the background at specified intervals, or on demand when users visit.


## Why

Why would you want this behaviour? Imaging the following use cases:

 - **Blog posts, product listings, marketing pages, or user-generated content where updates happen frequently, but immediate updates aren’t critical.** You can serve static pages for fast performance while ensuring that the pages are revalidated (regenerated) in the background after a set amount of time. This strikes a balance between performance and data freshness.

 - **Blogs, news websites, or documentation sites with a large number of pages.** Why ISR Works: Building thousands of static pages upfront (using SSG) can be resource-heavy and time-consuming. ISR allows you to pre-generate only the most visited pages at build time and then generate less popular pages on demand. The less trafficked pages can be regenerated and cached when requested, avoiding a long initial build time.

 - **Pages with content that should be indexed by search engines but includes dynamic data, like product listings, blog articles, or any content that benefits from SEO.**
ISR allows you to serve static HTML to search engines for better SEO while still having the ability to update content regularly in the background. This ensures that search engines index the page quickly, even if the content is dynamically changing.

 - **Social networks, forums, or Q&A platforms where content is created by users.**
On platforms with frequent user contributions, such as posts, comments, or reviews, you don’t need to rebuild every time new content is added. ISR lets you serve fast static pages for user-generated content but regenerates and serves updated versions based on a defined interval.

 - **Non-essential dynamic data like user comments, reviews, or likes.**
For pages with content that updates often (such as reviews or comments), ISR ensures the content stays relatively fresh without rebuilding every time a minor change occurs. You can define a reasonable regeneration time, and users will always see fast-loading static pages.

 - **Websites with lots of pages (like e-commerce, news, or blogs) that experience long build times.**
As the number of pages increases, the build time for static sites can grow significantly. With ISR, you can pre-generate the most important pages and defer the generation of less important or less visited pages until they are requested by a user. This drastically reduces the build time.


## How

### Basic Incremental Static Regeneration

Statically generate pages initially and have ISR update the product page in the background at regular intervals, such as every 10 minutes:

#### Page Router:

```js
export async function getStaticProps() {
  const data = await fetchProductData();
  return {
    props: {
      product: data,
    },
    revalidate: 600, // Regenerate the page every 10 minutes
  };
}
```

Above I am using the special `getStaticProps` function that Next.js uses to pre-generate the content of a page during build time. It fetches necessary data for the page and passes it as props to the page component.
This function runs on the server side and never runs in the browser.

The `revalidate` property is key to ISR. It defines how often (in seconds) the static page should be revalidated (i.e., regenerated in the background).
In this case, the page will be revalidated every 600 seconds (10 minutes). This means that once every 10 minutes, the static page will be updated with fresh data from `fetchProductData()`.
Until the next revalidation, the cached static version of the page is served to users.


#### App Router:

```js
async function fetchProductData(id) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: { revalidate: 600 }, // Revalidate the data every 10 minutes
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
```

The App Router equivalent is alot simpler than the Page Router although resulting behaviour is identical, the key is:

```js
next: { revalidate: 600 }:
```

This is a Next.js-specific option used in the App Router (from Next.js 13 onwards).
The `revalidate: 600` option enables ISR, telling Next.js to revalidate (regenerate) the data every 600 seconds (10 minutes). This is similar to how revalidate works in `getStaticProps` in the Pages Router example.

### On Demand Incremental Static Regeneration

Instead of building all posts during deployment, ISR generates them when a user first visits, ensuring quick builds and up-to-date content:

#### Page Router:

```js
export async function getStaticPaths() {
  const paths = await getPopularPostsPaths(); // Pre-build only popular posts
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const post = await fetchPostData(params.id);
  return {
    props: { post },
    revalidate: 3600, // Rebuild once an hour
  };
}
```

Here I am using a combination of `getStaticPaths` and `getStaticProps`, to pre-render dynamic pages while also allowing ISR.

`getStaticPaths` is used to define the dynamic routes that need to be statically pre-rendered at build time. It returns a list of paths for which the pages will be generated.

The `fallback: 'blocking'` setting controls what happens when a user requests a page that wasn't pre-rendered at build time (i.e., not included in the paths list).
With 'blocking', if the requested page isn't pre-built, Next.js will serve it only after generating it on the server (it blocks rendering until the page is ready). It is then cached for future requests. This property can also be set to `true` to show a fallback page while the page is being generated or `false` to show a 404 page.

`getStaticProps` is responsible for fetching data for a specific page at build time or when the page is revalidated.

The `params` object contains the dynamic route parameters, like id in this case, which is used to fetch the data for the specific post (`fetchPostData(params.id)`).

`revalidate: 3600` triggers ISR, telling Next.js to rebuild the page every hour (3600 seconds). So, every hour, Next.js will fetch fresh data for the post and regenerate the static page, ensuring that it stays updated over time.

#### App Router:

In App Router ``getStaticPaths` is replaced with `generateStaticParams` and the returned object is a slightly different structure. See [App Router Docs](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#dynamic-paths-getstaticpaths) for full details.

The `fallback` property used in the Page Router example - to define what happens if the request is for a page that wasnt pre-rendered - is replaced with the `config.dynamicParams` property. `config.dynamicParams` tells Next.js how to handle pages that arent returned from `generateStaticParams`. 

Set to `true` and those pages not returned from `generateStaticParams` are generated on demand. Set to `false` and the request will return a 404.

```js
// This controls whether Next.js should allow non-predefined dynamic routes
export const dynamicParams = true; // Allows fallback 'blocking' behavior (equivalent to fallback: 'blocking')

// Fetch post data using the Next.js fetch API with revalidation
async function fetchPostData(id) {
  const res = await fetch(`https://api.example.com/posts/${id}`, {
    next: { revalidate: 3600 }, // Revalidate every hour (3600 seconds)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch post data');
  }

  return res.json();
}

// `generateStaticParams` is used to generate static paths at build time
export async function generateStaticParams() {
  const popularPosts = await getPopularPostsPaths(); // Pre-build only popular posts
  return popularPosts.map((post) => ({
    id: post.id, // Map each post's id to generate the path
  }));
}

```

## When Not to Use Incremental Static Regeneration

Real-time data requirements: If your application requires real-time updates (e.g., stock prices, live sports scores), ISR is not the best option since the content will only be updated based on the revalidate time. In these cases, you should consider client-side fetching or server-side rendering (SSR).

Data that rarely changes: If your content is mostly static and doesn't change often, you might not need ISR. Static site generation (SSG) might suffice in this case.

Use ISR when you need a balance between performance (through static site generation) and data freshness (through on-demand or scheduled regeneration). It's particularly effective for large websites, SEO-optimized pages, and user-generated content where the build times could otherwise become unmanageable.

