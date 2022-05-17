import {Injectable} from '@angular/core';
import {share} from 'rxjs/operators';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any = new BehaviorSubject({});
  token = '';

  constructor(private api: ApiService, public http: HttpClient, private router: Router) {
  }

  login(data: any) {
    const seq = this.api.post('auth/login', data).pipe(share());

    seq.subscribe((res: any) => {
      if (res.status) {
        const d = res.data;
        this.token = 'Bearer ' + d.token;
        localStorage.setItem('token', this.token);
        this.loggedIn(d.user);
      }
    });

    return seq;
  }

  forgotPassword(data: any) {
    return this.api.post('auth/forgot-password', data).pipe(share());
  }

  resetPassword(data: any) {
    return this.api.post('auth/reset-password', data).pipe(share());
  }

  async logout() {
    await this.api.get('auth/logout').toPromise();
    this.token = '';
    localStorage.clear();
    await this.user.next({});

    const currentURL = this.router.url;
    const allowURL = ['forgot-password', 'reset-password'];
    if (!allowURL.some(v => currentURL.includes(v))) {
      await this.router.navigate(['/login']);
    }
  }

  loggedIn(res) {
    this.user.next(res);
  }

}


