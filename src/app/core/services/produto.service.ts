import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoModel } from 'src/app/shared/models/produto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = environment.apiUrl + "/produto/"; 

  constructor(
    private httpClient: HttpClient
  ) { }

  salvar(produto: ProdutoModel[]): Observable<ProdutoModel[]>{
    return this.httpClient.post<ProdutoModel[]>(this.apiUrl + "cadastrar", produto);
  }

  buscarTodos(): Observable<ProdutoModel[]>{
    return this.httpClient.get<ProdutoModel[]>(this.apiUrl); 
  }

  buscarPorId(produtoId: Number): Observable<ProdutoModel>{
    return this.httpClient.get<ProdutoModel>(`${this.apiUrl}/${produtoId}`); 
  }

  atualizar(produto: ProdutoModel): Observable<ProdutoModel>{
    return this.httpClient.put<ProdutoModel>(this.apiUrl + "atualizar", produto);
  }
}
