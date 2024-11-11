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
    "type": "external", 
    "link": "https://docs.cypress.io/api/commands/intercept",
    "title": "Cypress docs - intercept method",
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
- [Approach 1 - a true component test using `cy.stub`](#approach-1-a-true-component-test-using-cystub)
   * [Await the loading of the component](#await-the-loading-of-the-component)
   * [Create tests](#create-tests)
   * [Use the `cy.stub` function](#use-the-cystub-function)
   * [Summary](#summary)
- [Approach 2 - an end-to-end test](#approach-2-an-end-to-end-test)
   * [Set up Storybook](#set-up-storybook)
   * [Tweak the cypress configuration](#tweak-the-cypress-configuration)
   * [Create tests](#create-tests-1)
   * [Summary](#summary-1)
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

First step is to introduce a simple server component:

!!!!CODE

I have incorporated the new component into the app, along with a way to navigate between it and the original client component. You can access the full code in the [reference repo](https://github.com/speaktosteve/nextjs-cypress-part3).

The app structure is:

!!!!SITE MAP (BEFORE NEW TESTS)

And when you run it, it looks like this:

!!!!SCREEN SHOT

<!-- TOC --><a name="approach-1-a-true-component-test-using-cystub"></a>
### Approach 1 - a true component test using `cy.stub`

**Firstly kudos to [@MuratKeremOzcan](https://www.youtube.com/@MuratKeremOzcan), I leaned on the approach outlined in [his video](https://www.youtube.com/watch?v=b9LH2gYubSo).**

If we start with a simple cypress test, and try to run it against our new server component we will get a confusing error:

!!!!! error

!!!!! screen shot of error

!!! explain why I am seeing this error - its async

<!-- TOC --><a name="await-the-loading-of-the-component"></a>
#### Await the loading of the component

In order to resolve this, we need to await the loading of the component 

<!-- TOC --><a name="create-tests"></a>
#### Create tests

<!-- TOC --><a name="use-the-cystub-function"></a>
#### Use the `cy.stub` function

metnion alias for json file (or dont use it)

<!-- TOC --><a name="summary"></a>
#### Summary
- fast
- easy to set up


<!-- TOC --><a name="approach-2-an-end-to-end-test"></a>
### Approach 2 - an end-to-end test

<!-- TOC --><a name="set-up-storybook"></a>
#### Set up Storybook
https://storybook.js.org/docs/get-started/frameworks/nextjs

css and use of plugin


<!-- TOC --><a name="tweak-the-cypress-configuration"></a>
#### Tweak the cypress configuration

<!-- TOC --><a name="create-tests-1"></a>
#### Create tests



<!-- TOC --><a name="summary-1"></a>
#### Summary
- slower
- more setup
- effort saved if you are already using storybook
- still use `cy.intercept`


Note, you can find the full code here: https://github.com/speaktosteve/nextjs-cypress-part3

---

<!-- TOC --><a name="references"></a>
### References
