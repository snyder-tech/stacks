import { existsSync, mkdirSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

type Command = "pack" | "publish" | "smoke" | "verify";

const root = path.resolve(import.meta.dirname, "..", "..");
const packagesDir = path.join(root, "packages");
const artifactsDir = path.join(root, "dist", "artifacts");
const command = process.argv[2] as Command | undefined;
const tagFlagIndex = process.argv.indexOf("--tag");
const releaseTag =
  tagFlagIndex >= 0
    ? process.argv[tagFlagIndex + 1]
    : process.env["RELEASE_TAG"];

function getPackageDirs(): string[] {
  return readdirSync(packagesDir)
    .map((entry) => path.join(packagesDir, entry))
    .filter((directory) => existsSync(path.join(directory, "package.json")));
}

function getPackageJson(packageDir: string): {
  name: string;
  private?: boolean;
  exports?: Record<string, unknown>;
} {
  return JSON.parse(
    readFileSync(path.join(packageDir, "package.json"), "utf8"),
  );
}

function run(commandName: string, args: string[]) {
  execFileSync(commandName, args, {
    cwd: root,
    stdio: "inherit",
  });
}

function verify() {
  for (const packageDir of getPackageDirs()) {
    const pkg = getPackageJson(packageDir);
    if (pkg.private) {
      throw new Error(`Expected publishable package at ${packageDir}`);
    }
    if (!pkg.name.startsWith("@snyder-tech/stx-")) {
      throw new Error(`Unexpected package name: ${pkg.name}`);
    }
    if (!pkg.exports) {
      throw new Error(`Missing exports field for ${pkg.name}`);
    }
  }
}

function pack() {
  mkdirSync(artifactsDir, { recursive: true });
  run("pnpm", [
    "-r",
    "--filter",
    "./packages/*",
    "pack",
    "--pack-destination",
    artifactsDir,
  ]);
}

function publish() {
  if (!releaseTag) {
    throw new Error("Missing release tag. Pass --tag or set RELEASE_TAG.");
  }
  run("pnpm", [
    "-r",
    "--filter",
    "./packages/*",
    "publish",
    "--access",
    "public",
    "--no-git-checks",
    "--tag",
    releaseTag,
  ]);
}

function smoke() {
  verify();
  pack();
  const tarballs = readdirSync(artifactsDir).filter((entry) =>
    entry.endsWith(".tgz"),
  );
  if (tarballs.length === 0) {
    throw new Error("No package tarballs were produced.");
  }
  console.log(`Packed ${tarballs.length} release artifacts in ${artifactsDir}`);
}

switch (command) {
  case "verify":
    verify();
    break;
  case "pack":
    verify();
    pack();
    break;
  case "publish":
    verify();
    publish();
    break;
  case "smoke":
    smoke();
    break;
  default:
    throw new Error("Expected one of: verify, pack, publish, smoke");
}
