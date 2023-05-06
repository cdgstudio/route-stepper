import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
  inject,
} from '@angular/core';
import {
  ReplaySubject,
  combineLatest,
  filter,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { StepLabelDirective } from '../../directives/step-label.directive';
import {
  ActivatedRoute,
  ActivationEnd,
  ActivationStart,
  NavigationEnd,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent implements AfterContentInit {
  @ContentChildren(StepLabelDirective, { descendants: false })
  labelsQueryList!: QueryList<StepLabelDirective>;

  private router = inject(Router);
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
    map(() => {
      return this.labelsQueryList
        .toArray()
        .sort((a, b) => a.stepIndex - b.stepIndex)
        .map((el) => el.templateRef);
    })
  );

  data$ = combineLatest({
    labels: this.labels$,
    stepIndex: this.stepIndex$,
  });

  ngAfterContentInit(): void {
    this.contentInit$.next();
    this.contentInit$.complete();
  }
}
