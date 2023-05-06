import { Component } from '@angular/core';
import { VeryLongProcessService } from '../very-long-process.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  userForm = this.veryLongProcessService.userForm;
  addressForm = this.veryLongProcessService.addressForm;
  accountForm = this.veryLongProcessService.accountForm;

  constructor(private veryLongProcessService: VeryLongProcessService) {}
}
