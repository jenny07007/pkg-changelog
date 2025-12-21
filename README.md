<!-- markdownlint-disable -->

# Changelogs

A web app to browse changelogs for any npm package.

## Features

- Search any npm package by name
- Parse and display CHANGELOG.md content
- "New" badge highlights versions released since your last visit
- Pagination for packages with long changelogs
- Dark theme with meteor animation background

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS v4
- Vite
- TanStack Query
- ky (HTTP client)

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun dev

# Build for production
bun run build
```

## How It Works

1. Fetches package metadata from npm registry
2. Retrieves CHANGELOG.md from unpkg CDN
3. Parses markdown into structured version entries
4. Stores last seen version in localStorage to track new releases

## Deployment

Configured for Vercel with security headers. Just connect your repo and deploy.

## License

MIT
