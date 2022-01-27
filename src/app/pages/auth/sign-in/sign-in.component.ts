import { Component, OnInit } from '@angular/core';
import { ACTIONS } from 'src/app/shared/navbar/constants/constant';
import { OptionsForm } from '../form/form.component';

@Component({
  selector: 'app-sign-in',
  template: '<app-form [options]="options"></app-form>',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  options: OptionsForm = {
    id: ACTIONS.signIn,
    label: ACTIONS.signIn,
  };
  constructor() {}

  ngOnInit(): void {}
}
