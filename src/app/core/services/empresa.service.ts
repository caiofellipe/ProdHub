import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private apiUrl = environment.apiUrl; 

  constructor(
    private httpClient: HttpClient
  ) { }

    recuperaTodas(): Observable<EmpresaModel[]>{
      return this.httpClient.get<EmpresaModel[]>(this.apiUrl + "/empresa/");
    }
    recuperaPorId(idEmpresa: Number): Observable<EmpresaModel>{
      return this.httpClient.get<EmpresaModel>(`${this.apiUrl}/empresa/${idEmpresa}`);
    }

    criar(empresa: EmpresaModel): Observable<HttpResponse<EmpresaModel>>{
      return this.httpClient.post<HttpResponse<EmpresaModel>>(`${this.apiUrl}/empresa/cadastrar`, empresa);
    }
    
    atualizar(empresa: EmpresaModel): Observable<EmpresaModel>{
      return this.httpClient.put<EmpresaModel>(`${this.apiUrl}/empresa/atualizar`, empresa);
    }

    recuperaEmpresaPorEstadoECidade(uf: string, cidade: string): Observable<EmpresaModel[]>{
      return this.httpClient.get<EmpresaModel[]>(`${this.apiUrl}/empresa/localizacao/${uf}/${cidade}`);
    }

}