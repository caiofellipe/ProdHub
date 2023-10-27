import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PlanoAcessoModel } from 'src/app/shared/models/planoAcesso.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class PlanoAcessoService {

  private apiUrl = environment.apiUrl + "/plano-acesso/"; 

  constructor(
    private httpClient: HttpClient
  ) { }

  salvar(planoAcesso: PlanoAcessoModel): Observable<PlanoAcessoModel>{
    return this.httpClient.post<PlanoAcessoModel>(this.apiUrl + "cadastrar", planoAcesso);
  }

  buscarTodos(): Observable<PlanoAcessoModel[]>{
    return this.httpClient.get<PlanoAcessoModel[]>(this.apiUrl); 
  }

  atualizar(planoAcesso: PlanoAcessoModel): Observable<PlanoAcessoModel>{
    return this.httpClient.put<PlanoAcessoModel>(this.apiUrl + "atualizar", planoAcesso);
  }

  contratar(usuario: UsuarioModel): Observable<UsuarioModel>{
    return this.httpClient.post<UsuarioModel>(this.apiUrl + "contratar", usuario);
  }
}