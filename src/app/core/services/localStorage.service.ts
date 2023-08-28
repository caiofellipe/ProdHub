import { Injectable } from '@angular/core';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  salvaToken(token: string){
    localStorage.setItem("token", token);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  removeToken(){
    localStorage.removeItem("token");
  }

}
