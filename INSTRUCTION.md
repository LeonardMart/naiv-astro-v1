## Project Flow

This project created progressively with flows like below:

1. Understand the NAIV data specification first: it contains database design and api specification (skip if you have read it once), **Do Not Modify Any Files Inside `design` Folder**.
2. **Generate** UI Specifications DSL `design.swan` based on data specification and user instruction: read `SWAN-DSL.md` to understand how the DSL works.
3. **Generate** UI specifiaction using SWAN-DSL files inside 'ui-dsl-design' folder.
4. **Generate** API Client by running `npm run codegen`. Do not manually create api that doesn't exist on `design/api.naiv`.
5. Implement UI Specifications using provided boilerplate on this project.

## UI Specification

This project contains generated UI specification using SWAN-DSL files under folder `ui-dsl-design`. This specification will guides you pages behavior, what page you should create, what components require, and so on.

## Data Specification - Fetch Data (API Client)

This project uses NAIV API Client. This project only consume api from provided NAIV design via API Client below, no need for api call manually using fetch or axios or useQuery.

### How to generate API Client

Generate API Client by running

```bash
npm run codegen
```

folder `src/api` will be updated with recent NAIV design files inside `design` folder, folder `src/api` will be automatically created if not exist.

<!-- You need to set base url api for API client by create a code lines below in `src/routes/__root.tsx`; -->

```typescript
import { AxiosClient } from '@/api/AxiosClient'

AxiosClient.BaseURL.instance.set(import.meta.env.BASE_URL || ''); // set base url
```

### How to use API Client

#### Example #1

Let say there is an API design inside one of NAIV file like this:

```naiv
api get /profile {
    alias getProfile
    return table.User required
}
```

you can access the function with function name from `alias` on the design like this:

```typescript
import { AxiosClient } from '@/api/AxiosClient'

await AxiosClient.getProfile({});
```

you can find the function signature `AxiosClient.getProfile` from generated API client file on path `import { T_getProfile } from '@/api/api/getProfile'`.

#### Example #2

another example:

```naiv
api post /admin/blogs {
    alias createBlog
    headers {
        authorization string required
    }
    body {
        title string required
        slug string required
        content string required
        summary string
        is_published boolean
    }
    return table.Blog required
}
```

how to use the API Client

```typescript
import { AxiosClient } from '@/api/AxiosClient'

await AxiosClient.createBlog({
  headers: {
    authorization: 'Bearer eyj....'
  },
  body: {
    title: 'Test title',
    slug: 'test-slug',
    content: 'this is content',
    summary: 'summary of the data',
  }
});
```

you can find the function signature `AxiosClient.createBlog` from generated API client file on path `import { T_createBlog } from '@/api/api/createBlog'`.

#### Example #3

more example:

```naiv
api get /blogs/:slug {
    alias getBlogBySlug
    path {
        slug string required
    }
    return table.Blog required
}
```

how to use API Client

```typescript
import { AxiosClient } from '@/api/AxiosClient'

await AxiosClient.getBlogBySlug({
  path: {
    slug: 'test-slug'
  }
});
```

**example** you can find the function signature `AxiosClient.getBlogBySlug` from generated API client file on path `import { T_getBlogBySlug } from '@/api/api/getBlogBySlug'`.

<!-- ## Boilerplate

Welcome to your new TanStack app! this project mainly contains boilerplate for TanStack app -->

### Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

### Project structure

This project uses very minimal structure based. Inside src folder only allowed to have folder pages and components. any other folder will be restricted.

allowed structure
src/api this folder will be created automatically by running npm run codegen
src/pages
src/components

restricted structure
src/assets
src/icon
etc

### Routing

This project uses [ASTRO Routing](https://docs.astro.build/en/guides/routing/). The initial setup is a file based router. Which means that the routes are managed as files in `src/pages`.


#### Adding A Route

To add a new route to your application just add another a new file in the `./src/pages` directory.

This project uses flat page routing.


example
correct: src/pages/about.astro
correct: src/pages/profile.astro
correct: src/pages/transaction.astro

wrong: src/pages/about/index.astro
wrong: src/pages/profile/[id].astro
wrong: src/pages/profile/index.astro
wrong: src/pages/transaction/index.astro


<!-- Now that you have two routes you can use a `Link` component to navigate between them.

#### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `next/link`.

```tsx
import Link from 'next/link'
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link href="/about">About</Link>
```

This will create a link that will navigate to the `/about` route. -->

<!-- More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

#### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you use the `<Outlet />` component.

Here is an example layout that includes a header:

```tsx
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Outlet />
    </>
  ),
})
```

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts). -->
