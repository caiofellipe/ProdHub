import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NovoUsuarioModel } from 'src/app/shared/models/novoUsuario.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  salvarUsuario(chave: string, novoUsuario: NovoUsuarioModel){
    localStorage.setItem(chave, JSON.stringify(novoUsuario));
    
  }

  getUsuario(chave: string){
    const usuario = localStorage.getItem(chave);
    return usuario ? JSON.parse(usuario) : null;
  }

  removerUsuario(chave: string){
    localStorage.removeItem(chave);
  }

}
