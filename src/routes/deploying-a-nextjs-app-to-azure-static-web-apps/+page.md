---
title: 'Deploying a Next.js app to Azure Static Web Apps'
description: 'A quick guide with example code for deploying a Next.js app to Azure Static Web Apps using GitHub actions'
date: '2024-10-10'
tags: ['next.js', 'azure', 'static web apps', 'github actions']
---

<script context="module">
  import { base } from "$app/paths";
</script>


## Overview

Right now I am creating rapid prototypes for a client, with a need to get simple (but performant and beautiful) SPAs to a cheap, scalable cloud hosting platform. 

Next.js seemed like a sensible choice, with the support team being knowledgeable in React and Next.js. Azure was already chosen as the cloud provider.

GitHub Actions was also a no-brainer over ADO pipelines as the team were already using Actions to deploy other parts of the solution.

----

Most of the following was gleaned from https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs-hybrid

----


## Azure Static Web Apps

I've used Azure SWAs a lot for prototypes and static apps, sacrificing the control and capability of App Services for simplicity of set up and low cost. And now hybrid Next.js websites on Azure Static Web Apps is in preview I can now deploy Next.js apps that use server components, SSR and API routes as an SWA. 

Previously I would have to either switch to a statically generated Next.js app if I wanted to use Azure SWA, or used Azure App Services or Azure Container Apps. 

*Please note, at the time of writing, there are a number of Next.js/SWA features that are not supported by hybrid Next.js websites on Azure Static Web Apps; ISR, routing rewrites and navigation fallbacks being the main ones.*

## Setup

The setup is simple, create a basic Next.js app -> https://nextjs.org/docs/getting-started/installation

```bash
npx create-next-app@latest
```

Push it to a repo in GitHub -> https://docs.github.com/en/get-started/start-your-journey/hello-world

Create a new Static Web App via the Azure marketplace:

![choose to create a new SWA via the  Azure portal]({base}/post-assets/1/1.png)

On the first screen you will see an option to select GitHub as a deployment source, once selected enter the details of your new repository (and go through the auth flow if needed):

![deployment source option in the Azure portal]({base}/post-assets/1/2.png)

The summary screen should look similar to the below, not the output location is '/' - this is where Oryx will be looking to find the built application. For Svelte this should be '/build'.

![creation summary of the SWA in the Azure portal]({base}/post-assets/1/3.png)

When I first set the deployment process up there were additional, manual, steps need to create a GitHub action and wire it up with the SWA to allow deployments, but Azure now takes care of that for you. You will see that a new workflow file has been created in your repo:

![workflow file created in GitHub]({base}/post-assets/1/4.png)

And the deployment token has been added to the repository's Secrets and variables section:

![deployment token has been added to the repository's Secrets and variables section in GitHub]({base}/post-assets/1/5.png)

The workflow created is basic, but gives you a working CI/CD process to build upon. 

Firstly it will trigger with any direct pushes to the main branch. Also for any newly created pull requests, when new changes are pushed to a PR (synchronize) or when a PR is closed (whether it is merged or not). If the pull request is reopened after being closed, the workflow will run once more.


```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

```

The main build and deploy job is executed for a direct push to the main branch, or for any actions on a PR other than when closing it:

```yaml
jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
```

The code is then checked out:

```yaml
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
          lfs: false
```

And the magical Azure/static-web-apps-deploy@v1 action is used to build and deploy the application using [Oryx](https://github.com/microsoft/Oryx). In our case there is no API to deploy (no path is specified in the api_location property), so no Azure Function will be created. If you want a serverless API to accompany your app then including it as part of this process is simple - see https://learn.microsoft.com/en-us/azure/static-web-apps/add-api?tabs=vanilla-javascript

```yaml
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_AGREEABLE_GROUND_09FDE7F03 }}
          repo_token: ${{ secrets.GITHUB_TOKEN }} # Used for Github integrations (i.e. PR comments)
          action: "upload"
          ###### Repository/Build Configurations - These values can be configured to match your app requirements. ######
          # For more information regarding Static Web App workflow configurations, please visit: https://aka.ms/swaworkflowconfig
          app_location: '/' # App source code path
          api_location: '' # Api source code path - optional
          output_location: '' # Built app content directory - optional
          ###### End of Repository/Build Configurations ######

```

Finally, if the workflow was triggered by a PR being closed then the "close" action is sent to the SWA to complete the flow:

```yaml
  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_AGREEABLE_GROUND_09FDE7F03 }}
          action: "close"
```
