import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './components/stepper/stepper.component';
import { AsyncActionModule } from '../async-action';
import { StepLabelDirective } from './directives/step-label.directive';

@NgModule({
  declarations: [StepperComponent, StepLabelDirective],
  imports: [CommonModule, AsyncActionModule],
  exports: [StepperComponent, StepLabelDirective],
})
export class StepperModule {}
