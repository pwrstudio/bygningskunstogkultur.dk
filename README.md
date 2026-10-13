# bygningskunstogkultur.dk

Monorepo for [Magasin for Bygningskunst og Kultur](https://bygningskunstogkultur.dk):
the public site and the Sanity studio that edits its content.

| Package           | What                                                      | Hosted at                                                  |
| ----------------- | --------------------------------------------------------- | ---------------------------------------------------------- |
| `packages/client` | The site: [SvelteKit](https://svelte.dev/docs/kit) + Sass | Netlify (live and preview sites)                           |
| `packages/cms`    | The studio: [Sanity](https://www.sanity.io/docs) v6       | [mbk-admin.sanity.studio](https://mbk-admin.sanity.studio) |

Both share one Sanity project: `yesqrmft`, dataset `production`. The site reads it
anonymously (published documents only), so no token is needed to run it.

## Development

Requires Node 22+ and pnpm 12 (`corepack enable` picks the version from `package.json`).

```bash
pnpm install
cp packages/client/.env.example packages/client/.env
pnpm dev
```

`pnpm dev` runs both packages in one terminal with [mprocs](https://github.com/pvolok/mprocs):
the site at http://localhost:5173 and the studio at http://localhost:3333.
Use `pnpm dev:sveltekit` or `pnpm dev:sanity` to run one of them.

| Script (repo root)    | Does                                                            |
| --------------------- | --------------------------------------------------------------- |
| `pnpm dev`            | Site and studio together                                        |
| `pnpm build`          | Production build of the site                                    |
| `pnpm check`          | `svelte-check` on the site, ESLint on the studio                |
| `pnpm format`         | Prettier over the whole repo (`format:check` only verifies)     |
| `pnpm typegen:sanity` | Regenerate TypeScript types from the studio schema              |
| `pnpm deploy:sanity`  | Deploy the studio (needs `pnpm --filter cms exec sanity login`) |

## How the two packages connect

- **Schema → types.** `pnpm typegen:sanity` extracts the studio schema to
  `packages/cms/schema.json` and generates `packages/cms/sanity.types.ts`
  (required fields are enforced). The site imports that file through the
  `@sanity-types` alias and derives the shapes its queries return in
  `packages/client/src/lib/types/index.ts`. After changing the schema: run
  typegen, run `pnpm check`, commit both generated files.
- **Queries** live in `packages/client/src/lib/groq/index.ts`.
- **Rich text** (Portable Text) is rendered to HTML by
  `packages/client/src/lib/modules/sanity/index.ts` with `@portabletext/to-html`.
  The classes it emits (`p.normal`, `figure.image`, `.footnote-link`, …) are
  styled in `packages/client/static/app.css` and in the components.
- **Preview.** The studio's "Preview" document action (`packages/cms/actions`)
  opens the published document on the preview site (see Environments).

## Environments

The site is built in one of two modes, chosen by `PUBLIC_ENVIRONMENT`
(`packages/client/.env`, or the environment variable in Netlify):

| Value     | Site                                              | Behaviour                                                                           |
| --------- | ------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `live`    | https://bygningskunstogkultur.dk                  | Lists issues whose editorial state is "Live"; Google Analytics after cookie consent |
| `preview` | https://preview-bygningskunstogkultur.netlify.app | Also lists issues in the "Preview" state; no analytics                              |

Both modes show published documents only (drafts are never fetched).

## Deployment

**Site.** Two Netlify projects (live and preview) build from this repository on
pushes to `main`. The build command and publish directory are in the root
`netlify.toml` (the comments there explain why it is not inside the package).
In each project's settings in the Netlify UI, leave the _base directory_ empty
(the repo root) and set the _package directory_ to `packages/client`; that is
what makes Netlify pick up the serverless function the adapter writes.
`@sveltejs/adapter-auto` selects the Netlify adapter. Set `PUBLIC_ENVIRONMENT`
per project as above.

**Studio.** `pnpm deploy:sanity` builds and uploads the studio to
`mbk-admin.sanity.studio` (host and app id in `packages/cms/sanity.cli.ts`).

## Backups

`.github/workflows/backup.yml` exports the dataset every Monday (documents only,
asset references kept, no asset files) and stores it as a workflow artifact
for 90 days. It needs the repository secret `SANITY_AUTH_TOKEN` (a Sanity API
token with read access; create one at manage.sanity.io → project → API → Tokens).
For a full export including the ~2 GB of media, run locally:

```bash
pnpm --filter cms exec sanity dataset export production backup.tar.gz
```

## Site routes

| Route                     | Page                                                            |
| ------------------------- | --------------------------------------------------------------- |
| `/`                       | Landing page: cover slider of issues, news and info in the menu |
| `/[issue]`                | Redirects to the issue's first article                          |
| `/[issue]/[article]`      | Article with table of contents                                  |
| `/nyhed/[slug]`           | A news item on its own                                          |
| `/page/[slug]`            | Free-standing page (linked from text via "Page link")           |
| `/pdf/issue               | article                                                         | news | page/[slug]` | Print layouts ("Download PDF" in the share bar) |
| `/preview-article/[slug]` | An article outside any issue (studio preview)                   |

## Notes for the next maintainer

- The site is written in Svelte 4 syntax (`export let`, `$:`, `on:click`) running
  on Svelte 5 in legacy mode. `$app/stores` is deprecated in favour of `$app/state`.
- SvelteKit 3 (October 2026) is not adopted yet; `npx sv migrate sveltekit-3`
  does most of the work. TypeScript stays on 6.x until `svelte-check` supports 7.
- The "Fullbredd" toggle on images in the content editor is stored but not used
  by the site.
