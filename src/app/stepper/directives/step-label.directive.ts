import { Directive, Input, TemplateRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[appStepLabel]',
})
export class StepLabelDirective {
  @Input({ required: true, alias: 'appStepLabel' }) routerPath!: string;
  templateRef = inject(TemplateRef);

  get stepIndex() {
    return this.activatedRoute.children.find(
      (el) => el.routeConfig?.path === this.routerPath
    )!.routeConfig?.data?.['stepIndex'] as number;
  }

  constructor(private activatedRoute: ActivatedRoute) {}
}
