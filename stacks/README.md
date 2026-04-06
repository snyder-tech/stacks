# STX

Complete open-source stacks for the AI-native web — AnalogJS knowledge bases
and beyond. By Snyder Tech.

STX is Snyder Tech's open-source home for complete, production-ready solution
stacks. Where Benevolent DX focuses on kind tools and reusable packages, STX is
where those ideas come together into full systems that solve real problems
end-to-end.

Thoughtfully architected, generously documented, and built to last:

- AnalogJS-powered knowledge bases for the AI and LLM era
- composable application stacks that are ready to adapt to real client work
- reference implementations that pair clean architecture with strong DX

Built on the kind tools from [Benevolent DX](../benevolent-dx/README.md).

## Brand

- Brand name: `STX`
- Full display name: `Snyder Stacks`
- Repository home: `snyder-tech/stacks`
- Ecosystem path: `./stacks`
- npm prefix: `@snyder-tech/stx-*`
- Tagline: `Complete open-source stacks for the AI-native web.`

## Relationship To BDX

- `BDX` ships the tools and reusable package layer, including the docs
  libraries that STX consumes
- `STX` ships complete, integrated solutions built on top of that layer
- `apps/docs-site` is a thin Analog consumer of the BDX docs libraries

## Branch Installs

The docs site is developed against the BDX ecosystem inside this repository:

```sh
cd /Volumes/SnyderDev/snyder/stacks
pnpm install
pnpm run stx:docs:dev
```

When you want a branch artifact instead of a live workspace checkout, build the
BDX packages from the same repo and install the resulting tarball in the
consumer.

This keeps the open-source family clean:

- `@snyder-tech/bdx-*` for tooling and framework integrations
- `@snyder-tech/stx-*` for higher-level stacks and solutions

## Initial Direction

The first stack focus is an AnalogJS-based knowledge base system designed for:

- AI-native documentation
- retrieval-friendly content pipelines
- structured knowledge graphs and content resources
- deployable starter stacks for real teams

## Workspace

This repo uses:

- `pnpm` workspaces
- `catalog:` dependency management
- a monorepo layout that leaves room for apps, packages, and reference stacks

## Planned Layout

- `apps/`
- `packages/`
- `stacks/`
- `docs/`

## Development

```sh
pnpm install
pnpm run check
```
