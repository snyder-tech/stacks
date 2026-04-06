# Snyder Tech Open Source

This repository now hosts two distinct Snyder Tech ecosystems in one Git
monorepo:

- [`benevolent-dx/`](./benevolent-dx/README.md) for kind tools, framework
  integrations, and reusable package infrastructure
- [`stacks/`](./stacks/README.md) for complete solution stacks built on top of
  that tooling layer

They share repository infrastructure, dependency management, CI, and release
automation, but they keep separate brand narratives, goals, and package
families.

## Layout

- `benevolent-dx/`
- `stacks/`
- `.github/`
- `.dagger/`

## Development

```sh
pnpm install
pnpm run check
```

Useful top-level commands:

- `pnpm run bdx:docs:dev`
- `pnpm run bdx:docs:build`
- `pnpm run stx:docs:dev`
- `pnpm run stx:docs:build`
