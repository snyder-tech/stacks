---
title: Branch Installs
description: How to work against the BDX docs branch locally.
---

# Branch Installs

## Goal

Work against the BDX ecosystem in this monorepo without building a separate
clone of the docs engine for STX.

## Local Dev

Use the unified repository checkout and point STX at the sibling BDX
ecosystem.

```sh
cd /Volumes/SnyderDev/snyder/stacks
pnpm install
pnpm run stx:docs:dev
```

The docs site pulls its rendering stack from the BDX checkout, so STX only owns
the shell and the STX-specific content.

## Packaged Branch Testing

When you want the branch artifact instead of the live checkout, pack the BDX
workspace packages from this repository and install the resulting tarball in
the consumer.

```sh
cd /Volumes/SnyderDev/snyder/stacks
pnpm run release:pack
```

That matches the branch-testing flow documented in BDX and keeps the consumer
on the real package boundary.
