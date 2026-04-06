---
title: '@snyder-tech/bdx-analog-markdown-pipeline'
description: Shared directive transforms for tabs, admonitions, file trees, and related markdown pipeline helpers.
section: packages
sectionTitle: Packages
sectionOrder: 2
order: 1
---

# @snyder-tech/bdx-analog-markdown-pipeline

This package owns the markdown transforms that make the docs content more than
plain prose.

## Included transforms

- `remarkDirectiveAdmonition`
- `remarkDirectiveTabs`
- `remarkDirectiveFiletree`
- `remarkContentPlugin`
- `shikiDiffNotation`

## Example directive output

:::tabs
::::tab[Admonition]
Use container directives such as `:::note`, `:::tip`, and `:::warning` for
callout blocks.
::::
::::tab[File tree]
Use `:::filetree` when a page needs to explain ownership or generated output.
::::
:::

## Why it is separate

Keeping the markdown transforms in their own publishable package lets future
apps or tooling reuse the same directive behavior without pulling in the Angular
docs runtime.
