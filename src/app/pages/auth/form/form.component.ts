import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ACTIONS } from 'src/app/shared/navbar/constants/constant';
import { AuthService } from '../services/auth.service';
import { ApiError, User } from '@supabase/gotrue-js';
export interface OptionsForm {
  id: string;
  label: string;
}

interface UserReponse extends User, ApiError {}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() options!: OptionsForm;
  authForm!: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private authService: AuthService,
    private readonly router: Router,
    private readonly toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  async onSubmit(): Promise<void> {
    let action;
    if (this.options.label === ACTIONS.signIn) {
      action = this.authService.signIn(this.authForm.value);
    } else {
      action = this.authService.signUp(this.authForm.value);
    }

    try {
      const result = (await action) as UserReponse;
      if (result.email) {
        this.redirectUser();
      } else {
        this.toastService.info(result.message, '¡Information!');
      }
    } catch (error) {
      console.log(error, '¡Information!');
    }
  }

  private initForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  redirectUser(): void {
    this.router.navigate(['/home']);
  }
}
