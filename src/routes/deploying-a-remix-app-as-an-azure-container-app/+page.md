---
heading: 'Deploying a Remix app via GitHub Actions as an Azure Container App'
description: 'Comprehensive guide to developing and deploying your full-stack Remix web application to the cloud via GitHub Actions as an Azure Container App'
date: '2024-10-14'
tags: ['remix', 'azure', 'container app', "bicep"]
references: [{
    "type": "repo", 
    "link": "https://github.com/speaktosteve/remix-on-azure-container-app",
    "title": "Reference repo",
  },
  {
    "type": "external", 
    "link": "https://remix.run/docs",
    "title": "Remix docs",
  },
  {
    "type": "external", 
    "link": "https://azure.microsoft.com/en-us/products/container-apps",
    "title": "Azure Container App docs",
  }
]
---
### Table of Contents

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [Overview](#overview)
- [Development](#development)
- [Running locally](#running-locally)
- [Infrastructure](#infrastructure)
- [Actions](#actions)
   * [Build and Test workflow](#build-and-test-workflow)
   * [Provision and Deploy workflow](#provision-and-deploy-workflow)
   * [Respository set up](#respository-set-up)
      + [Secrets and first time build and deployment](#secrets-and-first-time-build-and-deployment)
- [References](#references)

<!-- TOC end -->

---

<!-- TOC --><a name="overview"></a>
### Overview

Whilst learning about [Remix](https://remix.run/docs) I wanted to create a reference repo that would help my colleagues quickly spin up the infra and CI/CD for such an application. 

You can find this repository here: https://github.com/speaktosteve/remix-on-azure-container-app

---

This repo provides the main building blocks to develop and deploy your full-stack [Remix](https://remix.run/docs) web application to the cloud.

It includes:

- really simple Remix app
- infrastructure as code using Bicep, creating minimal Azure resources for the app
- GitHub Actions to build and deploy your app

<!-- TOC --><a name="development"></a>
### Development

The app was created using `npx create-remix@latest`, using no stack as we define our own infra and deployment mechanisms.

<!-- TOC --><a name="running-locally"></a>
### Running locally

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

<!-- TOC --><a name="infrastructure"></a>
### Infrastructure

The Remix app can be run locally either directly using `npm run dev` or within a Docker container, which is defined in the [Dockerfile](https://github.com/speaktosteve/remix-on-azure-container-app/blob/main/Dockerfile). When deployed to the cloud, the app runs as a container.

This accelerator deploys the Remix app to an [Azure Container App](https://azure.microsoft.com/en-us/products/container-apps) which provides a serverless host for the app to run on.

The following infrastructure is provisioned as defined in the Bicep definition files found in the [infra/](https://github.com/speaktosteve/remix-on-azure-container-app/tree/main/infra) directory:

- Resource group
  - Container registry
  - Container App
  - Container Apps Environment
  - Shared dashboard
  - Log Analytics workspace

<!-- TOC --><a name="actions"></a>
### Actions

The following workflows are used to build and deploy the app to Azure. In order for these to work you will need to set up a number of secrets and variables in your repo. See Set Up.

GitHub actions: see workflows in [.github/workflows](https://github.com/speaktosteve/remix-on-azure-container-app/tree/main/.github/workflows)

<!-- TOC --><a name="build-and-test-workflow"></a>
#### Build and Test workflow

- Simply tries to build the app using standard NPM commands.

<a href="/post-assets/3/1.png" target="_blank">
<img src="/post-assets/3/1.png" alt="Build and Test workflow" />
</a>

<!-- TOC --><a name="provision-and-deploy-workflow"></a>
#### Provision and Deploy workflow

- Provisions the infrastructure defined in the bicep definitions using AZD (Azure Developer CLI)
- Builds and publishes the app as a Docker image to ACR (Azure Container Registry)
- Deploys the image to the newly provisioned Azure Container App.

<a href="/post-assets/3/2.png" target="_blank">
<img src="/post-assets/3/2.png" alt="Provision and Deploy workflow" />
</a>

<!-- TOC --><a name="respository-set-up"></a>
#### Respository set up

<!-- TOC --><a name="secrets-and-first-time-build-and-deployment"></a>
##### Secrets and first time build and deployment

**Service Principal**

In order for the docker build and push action to be able to connect to and push to ACR we are using a service principal.

NB: currently the service principal is not created as part of the automation, you must create it manually as per instructions below. As it relies on the existence of the ACR, you will need to run the provisioning and deployment workflow first (it will fail), then create the service principal and add its details to the secrets before running the workflow again.

Create your service principal like so:

```
ACR_NAME=[name of your Azure Container Registry]
SERVICE_PRINCIPAL_NAME=[Must be unique within your AD tenant]

# Obtain the full registry ID
ACR_REGISTRY_ID=$(az acr show --name $ACR_NAME --query "id" --output tsv)
# echo $registryId

# Create the service principal with rights scoped to the registry.
# Default permissions are for docker pull access. Modify the '--role'
# argument value as desired:
# acrpull:     pull only
# acrpush:     push and pull
# owner:       push, pull, and assign roles
PASSWORD=$(az ad sp create-for-rbac --name $SERVICE_PRINCIPAL_NAME --scopes $ACR_REGISTRY_ID --role acrpull --query "password" --output tsv)
USER_NAME=$(az ad sp list --display-name $SERVICE_PRINCIPAL_NAME --query "[].appId" --output tsv)

# Output the service principal's credentials; use these in your services and
# applications to authenticate to the container registry.
echo "Service principal ID: $USER_NAME"
echo "Service principal password: $PASSWORD"
```

You will then need to grant the above service principal the permissions to push to the ACR

```
az role assignment create --assignee [ID OF SERVICE PRINCIPAL] --scope /subscriptions/[SUBSCRIPTION ID]/resourceGroups/[RESOURCE GROUP NAME]/providers/Microsoft.ContainerRegistry/registries/[name of your Azure Container Registry] --role acrpush


```

**Variables**

The following repo variables will need creating:

- AZURE_ENV_NAME - e.g. remix-environment. Used by AZD to name the environment
- AZURE_LOCATION - e.g. uksouth. The Azure region where the infra will be created
- REMIX_APP_IMAGE_NAME - the name that the image will be given in the ACR repo

Your repo variables should look like this:

<a href="/post-assets/3/3.png" target="_blank">
<img src="/post-assets/3/3.png" alt="Repo Variables" />
</a>

**Secrets**

- AZURE_CREDENTIALS, in order for the GitHub CLI to authenticate to your subscription: see https://learn.microsoft.com/en-us/azure/developer/github/connect-from-azure?tabs=azure-portal%2Clinux#use-the-azure-login-action-with-a-service-principal-secret
- AZURE_SUBSCRIPTION_ID - the ID of the subscription in which you want the resources created

NB: currently the service principal is not created as part of the automation, you must create it manually as per instructions above. As it relies on the existence of the ACR, you will need to run the provisioning and deployment workflow first (it will fail), then create the service principal and add its details to the secrets before running the workflow again.

Once the **Provision and Deploy workflow** is run the infrastructure should be created by the Provisioning stage, but the **Build and Push Image** will fail.
Once the infra is created, go to the ACR in the Azure Portal and grab the following information for these secrets:

- REGISTRY_ENDPOINT - the login server address of the newly created ACR overview screen, e.g. car654654645.azurecr.io
- REGISTRY_USERNAME - the client ID of the service principal created above
- REGISTRY_PASSWORD - the client secret of the service principal created above

Your repo secrets should look like this:
<a href="/post-assets/3/4.png" target="_blank">
<img src="/post-assets/3/4.png" alt="Repo Secrets" />
</a>

If you then re-run the **Provision and Deploy workflow** it should complete successfully. You should then have a running app within the Container App service.

---

<!-- TOC --><a name="references"></a>
### References
