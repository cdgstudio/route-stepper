import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from './address.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: AddressComponent }];

@NgModule({
  declarations: [AddressComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class AddressModule {}
