export interface KnowledgeBaseStackOptions {
  title: string;
  description: string;
  contentDir?: string;
  routeBase?: string;
  search?: {
    provider: "local" | "algolia" | "meilisearch";
    enabled?: boolean;
  };
}

export interface KnowledgeBaseStackDefinition {
  kind: "knowledge-base";
  title: string;
  description: string;
  contentDir: string;
  routeBase: string;
  search: {
    provider: "local" | "algolia" | "meilisearch";
    enabled: boolean;
  };
}

export function defineKnowledgeBaseStack(
  options: KnowledgeBaseStackOptions,
): KnowledgeBaseStackDefinition {
  return {
    kind: "knowledge-base",
    title: options.title,
    description: options.description,
    contentDir: options.contentDir ?? "src/content",
    routeBase: options.routeBase ?? "/docs",
    search: {
      provider: options.search?.provider ?? "local",
      enabled: options.search?.enabled ?? true,
    },
  };
}
