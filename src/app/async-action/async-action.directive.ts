import {
  Directive,
  HostListener,
  InjectionToken,
  Injector,
  Input,
  OnDestroy,
} from '@angular/core';
import {
  isObservable,
  Observable,
  of,
  OperatorFunction,
  Subscription,
} from 'rxjs';

export interface ActionInterceptor {
  intercept(action$: Observable<unknown>): Observable<unknown>;
}

export const ACTION_INTERCEPTORS = new InjectionToken<ActionInterceptor[]>(
  'ACTION_INTERCEPTORS'
);

export type AsyncAction<T = unknown> =
  | Observable<T>
  | OperatorFunction<T, unknown>;

@Directive({
  selector: '[appAsyncAction]',
})
export class AsyncActionDirective implements OnDestroy {
  @Input('appAsyncAction') action$!: AsyncAction<any> | '';
  @Input('appAsyncActionData') data?: unknown;

  private activeSubscription?: Subscription;

  constructor(private injector: Injector) {}

  @HostListener('click')
  handleClick() {
    if (this.activeSubscription?.closed === false) {
      return;
    }

    const observable$ = isObservable(this.action$)
      ? this.action$
      : typeof this.action$ === 'string'
      ? of(void 0)
      : this.action$(of(this.data));

    const actionInterceptors = this.injector.get(ACTION_INTERCEPTORS, [], 1);
    const interceptedAction$ = actionInterceptors.reduceRight(
      (action$, interceptor) => interceptor.intercept(action$),
      observable$
    );

    this.activeSubscription = interceptedAction$.subscribe();
  }

  ngOnDestroy(): void {
    this.activeSubscription?.unsubscribe();
  }
}
