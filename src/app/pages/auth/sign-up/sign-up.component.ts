import { Component, OnInit } from '@angular/core';
import { ACTIONS } from 'src/app/shared/navbar/constants/constant';
import { OptionsForm } from '../form/form.component';

@Component({
  selector: 'app-sign-up',
  template: '<app-form [options]="options"></app-form>',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  options: OptionsForm = {
    id: ACTIONS.signUp,
    label: ACTIONS.signUp,
  };
  constructor() {}

  ngOnInit(): void {}
}
