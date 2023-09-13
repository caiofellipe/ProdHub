import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private toast: ToastrService,
    ){}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken() || this.localStorageService.getToken();
    
    if(authToken != undefined){
      let expiracao = new Date(new Date(authToken.expiracao * 1000)).toLocaleString('pt-BR', this.options);
      let atual = new Date().toLocaleString('pt-BR', this.options);

      if(expiracao < atual){
        this.toast.warning("Faça login novamente!","Alerta! Token expirado");
        this.localStorageService.removeToken();
      }

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken.token}`
        }
      });
      return next.handle(request);
    }

    return next.handle(request);
  }
}
