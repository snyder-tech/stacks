# STX Knowledge Base

`@snyder-tech/stx-knowledge-base` is the first stack package in this repo.

It is intentionally small for now:

- a typed stack definition API
- sensible defaults for an AnalogJS-powered docs or knowledge-base app
- a package boundary that the release and CI pipeline can publish and verify

The docs site consumes the BDX docs libraries, so this package can stay focused
on the stack API instead of framework plumbing.

The next step is to grow this into a real stack with:

- Analog app scaffolding
- content schema helpers
- AI-ready metadata and retrieval hooks
- deployment recipes
