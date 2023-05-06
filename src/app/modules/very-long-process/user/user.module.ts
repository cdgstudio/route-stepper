import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: UserComponent }];

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class UserModule {}
