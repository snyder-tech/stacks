# Benevolent DX

Kind tools for exceptional DX — AnalogJS, TanStack, and modern web utilities.
Open source by Snyder Tech and the community.

Benevolent DX is a community-driven open-source monorepo of thoughtfully
crafted packages for AnalogJS, TanStack (Query, Router, Start, etc.), and the
general frontend tooling we actually use on real client projects.

The name is a playful nod to our founder, Ben Snyder — “Ben-evolent” — because
we believe developer experience should be kind, generous, and genuinely
helpful. No bloat. No corporate cruft. Just high-quality, well-documented
packages that make your life better.

## Brand

- Official brand name: `Benevolent DX`
- Short form: `BDX`
- Repository home: `snyder-tech/stacks`
- Ecosystem path: `./benevolent-dx`
- Package publisher: `@snyder-tech`
- Naming convention:
  - `@snyder-tech/bdx-analog-*`
  - `@snyder-tech/bdx-tanstack-*`

## Goals

- Keep framework cores lean
- Provide strongly typed integration surfaces for community extensions
- Prove generic style-pipeline APIs before asking Analog core to commit to them
- Support multiple styling ecosystems without forcing host frameworks to own their semantics
- Ship practical packages we actually want to use on client work

## Initial packages

- `@snyder-tech/bdx-analog-style-pipeline-core`
- `@snyder-tech/bdx-analog-style-pipeline-vite`
- `@snyder-tech/bdx-analog-style-pipeline-style-dictionary-provider`
- `@snyder-tech/bdx-analog-style-pipeline-panda-provider`
- `@snyder-tech/bdx-analog-style-pipeline-tokiforge-provider`

## Principles

- Host frameworks should own as little public API as possible
- Style resource orchestration should be generic
- Providers own production semantics
- Libraries and frameworks own their own adapters
- CSS variables are the durable runtime contract
- DX should feel warm, practical, and unsurprising

## Tooling

| Area | Choice |
| --- | --- |
| Package manager | `pnpm@11.0.0-beta.6` |
| Workspace model | `pnpm-workspace.yaml` + `catalog:` |
| Bundling | `tsdown` on top of `rolldown` |
| Linting | `oxlint` |
| Dev/build integration | `vite@8` |
| Runtime validation | `Standard Schema` + `valibot` |
| Typed effects/utilities | `effect@4` |
| CI container orchestration | `Dagger` |
| Release automation | `semantic-release` |

## Workspace

This ecosystem follows the same high-level management conventions as Analog:

- one pnpm workspace
- shared dependency versions through `catalog:`
- Dagger-backed CI entrypoints
- semantic-release for versioning and publishing

## Branch Installs

Direct Git branch installs are fine for repo-level experiments:

```sh
pnpm add github:snyder-tech/stacks#my-branch
```

For published workspace packages, the reliable path is packed branch artifacts.
Monorepo package managers do not consistently install a nested workspace package
directly from a Git branch, so Benevolent DX standardizes on tarballs:

```sh
pnpm install
pnpm run release:pack
pnpm add ./dist/artifacts/snyder-tech-bdx-analog-style-pipeline-core-0.0.0.tgz
```

That is the same artifact shape CI produces in the `Release Test` workflow.

## Development

```sh
pnpm install
pnpm run check
```

Useful commands:

- `pnpm run build`
- `pnpm run test`
- `pnpm run lint`
- `pnpm run typecheck`
- `pnpm run ghci:checks`
- `pnpm run release:pack`
- `pnpm run release:verify`
