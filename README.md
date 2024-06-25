# bygningskunstogkultur.dk

## Tech Stack

- Framework: [SvelteKit](https://kit.svelte.dev/)
- CMS: [Sanity](https://www.sanity.io/)

## Development

1. Clone the repository
2. Run `pnpm install`
3. Run `pnpm dev`
4. Access site at `localhost:5137`

## Types

Types generated from Sanity schemas. In [the sanity repository](https://github.com/pwrstudio/mbk-admin) run:

```
sanity schema extract
sanity typegen generate
```
Minor changes have been made in this repo to the generate types to extract sub-types.