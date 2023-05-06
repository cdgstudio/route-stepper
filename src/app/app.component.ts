import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  save$ = timer(2_000).pipe(tap(() => alert('Forms saved')));

  accountForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}
