---
title: Branch Installs
description: How to work against the BDX docs branch locally.
---

# Branch Installs

## Goal

Work against the BDX docs-overhaul branch without building a local clone of the
docs engine in STX.

## Local Dev

Keep the repositories side by side and point STX at the BDX checkout on
`feat/docs-overhaul`.

```sh
cd /Volumes/SnyderDev/snyder/benevolent-dx
git checkout feat/docs-overhaul
pnpm install

cd /Volumes/SnyderDev/snyder/stacks
pnpm install
pnpm docs:dev
```

The docs site pulls its rendering stack from the BDX checkout, so STX only owns
the shell and the STX-specific content.

## Packaged Branch Testing

When you want the branch artifact instead of the live checkout, pack the BDX
workspace packages and install the resulting tarball in the consumer.

```sh
cd /Volumes/SnyderDev/snyder/benevolent-dx
pnpm run release:pack
```

That matches the branch-testing flow documented in BDX and keeps the consumer
on the real package boundary.
