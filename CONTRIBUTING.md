# Contributing

This repository hosts two Snyder Tech ecosystems:

- `benevolent-dx/` for reusable tooling and integration packages
- `stacks/` for higher-level solution stacks built on top of that tooling

## Folder structure

Primary ecosystem roots:

- `benevolent-dx/apps`, `benevolent-dx/packages`, `benevolent-dx/examples`
- `stacks/apps`, `stacks/packages`, `stacks/stacks`

Current published examples include:

- `benevolent-dx/packages/analog-style-pipeline-core`
- `stacks/packages/knowledge-base`

The STX docs site consumes the BDX docs libraries from the sibling
`benevolent-dx/` folder in this same repository.

### Setup

This repository uses [pnpm](https://pnpm.io/) to manage dependencies.

Before opening a pull request, run:

```sh
pnpm install
```

### Build

To build all workspace packages locally, run:

```sh
pnpm build
```

### Testing

To test all workspace packages locally, run:

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
docs(repo): clarify stx and bdx ecosystem boundaries
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

- **style-pipeline**
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
