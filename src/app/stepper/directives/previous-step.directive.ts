import { Directive } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ActionInterceptor, ACTION_INTERCEPTORS } from '../../async-action';
import { StepperComponent } from '../components/stepper/stepper.component';

@Directive({
  selector: '[appPreviousStep]',
  providers: [
    {
      provide: ACTION_INTERCEPTORS,
      multi: true,
      useExisting: PreviousStepDirective,
    },
  ],
})
export class PreviousStepDirective implements ActionInterceptor {
  constructor(private stepper: StepperComponent) {}

  intercept(action$: Observable<unknown>): Observable<unknown> {
    return action$.pipe(
      tap({
        complete: () => this.stepper.previousStep(),
      })
    );
  }
}
