import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DocsLayout, DocsProvider } from "@snyder-tech/bdx-analog-docs-angular";

@Component({
  selector: "app-docs-index-page",
  imports: [RouterOutlet, DocsLayout],
  template: `
    <ng-docs-layout [navItems]="navItems">
      <router-outlet />
    </ng-docs-layout>
  `,
})
export default class DocsIndexPageComponent {
  private readonly docsProvider = inject(DocsProvider);
  navItems = this.docsProvider.pageTree;
}
