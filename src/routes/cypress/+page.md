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

There is enough material out there that covers the value of automated testing, the test pyramid, the [https://testing.googleblog.com/2020/11/fixing-test-hourglass.html](terrible test hourglass)



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
