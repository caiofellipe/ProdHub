import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/shared/models/role.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './localStorage.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment.apiUrl; 

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
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

  usuarioTemPermissao(){
    let acesso: boolean = false;
    let usuario: UsuarioModel = this.localStorageService.getToken().usuario as UsuarioModel;
    let role = usuario.role.nome;

    if(usuario.planoAcesso?.nivelAcesso.nome != "Bronze" || role){
        return acesso = true;
    }
    return acesso;
  }

  usuarioTemPlano(){
    this.getUsuarioAtual().subscribe((user: UsuarioModel) => {
      return user.planoAcesso?.nivelAcesso.nome;
    });
  }


}
