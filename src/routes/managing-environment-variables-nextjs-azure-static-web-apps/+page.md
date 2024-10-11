---
title: 'Managing environment variables in NextJS on Azure Static Web Apps'
description: 'A quick guide for managing Next.js environment variables for Azure Static Web Apps using GitHub actions'
date: '2024-10-12'
tags: ['next.js', 'azure', 'static web apps', 'github actions', 'environment variables']
---

<script context="module">
  import { base } from "$app/paths";
</script>


## Overview

I've used Azure SWAs a lot for prototypes and static apps, sacrificing the control and capability of App Services for simplicity of set up and low cost. And now hybrid Next.js websites on Azure Static Web Apps is in preview I can now deploy Next.js apps that use server components, SSR and API routes as an SPA. 

Using environment variables in Next.js, when deploying to a serverless environment (or anywhere tbh) is something I always seem to struggle with, so I wanted to document how to set these up for my own benefit. 

The official Next.js documentation is pretty good, but I still have to think about how to manage these variables in the context of a CI/CD process.

See official docs: https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables


----

### Runtime Environment Variables

*"With the App Router, we can safely read environment variables on the server during dynamic rendering"*

### Client-side Variables

It's actually pretty simple once you remember that client-side environment variables need to be baked in to the app at build time, unlike standard environment variables that are available to the Node process at runtime. 

These client-side variables are prefixed with NEXT_PUBLIC_ and accessed in areas of your code that run in the browser. For example my NEXT_PUBLIC_DISABLE_CAPTCHA variable is accessed in a client-side component.

Component code:

```ts
  const captchaDisabled = process.env.NEXT_PUBLIC_DISABLE_CAPTCHA === 'true';
```

The corresponding entry in my .env.local file looks like this. 

```
NEXT_PUBLIC_DISABLE_CAPTCHA=false  
```

Note that the .env.local file is ignored by git and not pushed to the repo, therefore the variables contained are not available to the GitHub action at build time. This is good, it means we are not leaking secrets by pushing them to a repository where we might lose control of who can view them.

The simplest (but definitely not best practice) approach to ensuring this variable is available to the GitHub action at build time would be to create a .env file with these variables in. As .env is not ignored by git it will be pushed to the repo and available to the GH action when it runs `npm run build`.

The implications of using a .env file that is added to source control is that you are exposing this information to anyone with read access to your repo - obviously this is to be avoided.

There are lots of approaches to how to solve this - to provide these secrets to the build process in a secure way. My typical approach is to:

- store my secrets in a secure place which can be accessed by the pipeline/action, so secure values in a variable group in Azure DevOps, in Azure Key Vault, or as repository secrets in GitHub
- alternatively, store a fully formed .env file as a secure file Azure DevOps 'secure files' or similar, although I find this harder to manage than having the variables as separate items
- in the action/pipeline, prior to `npm run build` being executed, generate a .env file, piping in the environment variables (or grab a full-formed one if preferred)


