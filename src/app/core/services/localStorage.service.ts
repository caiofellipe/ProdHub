import { Injectable } from '@angular/core';
import { ResponseUsuarioAuthModel } from 'src/app/shared/models/responseUsuarioAuth.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  salvaToken(token: ResponseUsuarioAuthModel){
    localStorage.setItem("token",  JSON.stringify(token));
  }

  getToken(){
    let tokenLocalStorage = localStorage.getItem("token");
   
    if(tokenLocalStorage != null || tokenLocalStorage != undefined){
      return JSON.parse(tokenLocalStorage); 
    }
    
    return; 
  }

  removeToken(){
    localStorage.removeItem("token");
  }

}
