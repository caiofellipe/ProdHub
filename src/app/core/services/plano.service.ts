import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanoModel } from 'src/app/shared/models/plano.model';
@Injectable({
  providedIn: 'root'
})
export class PlanoService {

  private apiUrl = "api";

  constructor(
    private httpClient: HttpClient
  ) { }

    recuperaTodas(): Observable<PlanoModel[]>{
        return this.httpClient.get<PlanoModel[]>(this.apiUrl + "/plano/");
    }

    recuperaPorId(idPlano: Number): Observable<PlanoModel>{
        return this.httpClient.get<PlanoModel>(`${this.apiUrl}/plano/${idPlano}`);
    }

    criar(plano: PlanoModel): Observable<HttpResponse<PlanoModel>>{
        return this.httpClient.post<HttpResponse<PlanoModel>>(`${this.apiUrl}/plano/cadastrar`, plano);
    }

    atualizar(plano: PlanoModel): Observable<PlanoModel>{
        return this.httpClient.put<PlanoModel>(`${this.apiUrl}/plano/atualizar`, plano);
    }

}
