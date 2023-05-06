import { NgModule, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VeryLongProcessService } from './modules/very-long-process/very-long-process.service';
import { StepperModule } from './stepper/stepper.module';

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
        !inject(VeryLongProcessService).userForm.valid
          ? inject(Router).createUrlTree(['/user'])
          : true,
    ],
  },
  {
    path: 'account',
    loadChildren: () => import('./modules/very-long-process/account'),
    canActivate: [
      () =>
        !inject(VeryLongProcessService).addressForm.valid
          ? inject(Router).createUrlTree(['/address'])
          : true,
    ],
  },
  {
    path: 'summary',
    loadChildren: () => import('./modules/very-long-process/summary'),
    canActivate: [
      () =>
        !inject(VeryLongProcessService).accountForm.valid
          ? inject(Router).createUrlTree(['/account'])
          : true,
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
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
