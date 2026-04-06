import { Component, computed, inject, resource } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { filter, map, startWith } from "rxjs/operators";
import {
  DocsDescription,
  DocsMd4xContentRendererService,
  DocsPage,
  DocsProvider,
  DocsTitle,
} from "@snyder-tech/bdx-analog-docs-angular";

@Component({
  selector: "app-docs-optional-catchall-page",
  template: `
    @let pageData = page.value();
    @if (pageData) {
      <ng-docs-page [page]="pageData" [toc]="pageData.toc ?? []">
        <ng-docs-title [title]="pageData.attributes.title" />
        <ng-docs-description
          [description]="pageData.attributes.description ?? ''"
        />
        <div
          class="prose-docs max-w-none"
          [innerHTML]="pageData.content"
        ></div>
      </ng-docs-page>
    }
  `,
  imports: [DocsPage, DocsTitle, DocsDescription],
})
export default class DocsOptionalCatchAllPageComponent {
  private readonly docsProvider = inject(DocsProvider);
  private readonly docsRenderer = inject(DocsMd4xContentRendererService);
  private readonly router = inject(Router);

  private routeUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
    {
      initialValue: this.router.url,
    },
  );

  readonly slug = computed(() => this.routeUrl().split(/[?#]/, 1)[0]);
  private readonly source = this.docsProvider.getPage(this.slug);
  readonly page = resource({
    params: () => this.source.value(),
    loader: async ({ params }) => {
      if (!params || typeof params.content !== "string") {
        return undefined;
      }

      const rendered = await this.docsRenderer.render(params.content);
      return {
        ...params,
        content: rendered.content,
        toc: rendered.toc,
      };
    },
  });
}
