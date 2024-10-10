---
title: 'Deploying a Next.js app to Azure Static Web Apps'
description: 'A quick guide with example code for deploying a Next.js app to Azure Static Web Apps using GitHub actions'
publishedAtIso: '2024-10-10'
tags: ['next.js', 'azure', 'static web apps', 'github actions']
---

<script context="module">
  import { base } from "$app/paths";
</script>


## Overview

Right now I am creating rapid prototypes for a client, with a need to get simple (but performant and beautiful) SPAs to a cheap, scalable cloud hosting platform. 

Next.js seemed like a sensible choice, with the support team being knowledgeable in React and Azure was already chosen as the cloud provider.

GitHub Actions was also a no-brainer over ADO pipelines as the team were already using Actions to deploy other parts of the solution.

----

Most of the following was gleaned from https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs-hybrid

## Azure Static Web Apps

I've used Azure SWAs a lot for prototyping and static apps, sacrificing the control and capability of App Services for simplicity of set up and low cost. And now hybrid Next.js websites on Azure Static Web Apps is in preview I can now deploy Next.js apps that use server components, SSR and API routes as an SWA. 

Previously I would have to either switch to a statically generated Next.js app if I wanted to use Azure SWA, or used Azure App Services or Azure Container Apps. 

Please not, at the time of writing, there are a number of Next.js/SWA features that are not supported by hybrid Next.js websites on Azure Static Web Apps; ISR, routing rewrites and navigation fallbacks being the main ones.

## Setup

The setup is simple, create a basic Next.js app -> https://nextjs.org/docs/getting-started/installation

<pre>npx create-next-app@latest</pre>

Create a new Static Web App in Azure 

<img src="{base}/src/lib/assets/1-1.png"/>


## Environment Variables