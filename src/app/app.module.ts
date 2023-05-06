import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AsyncActionModule } from './async-action';
import { StepperModule } from './stepper/stepper.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./modules/very-long-process/user'),
    data: {
      stepIndex: 1,
    },
  },
  {
    path: 'address',
    loadChildren: () => import('./modules/very-long-process/address'),
    data: {
      stepIndex: 0,
    },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StepperModule,
    AsyncActionModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
