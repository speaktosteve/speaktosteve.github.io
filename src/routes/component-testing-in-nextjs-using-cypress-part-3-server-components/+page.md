---
heading: 'Component testing in Next.js using Cypress - Part 3 - Server components'
description: 'This is the third part in a series of articles explaining how to set up and write component tests for Next.js using Cypress. It describes how to cover your server-rendered components with automated tests.'
date: '2024-11-07'
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

]
---
### Table of Contents

[TOC]

---

### Overview

My team often works on component-centric projects, building component libraries and using frameworks such as Storybook to present each component in isolation, in all of its various states.

Using component tests on these types of projects is vital, we need fast, repeatable automated tests to ensure that our components are functioning and appearing correctly.

There is enough material out there that covers the value of automated testing, the [test pyramid](https://martinfowler.com/articles/practical-test-pyramid.html), and the [terrible test hourglass](https://testing.googleblog.com/2020/11/fixing-test-hourglass.html), I won't preach here.

What I want to provide is a practical guide, on how to set up your Next.js app to include focused component tests, for server and client-rendered flavours.

Component tests, like standard unit tests, should be rapid and only test the target code, i.e. not any external dependencies. Like unit tests, they should avoid instigating network calls, database writes, etc. 

<div class="border p-4 not-italic">
Refer to the previous articles in this series:
<ul>
<li><a href="/component-testing-in-nextjs-using-cypress-part-1-set-up">Component testing in Next.js using Cypress - Part 1 - Set up</a></li>
<li><a href="/component-testing-in-nextjs-using-cypress-part-2-network-intercepting">Component testing in Next.js using Cypress - Part 2 - Intercepting network requests</a></li>
</div>

In this article we are going to:

- expand on the application that we created in [part 1](/component-testing-in-nextjs-using-cypress-part-1-set-up) and [part 2](/component-testing-in-nextjs-using-cypress-part-2-network-intercepting) of this series. The complete code for those two articles can be found here: https://github.com/speaktosteve/nextjs-cypress-part1-and-part2
- create a server component to the application
- set up Storybook to allow use to view the server component
- create an e2e test spec in Cypress
- introduce `cy.intercept` to allow us to stub the date entering our component
---

### Set up Storybook
https://storybook.js.org/docs/get-started/frameworks/nextjs


Note, you can find the full code here: https://github.com/speaktosteve/nextjs-cypress-part3

---

<!-- TOC --><a name="references"></a>
### References
