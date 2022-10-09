import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { StepComponent } from '../step/step.component';

function isLabeled(
  step: TemplateRef<void> | undefined
): step is TemplateRef<void> {
  return !!step;
}

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent implements AfterContentInit {
  @ContentChildren(StepComponent, { descendants: false })
  protected steps!: QueryList<StepComponent>;

  protected contentInit$ = new ReplaySubject<void>(1);
  protected steps$ = this.contentInit$.pipe(map(() => this.steps.toArray()));

  private _stepIndex = 0;
  protected get stepIndex() {
    return this._stepIndex;
  }
  protected set stepIndex(value) {
    this._stepIndex = value;
    this.stepContent$.next(this.steps.get(this.stepIndex)!.stepContent);
  }
  protected stepContent$ = new ReplaySubject<TemplateRef<void>>(1);

  protected showLabels$ = this.steps$.pipe(
    map((steps) => steps.map((step) => step.label)),
    map((perhapsLabels) => {
      const onlyLabels = perhapsLabels.filter(isLabeled);
      return onlyLabels.length === perhapsLabels.length
        ? onlyLabels
        : (false as const);
    })
  );

  ngAfterContentInit(): void {
    this.contentInit$.next();
    this.contentInit$.complete();
    this.stepContent$.next(this.steps.get(this.stepIndex)!.stepContent);
  }

  nextStep() {
    this.stepIndex++;
  }

  previousStep() {
    this.stepIndex--;
  }
}
