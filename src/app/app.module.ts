import { NgModule, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AsyncActionModule } from './async-action';
import { StepperModule } from './stepper/stepper.module';
import { Router, RouterModule, Routes, UrlTree } from '@angular/router';
import { VeryLongProcessService } from './modules/very-long-process/very-long-process.service';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./modules/very-long-process/user'),
  },
  {
    path: 'address',
    loadChildren: () => import('./modules/very-long-process/address'),
    canActivate: [
      () =>
        inject(VeryLongProcessService).userForm.dirty
          ? true
          : inject(Router).createUrlTree(['/user']),
    ],
  },
  {
    path: 'account',
    loadChildren: () => import('./modules/very-long-process/account'),
    canActivate: [
      () =>
        inject(VeryLongProcessService).addressForm.dirty
          ? true
          : inject(Router).createUrlTree(['/address']),
    ],
  },
  {
    path: 'summary',
    loadChildren: () => import('./modules/very-long-process/summary'),
    canActivate: [
      () =>
        inject(VeryLongProcessService).accountForm.dirty
          ? true
          : inject(Router).createUrlTree(['/account']),
    ],
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
