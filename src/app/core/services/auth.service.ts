import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUsuarioModel } from 'src/app/shared/models/loginUsuario.model';
import { ResponseUsuarioAuthModel } from 'src/app/shared/models/responseUsuarioAuth.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "api";
  //private apiUrl = environment.apiUrl; 
  private token: string = "";

  constructor(private httpClient: HttpClient) { }

  sendAuth(usuarioAuth: LoginUsuarioModel): Observable<ResponseUsuarioAuthModel>{
    console.log(this.apiUrl);
    return this.httpClient.post<ResponseUsuarioAuthModel>(`${this.apiUrl}/auth/login`, usuarioAuth);
  }

  setToken(token: string){
    this.token = token;
  }

  getToken(){
    return this.token;
  }


}
