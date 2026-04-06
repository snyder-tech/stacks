---
title: '@snyder-tech/bdx-analog-docs-angular'
description: Angular components and providers for rendering a docsv2-style docs experience inside an Analog app.
section: packages
sectionTitle: Packages
sectionOrder: 2
order: 0
---

# @snyder-tech/bdx-analog-docs-angular

This package owns the Angular-facing docs runtime: layout, page chrome,
navigation tree generation, markdown rendering providers, and TOC behavior.

:::tip[Public surface]
Consumers wire this package into `provideContent(...)` and render pages with the
exported layout and page components. The docs app in this repo uses exactly that
path.
:::

## Main exports

- `DocsLayout`
- `DocsPage`
- `DocsTitle`
- `DocsDescription`
- `DocsProvider`
- `withDocumentationSource`
- `withDocsMd4xRenderer`

## Typical setup

```ts
withDocumentationSource({
  dir: 'src/content/docs',
  baseUrl: '/docs',
});
```

## Rendering model

The package keeps the app shell thin. Markdown stays in content files, while the
package handles navigation shape, HTML rendering, and heading collection.
