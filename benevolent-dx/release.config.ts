import type { GlobalConfig } from 'semantic-release';

const tag = process.env['RELEASE_TAG'];

const versionFiles = [
  'package.json',
  'packages/analog-style-pipeline-panda-provider/package.json',
  'packages/analog-style-pipeline-style-dictionary-provider/package.json',
  'packages/analog-style-pipeline-core/package.json',
  'packages/analog-style-pipeline-vite/package.json',
  'packages/analog-style-pipeline-tokiforge-provider/package.json',
];

export default {
  branches: [
    'main',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/github',
      {
        successComment: false,
      },
    ],
    [
      'semantic-release-replace-plugin',
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
      '@semantic-release/exec',
      {
        publishCmd: `pnpm run build:release && RELEASE_TAG=${tag} ./tools/publish.sh`,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'pnpm-lock.yaml', ...versionFiles.slice(1)],
        message: 'chore: release ${nextRelease.version} [skip ci]',
      },
    ],
  ],
  preset: 'angular',
} satisfies GlobalConfig;
