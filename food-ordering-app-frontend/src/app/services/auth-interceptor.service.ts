import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  authToken: string=''
  isLoggedIn: boolean=false

  constructor(private userService: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
    }
    return next.handle(req);
  }
}
