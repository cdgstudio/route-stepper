import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { LazyStepDirective } from '../../directives/lazy-step.directive';
import { StepLabelDirective } from '../../directives/step-label.directive';

function throwTemplateError(): never {
  throw new Error('No template defined');
}

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepComponent {
  @ViewChild(TemplateRef, { static: true }) content?: TemplateRef<void>;
  @ContentChild(LazyStepDirective, { static: true, read: TemplateRef })
  lazy?: TemplateRef<void>;
  @ContentChild(StepLabelDirective, { static: true, read: TemplateRef })
  label?: TemplateRef<void>;

  get stepContent(): TemplateRef<void> {
    return this.lazy ?? this.content ?? throwTemplateError();
  }
}
