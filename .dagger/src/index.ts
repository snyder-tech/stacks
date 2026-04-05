import type { Container, Directory } from "@dagger.io/dagger";
import { argument, dag, func, object } from "@dagger.io/dagger";

const SOURCE_IGNORE = [
  "**/node_modules",
  "**/dist",
  ".dagger/sdk",
  "**/coverage",
  "*.tsbuildinfo",
  "tmp",
  "!.git",
];

@object()
export class StxCi {
  private baseContainer(source: Directory): Container {
    const pnpmStore = dag.cacheVolume("stx-pnpm-store");

    return dag
      .container()
      .from("node:24.14.1")
      .withEnvVariable("CI", "true")
      .withEnvVariable("npm_config_store_dir", "/pnpm")
      .withMountedCache("/pnpm", pnpmStore)
      .withExec(["npm", "install", "--global", "--force", "corepack@latest"])
      .withExec(["corepack", "enable"])
      .withDirectory("/app", source)
      .withWorkdir("/app")
      .withExec(["pnpm", "install", "--frozen-lockfile"]);
  }

  @func()
  async prettier(
    @argument({ defaultPath: ".", ignore: SOURCE_IGNORE }) source: Directory,
  ): Promise<string> {
    return this.baseContainer(source)
      .withExec(["pnpm", "run", "format:check"])
      .stdout();
  }

  @func()
  async lint(
    @argument({ defaultPath: ".", ignore: SOURCE_IGNORE }) source: Directory,
  ): Promise<string> {
    return this.baseContainer(source)
      .withExec(["pnpm", "run", "lint"])
      .stdout();
  }

  @func()
  async buildAndTest(
    @argument({ defaultPath: ".", ignore: SOURCE_IGNORE }) source: Directory,
  ): Promise<string> {
    return this.baseContainer(source)
      .withExec(["pnpm", "run", "typecheck"])
      .withExec(["pnpm", "run", "test"])
      .withExec(["pnpm", "run", "build"])
      .stdout();
  }

  @func()
  async ciChecks(
    @argument({ defaultPath: ".", ignore: SOURCE_IGNORE }) source: Directory,
  ): Promise<string> {
    return this.baseContainer(source)
      .withExec(["pnpm", "run", "check"])
      .stdout();
  }
}
