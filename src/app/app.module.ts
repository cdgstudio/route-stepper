import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AsyncActionModule } from './async-action';
import { StepperModule } from './stepper/stepper.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StepperModule,
    AsyncActionModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
