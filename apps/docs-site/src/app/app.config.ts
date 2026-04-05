import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { ViewportScroller } from "@angular/common";
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from "@angular/core";
import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser";
import { withComponentInputBinding, withInMemoryScrolling } from "@angular/router";
import { CONTENT_FILE_LOADER, provideContent } from "@analogjs/content";
import { provideFileRouter, requestContextInterceptor } from "@analogjs/router";
import {
  withDocsMd4xRenderer,
  withDocumentationSource,
} from "@snyder-tech/bdx-analog-docs-angular";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: "enabled",
        scrollPositionRestoration: "enabled",
      }),
    ),
    provideAppInitializer(() => {
      inject(ViewportScroller).setOffset([0, 120]);
    }),
    provideHttpClient(withFetch(), withInterceptors([requestContextInterceptor])),
    provideClientHydration(withEventReplay()),
    withDocumentationSource({
      dir: "src/content/docs",
      baseUrl: "/docs",
    }),
    withDocsMd4xRenderer(),
    provideContent({
      provide: CONTENT_FILE_LOADER,
      useFactory: () => async () =>
        import.meta.glob(
          [
            "/src/content/docs/**/*.md",
            "/src/content/docs/**/*.markdown",
            "/src/content/docs/**/*.mdx",
          ],
          {
            query: "?raw",
            import: "default",
          },
        ),
    }),
  ],
};
