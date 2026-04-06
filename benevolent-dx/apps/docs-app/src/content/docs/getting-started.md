---
title: Getting Started
description: Benevolent DX now owns a minimal Analog docs app backed by the extracted docsv2 support libraries.
section: overview
sectionTitle: Overview
sectionOrder: 0
order: 0
---

# Getting Started

Benevolent DX now owns the Analog-flavored `docsv2` support surface directly in
this workspace.

:::note[What this proves]
The docs app is intentionally small, but it exercises the real navigation,
markdown rendering, heading TOC generation, and directive support that moved
over from the Analog branch.
:::

## What moved

- `@snyder-tech/bdx-analog-docs-angular` for the Angular docs UI and providers
- `@snyder-tech/bdx-analog-markdown-pipeline` for directive transforms and
  markdown helpers
- `apps/docs-app` as a real Analog application that consumes those packages

## Workspace layout

:::filetree[Ownership]
packages/
  docs-angular/
  markdown-pipeline/
apps/
  docs-app/
:::

## Read next

- Browse the package pages for the public package surfaces.
- Open the publishing guide to see the workspace and npm consumption model.
