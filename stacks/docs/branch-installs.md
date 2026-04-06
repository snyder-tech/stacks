# Branch Installs

## Goal

Work against the BDX ecosystem in this monorepo without cloning a second docs
engine into STX.

## Local Dev

Use the unified repository checkout and point STX at the sibling BDX
ecosystem.

```sh
cd /Volumes/SnyderDev/snyder/stacks
pnpm install
pnpm run stx:docs:dev
```

The docs site stays thin and pulls its rendering stack from BDX.

## Packaged Branch Testing

When you want an artifact instead of the live checkout, pack the BDX workspace
packages and install the resulting tarball in the consumer.

```sh
cd /Volumes/SnyderDev/snyder/stacks
pnpm run release:pack
```

That matches the branch-testing flow documented in BDX and keeps the consumer
on the real package boundary.
