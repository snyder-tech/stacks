# Contributing

STX is an MIT-licensed open source project with its ongoing development made by
contributors.

## Contributing to the stacks and packages

### Folder structure

Source code for STX lives under `packages/`, with room for higher-level
solutions under `stacks/` and applications under `apps/`.

The current published package is:

- `packages/knowledge-base` -> `@snyder-tech/stx-knowledge-base`

The docs site consumes BDX docs libraries from the sibling
`/Volumes/SnyderDev/snyder/benevolent-dx` checkout on `feat/docs-overhaul`.
Install that repo first when you work on `apps/docs-site`.

### Setup

STX uses [pnpm](https://pnpm.io/) to manage dependencies.

Before opening a pull request, run:

```sh
pnpm install
```

### Build

To build all packages locally, run:

```sh
pnpm build
```

### Testing

To test all packages locally, run:

```sh
pnpm test
```

### Validation

Before opening a pull request, run:

```sh
pnpm run check
```

## Submitting pull requests

Please follow these steps to simplify review:

- Please rebase your branch against the current `main` branch.
- Follow the setup steps above to make sure dependencies are up-to-date.
- Please ensure the test suite passes before submitting a PR.
- If you've added new functionality, please include targeted tests.
- Reference related issues on the PR.
- Keep all commits in a PR closely related. Raise separate PRs for disjoint changes.
- Use the PR template to capture the affected scope, test plan, and maintainer-facing merge recommendation.
- `Squash merge` is highly preferred. If you recommend a non-squash merge, add a brief note explaining why the commit boundaries matter.

### Pull request title guidelines

Prefer Conventional Commit style titles.

Examples:

```text
feat(knowledge-base): add stack definition defaults
```

```text
docs(repo): clarify stx and bdx repo boundaries
```

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code
- **test**: Adding missing tests or correcting existing tests

### Scope

The scope should be the package or primary repo area affected.

Supported scopes:

- **knowledge-base**
- **repo**
- **docs**
- **ci**

### Breaking changes

If any breaking changes are included, explain them in the pull request body.

## Questions and support

Questions and requests for support should be opened as GitHub Discussions once
enabled, or raised in the repository issue tracker with enough context to
reproduce the problem.
