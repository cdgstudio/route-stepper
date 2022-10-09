import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from './components/step/step.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { NextStepDirective } from './directives/next-step.directive';
import { PreviousStepDirective } from './directives/previous-step.directive';
import { LazyStepDirective } from './directives/lazy-step.directive';
import { AsyncActionModule } from '../async-action';
import { StepLabelDirective } from './directives/step-label.directive';

@NgModule({
  declarations: [
    StepComponent,
    StepperComponent,
    NextStepDirective,
    PreviousStepDirective,
    LazyStepDirective,
    StepLabelDirective,
  ],
  imports: [CommonModule, AsyncActionModule],
  exports: [
    StepComponent,
    StepperComponent,
    NextStepDirective,
    PreviousStepDirective,
    LazyStepDirective,
    StepLabelDirective,
  ],
})
export class StepperModule {}
