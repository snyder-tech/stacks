---
title: Publishing and Consumption
description: The docs support libraries are package-shaped first, so the app consumes the same public surface external users will install.
section: guides
sectionTitle: Guides
sectionOrder: 1
order: 0
---

# Publishing and Consumption

The permanent target here is package ownership, not repo-local extraction
machinery.

## Workspace development

:::tabs
::::tab[Workspace]
```ts
import {
  withDocsMd4xRenderer,
  withDocumentationSource,
} from '@snyder-tech/bdx-analog-docs-angular';
```
::::
::::tab[Published]
```sh
pnpm add @snyder-tech/bdx-analog-docs-angular
pnpm add @snyder-tech/bdx-analog-markdown-pipeline
```
::::
:::

## Why that matters

The repo docs app now depends on the same package names that published consumers
will use. That keeps the ownership boundary clear and keeps the docs support
surface package-first.

## Scope

This pass does **not** include Docusaurus extraction. The shipped surface is the
Analog-specific runtime and markdown pipeline needed to stand up a real docs
application.
