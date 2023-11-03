import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BeneficioAcessoModel } from "src/app/shared/models/beneficioAcesso.model";
import { environment } from "src/environments/environment";


@Injectable({ providedIn: 'root' })
export class BeneficioAcessoService{

    private apiUrl = environment.apiUrl + "/beneficio-acesso/"; 

    constructor(private http: HttpClient){}

    salvar(beneficioAcesso: BeneficioAcessoModel): Observable<BeneficioAcessoModel>{
        return this.http.post<BeneficioAcessoModel>(this.apiUrl + "cadastrar", beneficioAcesso);
    }

    buscarTodos(): Observable<BeneficioAcessoModel[]>{
        return this.http.get<BeneficioAcessoModel[]>(this.apiUrl); 
    }

    buscarPeloNivelAcessoId(idNivelAcesso: Number): Observable<BeneficioAcessoModel[]>{
        return this.http.get<BeneficioAcessoModel[]>(this.apiUrl + idNivelAcesso); 
    }

    atualizar(beneficioAcesso: BeneficioAcessoModel): Observable<BeneficioAcessoModel>{
        return this.http.put<BeneficioAcessoModel>(this.apiUrl + "atualizar", beneficioAcesso);
    }
}
