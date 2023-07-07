import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CepResponseModel } from "src/app/shared/models/cepResponse.model";

@Injectable({ providedIn: 'root' })
export class CepService{
    constructor(private http: HttpClient){}

    getCep(cep: string): Observable<CepResponseModel>{
        return this.http.get<CepResponseModel>(`https://viacep.com.br/ws/${cep}/json/`);
    }

}