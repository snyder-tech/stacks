---
title: Relationship To BDX
description: How STX depends on the BDX docs libraries.
---

# Relationship To BDX

STX is the solution-stack layer.

BDX is the reusable tools and library layer that powers the docs site.

This repo keeps the split visible in code:

- `apps/docs-site` stays small
- docs rendering comes from `@snyder-tech/bdx-analog-docs-angular`
- markdown helpers come from `@snyder-tech/bdx-analog-markdown-pipeline`
- BDX is consumed from the `feat/docs-overhaul` branch while the libraries
  are still being developed

That keeps STX from recreating docs-support internals locally.
