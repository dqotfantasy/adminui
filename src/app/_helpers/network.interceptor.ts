import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastService } from '../_component/toast/toast.service';
import { AuthService } from '../_services/auth.service';
import { SocketService } from '../_services/socket.service';
import { Router } from '@angular/router';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService, private router: Router, private authService: AuthService, private socketService: SocketService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      headers: request.headers.set('Authorization', this.authService.token)
        .set('X-Requested-With', 'XMLHttpRequest')
      // .set('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0')
      // .set('Pragma', 'no-cache')
      // .set('Expires', '0')
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body) {
            const body = event.body;
            if (body.message) {
              if (body.status) {
                this.toastService.success(body.message).then();
              } else {
                this.toastService.error(body.message).then();
              }
            }
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('Error--->', error);
        let lastURL = error.url.split('/');
        let currentURL = window.location.href.split('/').pop();
        let allowURL = ['forgot-password', 'reset-password'];
        if (error.status === 401 && lastURL[lastURL.length - 1] != 'logout') {
          this.authService.logout().then();
          this.socketService.disconnect();
        } else if (allowURL.indexOf(currentURL) == -1 && error.status == 401 && lastURL[lastURL.length - 1] == 'logout' && error.error.message == 'Unauthenticated.') {
          this.router.navigate(['/login']);
        }

        return throwError(error);
      })
    );
  }

}
