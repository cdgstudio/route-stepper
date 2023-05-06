import { Component } from '@angular/core';
import { VeryLongProcessService } from '../very-long-process.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  accountForm = this.VeryLongProcessService.accountForm;

  constructor(private VeryLongProcessService: VeryLongProcessService) {}
}
