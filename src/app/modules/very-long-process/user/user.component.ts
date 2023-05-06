import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VeryLongProcessService } from '../very-long-process.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  userForm = this.veryLongProcessService.userForm;

  constructor(private veryLongProcessService: VeryLongProcessService) {}
}
