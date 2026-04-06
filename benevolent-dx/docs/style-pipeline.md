# Style Pipeline

`stylePipeline` is the generic integration surface for community-owned styling
and token workflows around Analog.

## Why this shape

- It keeps Analog core out of downstream library semantics
- It stays compatible with Vite's plugin model
- It supports multiple provider categories with one typed output contract

## Provider categories

- `style-dictionary`: token transform and output generation
- `panda`: compile-time styling and codegen
- `tokiforge`: Angular-oriented runtime theming and theme manifests
- `custom`: anything else that can emit style resources

## Design rules

- use `tags`, not framework-specific target enums in core
- expose stable file metadata and stable import ids
- keep token source semantics inside providers
- let adapters and component libraries own their own CSS variable naming
