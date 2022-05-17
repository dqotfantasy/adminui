import {Injectable, Injector} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  domain: string;

  constructor(private inj: Injector) {

    const token = localStorage.getItem('token');
    if (token) {
      this.authService.token = token;
    }

    var domain = /:\/\/([^\/]+)/.exec(window.location.href)[1];
    this.domain = domain.split('.')[0];
  }

  private get authService() {
    return this.inj.get(AuthService);
  }

  private get http() {
    return this.inj.get(HttpClient);
  }

  async init() {
    return new Promise<void>((resolve) => {
      this.http.get(environment.url + 'auth/me').subscribe((v: any) => {
        if (v.status && v.data.user) {
          this.authService.user.next(v.data.user);
        } else {
          this.authService.logout().then();
        }
        resolve();
      });
    });
  }

}
