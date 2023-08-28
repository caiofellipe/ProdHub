import { LocalStorageService } from './../services/localStorage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const token = this.localStorageService.getToken();
    console.log(token);
    if(token){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
