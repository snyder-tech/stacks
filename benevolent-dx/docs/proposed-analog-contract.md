# Proposed Analog Contract

The goal is to keep Analog core lean while still giving community-owned
integrations a strongly typed, stable way to plug into a future stylesheet
pipeline.

## Minimal core ask

Analog core should not own Style Dictionary, Panda, or Tokiforge semantics.

It should only need to understand a generic style resource contract:

```ts
export interface AnalogStyleOutput {
  id: string;
  kind: 'css' | 'theme' | 'tokens' | 'manifest' | 'typescript';
  scope: 'global' | 'component' | 'theme';
  order: number;
  absolutePath: string;
  rootRelativePath: string;
  importId: string | null;
  inject: boolean;
  tags: string[];
  metadata?: Record<string, unknown>;
}
```

And a provider result:

```ts
export interface AnalogStyleProviderResult {
  outputs: AnalogStyleOutput[];
  watchFiles?: string[];
  warnings?: string[];
}
```

## Why this is enough

- `style-dictionary` can emit token CSS and bridge files
- `panda` can emit codegen and CSS artifacts
- `tokiforge` can emit runtime theme styles and manifests
- custom providers can fit the same shape without forcing new framework APIs

## What should stay out of core

- downstream library target enums
- theme service semantics
- CSS variable naming conventions
- provider-specific configuration
- third-party package dependencies

## Community package responsibility

`benevolent-dx` should own:

- provider-specific configs
- Vite integration
- docs and recipes
- examples showing Analog wiring
- experiments that may later justify a small Analog core hook
