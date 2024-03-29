import { Component } from '@angular/core';
import { VeryLongProcessService } from '../very-long-process.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
  addressForm = this.veryLongProcessService.addressForm;

  constructor(private veryLongProcessService: VeryLongProcessService) {}
}
