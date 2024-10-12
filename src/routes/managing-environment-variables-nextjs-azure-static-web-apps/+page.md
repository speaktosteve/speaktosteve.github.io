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

<a href="{base}/post-assets/2/1.png" target="_blank">
<img src="{base}/post-assets/2/1.png" alt="managing env vars via the Azure portal" />
</a>

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

To demonstrate this approach I have created a simple Next.js app - code here: https://github.com/speaktosteve/next-env-vars.

It has:
- a server component, rendering an environment variable 'RUNTIME_VARIABLE' read on the server:
```ts
import { unstable_noStore as noStore } from 'next/cache'

export const ServerComponent = () => {
    noStore()
    return (
        <section className="border p-5">
            <h2>This is a server component</h2>
            <ul className="mt-5">
                <li>RUNTIME_VARIABLE: {process.env.RUNTIME_VARIABLE}</li>
            </ul>
        </section>
    )
}
```
- a client component, rendering an environment variable 'NEXT_PUBLIC_BROWSER_VARIABLE' read in the browser:
```ts
"use client"

export const ClientComponent = () => {
    return (
        <section className="border p-5">
        <h2>This is a client component</h2>

        <ul className="mt-5">
          <li>BROWSER_VARIABLE: {process.env.NEXT_PUBLIC_BROWSER_VARIABLE}</li>
        </ul>
        </section>
        
    )
}
```
- a .env.local file that looks like this:
```
RUNTIME_VARIABLE=initial
NEXT_PUBLIC_BROWSER_VARIABLE=initial
```

When I run `npm build` and `npm start` I can see my variables rendered as such:

<a href="{base}/post-assets/2/2.png" target="_blank">
<img src="{base}/post-assets/2/2.png" alt="simple Next.js app" />
</a>

I have created a simple CI/CD using a GitHub action to deploy to an Azure Static App (see [this previous article](https://speaktosteve.github.io/blog/deploying-a-nextjs-app-to-azure-static-web-apps)) to see how it was set up.

Now, when I view the deployed site I see this, as expected there are no environment variables to be rendered:

<a href="{base}/post-assets/2/3.png" target="_blank">
<img src="{base}/post-assets/2/3.png" alt="simple Next.js app" />
</a>

If I add the RUNTIME_VARIABLE variable via the environment variables section in the Static Web App on the Azure Portal (or via the CLI):

<a href="{base}/post-assets/2/1.png" target="_blank">
<img src="{base}/post-assets/2/1.png" alt="managing env vars via the Azure portal" />
</a>

After a minute I refresh my app and, behold, I can see that the variable is available. No rebuild or redeployment needed as the variable was updated and made available to the Node runtime:

<a href="{base}/post-assets/2/4.png" target="_blank">
<img src="{base}/post-assets/2/4.png" alt="simple Next.js app" />
</a>

But what about the browser variable? I want to create a secure way to bundle this into the app prior deployment.

### GitHub Workflowq

Firstly, I add the NEXT_PUBLIC_BROWSER_VARIABLE variable as a secret via the 'Actions secrets and variables' section in the repository settings in GitHub.

<a href="{base}/post-assets/2/5.png" target="_blank">
<img src="{base}/post-assets/2/5.png" alt="adding a repository secret" />
</a>

  <a href="{base}/post-assets/2/6.png" target="_blank">
  <img src="{base}/post-assets/2/6.png" alt="adding a repository secret" />
  </a>

I then update the GitHub workflow file, which originally looks like this:

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

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
          lfs: false
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_VICTORIOUS_WATER_02DD21B10 }}
          repo_token: ${{ secrets.GITHUB_TOKEN }} # Used for Github integrations (i.e. PR comments)
          action: "upload"
          ###### Repository/Build Configurations - These values can be configured to match your app requirements. ######
          # For more information regarding Static Web App workflow configurations, please visit: https://aka.ms/swaworkflowconfig
          app_location: "/" # App source code path
          api_location: "" # Api source code path - optional
          output_location: "" # Built app content directory - optional
          ###### End of Repository/Build Configurations ######

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_VICTORIOUS_WATER_02DD21B10 }}
          action: "close"

```

...adding a new, simple, step before the 'Build And Deploy' step. This creates a new .env file, piping in our environment secret: 

```yaml
      - name: Generate Env File
        run: echo 'NEXT_PUBLIC_BROWSER_VARIABLE=${{ secrets.NEXT_PUBLIC_BROWSER_VARIABLE }}' >> .env
```

The final workflow looks like this:

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

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
          lfs: false
      - name: Generate Env File
        run: echo 'NEXT_PUBLIC_BROWSER_VARIABLE=${{ secrets.NEXT_PUBLIC_BROWSER_VARIABLE }}' >> .env
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_VICTORIOUS_WATER_02DD21B10 }}
          repo_token: ${{ secrets.GITHUB_TOKEN }} # Used for Github integrations (i.e. PR comments)
          action: "upload"
          ###### Repository/Build Configurations - These values can be configured to match your app requirements. ######
          # For more information regarding Static Web App workflow configurations, please visit: https://aka.ms/swaworkflowconfig
          app_location: "/" # App source code path
          api_location: "" # Api source code path - optional
          output_location: "" # Built app content directory - optional
          ###### End of Repository/Build Configurations ######

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_VICTORIOUS_WATER_02DD21B10 }}
          action: "close"

```

One thing to note is that secrets are masked in the logs, so they won't appear in the output. This is key as we dont want to leak these secrets to people with view access to the action's output. The log masks these values as follows:

<a href="{base}/post-assets/2/7.png" target="_blank">
<img src="{base}/post-assets/2/7.png" alt="secret masking" />
</a>

Ok, so once the workflow has completed we should check the deployed site again. The workflow should have created a temporary .env file which the build process then references in order to bake in our client-side environment variable.

Success! We can see both the runtime and client-side environment variables:

<a href="{base}/post-assets/2/8.png" target="_blank">
<img src="{base}/post-assets/2/8.png" alt="both the runtime and client-side environment variables" />
</a>

### Azure DevOps Pipelines:

The above approach is just as easy when using Azure DevOps pipelines, although the YAML looks slightly different:

```yaml
  - script: echo 'NEXT_PUBLIC_BROWSER_VARIABLE=$(NEXT_PUBLIC_BROWSER_VARIABLE)' >> .env
    displayName: 'Generate Env File'
```

#### Key Points:

- Accessing Secrets: In Azure DevOps, secrets are accessed using $(SECRET_NAME). In this case, $(NEXT_PUBLIC_BROWSER_VARIABLE) refers to the secret added to your Azure DevOps pipeline.
- Appending to File: The echo command appends the environment variable (NEXT_PUBLIC_BROWSER_VARIABLE) to the .env file, as it would in GitHub Actions.

#### How to Add Secrets in Azure DevOps:

- In Azure DevOps, go to your project.
- Navigate to Pipelines > Library > Variable Groups (or Pipeline Variables if it’s specific to one pipeline).
- Add NEXT_PUBLIC_BROWSER_VARIABLE as a secret variable.
