import { Injectable } from '@angular/core';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  salvarUsuario(chave: string, novoUsuario: UsuarioModel){
    localStorage.setItem(chave, JSON.stringify(novoUsuario));
    
  }

  getUsuario(chave: string){
    const usuario = localStorage.getItem(chave);
    return usuario ? JSON.parse(usuario) : null;
  }

  todosUsuarios(){
    let objLocalStorage = Object.keys(localStorage);
    let usuarios: UsuarioModel[] = [];

    objLocalStorage.forEach((chave: string) => {
      if(chave.startsWith("usuario")){
        usuarios.push(this.getUsuario(chave));
      }
    });
    console.log(usuarios)
    return usuarios;
  }

  removerUsuario(chave: string){
    localStorage.removeItem(chave);
  }

  removerEmpresa(chaveEmpresa: string){
    localStorage.removeItem(chaveEmpresa);
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
