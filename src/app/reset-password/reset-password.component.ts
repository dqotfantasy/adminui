import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Password',
        required: true,
        type: 'password'
      }
    },
    {
      key: 'password_confirmation',
      type: 'input',
      templateOptions: {
        label: 'Confirm Password',
        required: true,
        type: 'password'
      }
    }
  ];
  model: any = {};
  options: FormlyFormOptions = {};
  token: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public dataService: DataService) {
    this.dataService.setTitle('Reset Password');
    if (this.authService.user.value.hasOwnProperty('id')) {
      this.router.navigateByUrl('dashboard').then();
    }
    this.activatedRoute.params.subscribe(value => {
      this.token = value.token;

    });

  }

  submit() {
    let params = this.form.value;
    params.email = 'test@yopmail.com';
    params.token = this.token;
    this.authService.resetPassword(params).subscribe((res) => {
      if (res.status) {
        this.router.navigateByUrl('login').then();
      }
    });
  }
}
