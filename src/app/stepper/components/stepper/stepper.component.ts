import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { ActivationEnd, ActivationStart, Router } from '@angular/router';
import {
  ReplaySubject,
  combineLatest,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { StepLabelDirective } from '../../directives/step-label.directive';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent implements AfterContentInit {
  @ContentChildren(StepLabelDirective, { descendants: false })
  labelsQueryList!: QueryList<StepLabelDirective>;

  private contentInit$ = new ReplaySubject<void>(1);
  private activationStart$ = this.router.events.pipe(
    filter((event): event is ActivationEnd => event instanceof ActivationStart)
  );

  private stepIndex$ = this.contentInit$.pipe(
    switchMap(() => this.activationStart$),
    map((event) => {
      const path = event.snapshot.routeConfig?.path;
      const labels = this.labelsQueryList.toArray();

      return labels.findIndex((label) => label.routerPath === path);
    }),
    filter((index) => index !== -1)
  );
  private labels$ = this.contentInit$.pipe(
    switchMap(() =>
      combineLatest([this.labelsQueryList.changes, this.activationStart$])
    ),
    startWith(void 0),
    map(() => this.labelsQueryList.toArray().map((el) => el.templateRef))
  );

  data$ = combineLatest({
    labels: this.labels$,
    stepIndex: this.stepIndex$,
  });

  constructor(private router: Router) {}

  ngAfterContentInit(): void {
    this.contentInit$.next();
    this.contentInit$.complete();
  }
}
