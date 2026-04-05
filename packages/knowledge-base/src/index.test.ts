import assert from "node:assert/strict";
import { test } from "vitest";
import { defineKnowledgeBaseStack } from "./index.js";

test("defineKnowledgeBaseStack applies stable defaults", () => {
  const stack = defineKnowledgeBaseStack({
    title: "Docs",
    description: "AI-native docs",
  });

  assert.deepEqual(stack, {
    kind: "knowledge-base",
    title: "Docs",
    description: "AI-native docs",
    contentDir: "src/content",
    routeBase: "/docs",
    search: {
      provider: "local",
      enabled: true,
    },
  });
});
