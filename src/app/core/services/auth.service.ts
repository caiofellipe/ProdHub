import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CadastroUsuarioModel } from 'src/app/shared/models/cadastroUsuario.model';
import { LoginUsuarioModel } from 'src/app/shared/models/loginUsuario.model';
import { ResponseUsuarioAuthModel } from 'src/app/shared/models/responseUsuarioAuth.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; 
  private token!: ResponseUsuarioAuthModel;
  
  constructor(
    private httpClient: HttpClient,
    ) { }

  sendAuth(usuarioAuth: LoginUsuarioModel): Observable<ResponseUsuarioAuthModel>{
    return this.httpClient.post<ResponseUsuarioAuthModel>(`${this.apiUrl}/auth/login`, usuarioAuth);
  }

  criarUsuarioComConvite(cadastroUsuario: CadastroUsuarioModel): Observable<UsuarioModel>{
    return this.httpClient.post<UsuarioModel>(`${this.apiUrl}/auth/cadastrar`, cadastroUsuario);
  }

  getUsuarioAtual(): Observable<UsuarioModel>{
    return this.httpClient.get<UsuarioModel>(`${this.apiUrl}/usuario/atual`);
  }
  
  setToken(token: ResponseUsuarioAuthModel){
    this.token = token;
  }

  getToken(){
    return this.token;
  }
}
