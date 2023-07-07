import { EmpresaModel } from 'src/app/shared/models/empresa.model';
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

  salvarEmpresa(chave: string, empresa: EmpresaModel){
    localStorage.setItem(chave, JSON.stringify(empresa));
  }

  getEmpresa(chave: string){
    const empresa = localStorage.getItem(chave);
    return empresa ? JSON.parse(empresa) : null;
  }

  todasEmpresas(){
    let objLocalStorage = Object.keys(localStorage);
    let empresas: EmpresaModel[] = [];

    objLocalStorage.forEach((chave: string) => {
      if(chave.startsWith("empresa")){
        empresas.push(this.getEmpresa(chave));
      }
    });

    return empresas;
  }

}
