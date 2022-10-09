import { Directive, Injector, Input } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import {
  ActionInterceptor,
  ACTION_INTERCEPTORS,
  AsyncAction,
  AsyncActionDirective,
} from '../../async-action';
import { StepperComponent } from '../components/stepper/stepper.component';

@Directive({
  selector: '[appNextStep]',
  providers: [
    {
      provide: ACTION_INTERCEPTORS,
      multi: true,
      useExisting: NextStepDirective,
    },
    {
      provide: AsyncActionDirective,
      useExisting: NextStepDirective,
    },
  ],
})
export class NextStepDirective implements ActionInterceptor {
  constructor(private stepper: StepperComponent) {}

  intercept(action$: Observable<unknown>): Observable<unknown> {
    return action$.pipe(
      tap({
        complete: () => this.stepper.nextStep(),
      })
    );
  }
}
