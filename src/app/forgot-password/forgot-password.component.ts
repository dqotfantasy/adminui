import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ApiService } from '../_services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        required: true,
        type: 'email'
      }
    }
  ];
  model: any = {};
  options: FormlyFormOptions = {};

  constructor(private api: ApiService,
    private router: Router,
    private authService: AuthService,
    public dataService: DataService) {
    this.dataService.setTitle('Login');
    if (this.authService.user.value.hasOwnProperty('id')) {
      this.router.navigateByUrl('dashboard').then();
    }
  }

  submit() {
    this.authService.forgotPassword(this.form.value).subscribe((res) => {
      if (res.status) {
        this.router.navigateByUrl('login').then();
      }
    });
  }
}
