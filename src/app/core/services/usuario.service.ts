import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = "api";

  constructor(
    private httpClient: HttpClient
  ) { }

  criarUsuario(usuario: UsuarioModel): Observable<UsuarioModel>{
    return this.httpClient.post<UsuarioModel>(this.apiUrl + "/usuario/cadastrar", usuario);
  }

  getTodosUsuario(): Observable<UsuarioModel[]>{
    return this.httpClient.get<UsuarioModel[]>(this.apiUrl + "/usuario/");
  }

  getUsuarioPorId(){}
  
  getUsuario(usuario: UsuarioModel): Observable<UsuarioModel>{
    return this.httpClient.get<UsuarioModel>(`${this.apiUrl}/usuario?nome=${usuario.nome}&email=${usuario.email}&login=${usuario.login}`);
  }

}