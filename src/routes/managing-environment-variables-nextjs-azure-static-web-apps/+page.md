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

See official docs: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables


----

### Runtime Environment Variables

These are variables that are accessed server-side by the Node.js runtime, on parts of our Next.js app that are processed on the server. We can manage these via the 'Environment variables' blade in the Azure portal:

![managing env vars via the Azure portal]({base}/post-assets/2/1.png)


### Client-side Environment Variables

It's actually pretty simple once you remember that client-side environment variables need to be baked in to the app at build time in order to be available to code running in the browser. This is unlike standard environment variables that are available to the Node runtime on the server. 

These client-side variables are prefixed with NEXT_PUBLIC_ and accessed in areas of your code that run in the browser. 

### .env files

The .env.local file is handy for local development, it is ignored by git and not pushed to the repo, therefore the variables contained are not available to the GitHub action at build time. This is good, it means we are not leaking secrets by pushing them to a repository where we might lose control of who can view them.

Imagine that we have a client-side environment variable that we want to bake into our bundle. The simplest (but definitely not best practice) approach to ensuring this variable  at build time would be to create a .env file containing our variable. As .env is not ignored by git it will be pushed to the repo and available to the GH action when it runs `npm run build`.

Simple, and it works, but the implications of the .env file being added to source control is that you are exposing this information to anyone with read access to your repo - obviously this is to be avoided.

----

### Approach

There are lots of approaches to how to solve this - to provide these client-side environment variables to the build process in a secure way. My typical approach is to:

- store my secrets in a secure place which can be accessed by the pipeline/action, so secure values in a variable group in Azure DevOps, in Azure Key Vault, or as repository secrets in GitHub
- alternatively, store a fully formed .env file as a secure file Azure DevOps 'secure files' or similar, although I find this harder to manage than having the variables as separate items
- in the action/pipeline, prior to `npm run build` being executed, generate a .env file, piping in the environment variables (or grab a full-formed one if preferred)

### Experiment

To demonstrate this approach I have created a simple Next.js app - code here: https://github.com/speaktosteve/next-env-vars
