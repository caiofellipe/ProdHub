import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment.apiUrl; 

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
    return this.httpClient.get<UsuarioModel>(`${this.apiUrl}/usuario?id=${usuario.id}`);
  }

  getUsuarioAtual(): Observable<UsuarioModel>{
    return this.httpClient.get<UsuarioModel>(`${this.apiUrl}/usuario/atual`);
  }
}
