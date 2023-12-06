import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //debugger;
    const token = localStorage.getItem('Token');

    if(token){
      request = request.clone({
        setHeaders : {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    
    return next.handle(request);
  }
}
