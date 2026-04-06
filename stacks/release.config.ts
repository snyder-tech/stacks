import type { GlobalConfig } from "semantic-release";

const tag = process.env["RELEASE_TAG"];

const versionFiles = ["package.json", "packages/knowledge-base/package.json"];

export default {
  branches: [
    "main",
    { name: "beta", prerelease: true },
    { name: "alpha", prerelease: true },
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/github",
      {
        successComment: false,
      },
    ],
    [
      "semantic-release-replace-plugin",
      {
        replacements: [
          {
            files: versionFiles,
            from: '"version": ".*"',
            to: '"version": "${nextRelease.version}"',
            countMatches: true,
          },
        ],
      },
    ],
    [
      "@semantic-release/exec",
      {
        publishCmd: `pnpm run build:release && RELEASE_TAG=${tag} ./tools/publish.sh`,
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: [
          "CHANGELOG.md",
          "package.json",
          "pnpm-lock.yaml",
          "packages/knowledge-base/package.json",
        ],
        message: "chore: release ${nextRelease.version} [skip ci]",
      },
    ],
  ],
  preset: "angular",
} satisfies GlobalConfig;
