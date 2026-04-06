import type { StandardSchemaV1 } from '@standard-schema/spec';
import { Effect } from 'effect';
import * as v from 'valibot';

export type StyleOutputKind =
  | 'css'
  | 'theme'
  | 'tokens'
  | 'manifest'
  | 'typescript';

export type StyleOutputScope = 'global' | 'component' | 'theme';

export const styleOutputKindSchema = v.picklist([
  'css',
  'theme',
  'tokens',
  'manifest',
  'typescript',
]);

export const styleOutputScopeSchema = v.picklist([
  'global',
  'component',
  'theme',
]);

export interface StylePipelineOutput {
  id: string;
  provider: string;
  kind: StyleOutputKind;
  scope: StyleOutputScope;
  order: number;
  absolutePath: string;
  rootRelativePath: string;
  importId: string | null;
  inject: boolean;
  tags: string[];
  metadata?: Record<string, unknown>;
}

export interface StylePipelineBuildResult {
  outputs: StylePipelineOutput[];
  watchFiles?: string[];
  warnings?: string[];
}

export interface StylePipelineContext {
  workspaceRoot: string;
  projectRoot: string;
  mode: 'development' | 'production' | 'test';
  command: 'serve' | 'build' | 'test';
}

export const stylePipelineOutputSchema = v.strictObject({
  id: v.string(),
  provider: v.string(),
  kind: styleOutputKindSchema,
  scope: styleOutputScopeSchema,
  order: v.number(),
  absolutePath: v.string(),
  rootRelativePath: v.string(),
  importId: v.nullable(v.string()),
  inject: v.boolean(),
  tags: v.array(v.string()),
  metadata: v.optional(v.record(v.string(), v.unknown())),
});

export const stylePipelineContextSchema = v.strictObject({
  workspaceRoot: v.string(),
  projectRoot: v.string(),
  mode: v.picklist(['development', 'production', 'test']),
  command: v.picklist(['serve', 'build', 'test']),
});

export const stylePipelineBuildResultSchema = v.strictObject({
  outputs: v.array(stylePipelineOutputSchema),
  watchFiles: v.optional(v.array(v.string())),
  warnings: v.optional(v.array(v.string())),
});

export type StylePipelineSchema = StandardSchemaV1;
export type InferSchema<TSchema extends StylePipelineSchema, TFallback = never> =
  TSchema extends StylePipelineSchema
    ? StandardSchemaV1.InferOutput<TSchema>
    : TFallback;

export interface StylePipelineProvider<
  TName extends string = string,
  TOptions extends object = object,
> {
  kind: TName;
  options: TOptions;
  schema?: StylePipelineSchema;
  build(context: StylePipelineContext): Promise<StylePipelineBuildResult>;
}

export interface CustomStylePipelineProviderOptions {
  name: string;
  build(context: StylePipelineContext): Promise<StylePipelineBuildResult>;
}

export interface StylePipelineConfig<
  TProviders extends readonly StylePipelineProvider[] = readonly StylePipelineProvider[],
> {
  injectDefaultCss?: boolean;
  manifestModuleId?: string;
  cssModuleId?: string;
  providers: TProviders;
}

export function defineStylePipelineConfig<
  TProviders extends readonly StylePipelineProvider[],
>(config: StylePipelineConfig<TProviders>): StylePipelineConfig<TProviders> {
  return config;
}

export function defineStylePipelineProvider<
  TName extends string,
  TOptions extends object,
>(
  kind: TName,
  options: TOptions,
  build: (
    context: StylePipelineContext,
    options: TOptions,
  ) => Promise<StylePipelineBuildResult>,
  schema?: StylePipelineSchema,
): StylePipelineProvider<TName, TOptions> {
  return {
    kind,
    options,
    schema,
    async build(context) {
      const validatedOptions = schema
        ? await validateOptionsWithSchema(schema, options, kind)
        : options;

      return build(context, validatedOptions);
    },
  };
}

export function customStylePipelineProvider(
  options: CustomStylePipelineProviderOptions,
): StylePipelineProvider<'custom', CustomStylePipelineProviderOptions> {
  return defineStylePipelineProvider('custom', options, (context) =>
    options.build(context),
  );
}

export function toStyleImportId(relativePath: string): string {
  return `virtual:style-pipeline/file/${relativePath.replace(/^\/+/, '')}`;
}

export class StylePipelineValidationError extends Error {
  constructor(
    message: string,
    readonly issues: ReadonlyArray<StandardSchemaV1.Issue>,
  ) {
    super(message);
    this.name = 'StylePipelineValidationError';
  }
}

export function validateWithSchema<TSchema extends StylePipelineSchema>(
  schema: TSchema,
  data: unknown,
): Promise<StandardSchemaV1.Result<StandardSchemaV1.InferOutput<TSchema>>> {
  return Effect.runPromise(
    Effect.tryPromise({
      try: () => Promise.resolve(schema['~standard'].validate(data)),
      catch: (error) =>
        new StylePipelineValidationError(
          error instanceof Error
            ? error.message
            : 'Style pipeline schema validation failed.',
          [],
        ),
    }),
  );
}

export async function validateOptionsWithSchema<
  TSchema extends StylePipelineSchema,
>(
  schema: TSchema,
  data: unknown,
  providerKind = 'style-pipeline',
): Promise<StandardSchemaV1.InferOutput<TSchema>> {
  const result = await validateWithSchema(schema, data);

  if (result.issues) {
    throw new StylePipelineValidationError(
      `Invalid ${providerKind} options.`,
      result.issues,
    );
  }

  return result.value;
}

export function sortOutputs(
  outputs: readonly StylePipelineOutput[],
): StylePipelineOutput[] {
  return [...outputs].sort((left, right) => left.order - right.order);
}
