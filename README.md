# Magasin for Bygningskunst og Kultur (admin)

## Development

1. Clone the repository
2. Run `pnpm install`
3. Run `pnpm dev`
4. Access the dashboard at `http://localhost:3333`

## Deployment

Run `sanity deploy`

## Backup

Run `sanity dataset export production ./backup_DATE.tar.gz`

## Types

Generate types for the frontend by running the following commands:

```
sanity schema extract
sanity typegen generate
```