# Branch Installs

## Goal

Work against the BDX docs-overhaul branch without cloning a second docs engine
into STX.

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

The docs site stays thin and pulls its rendering stack from BDX.

## Packaged Branch Testing

When you want an artifact instead of the live checkout, pack the BDX
workspace packages and install the resulting tarball in the consumer.

```sh
cd /Volumes/SnyderDev/snyder/benevolent-dx
pnpm run release:pack
```

That matches the branch-testing flow documented in BDX and keeps the consumer
on the real package boundary.
