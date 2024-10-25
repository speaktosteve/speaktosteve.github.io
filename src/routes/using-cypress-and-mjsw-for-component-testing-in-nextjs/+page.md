

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