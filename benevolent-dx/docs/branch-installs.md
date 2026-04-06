# Branch Installs

## Goal

Make it trivial to try a branch of the shared Snyder Tech monorepo in a real
consumer without publishing a permanent npm release.

## Direct Git Installs

If you want the repo snapshot itself, pnpm can install from a branch:

```sh
pnpm add github:snyder-tech/stacks#my-branch
```

That is useful for local experiments, but it is not the stable way to consume a
single published workspace package from a monorepo.

## Preferred Flow For Workspace Packages

Use packed tarballs produced from the branch:

```sh
pnpm install
pnpm run release:pack
pnpm add ./dist/artifacts/snyder-tech-bdx-analog-style-pipeline-core-0.0.0.tgz
```

You can pack every publishable package in one pass with:

```sh
pnpm run release:pack
```

This is the supported branch-testing workflow because it matches the real npm
package boundary exactly:

- package exports are preserved
- built artifacts are preserved
- workspace internals are not leaked into consumers
- the same tarballs can be uploaded by CI for review builds

## CI Alignment

The `Release Test` GitHub workflow runs the same verification and pack steps:

```sh
pnpm run release:smoke
```

That keeps local branch installs and CI branch installs aligned.
