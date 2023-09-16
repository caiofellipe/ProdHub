import { ESTADOS } from 'src/app/shared/constants/estados';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstadoModel } from 'src/app/shared/models/estado.model';
import { pesquisaCidadePelaUf } from 'src/app/core/helpers/estadosHelper';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formLocalizacao!: FormGroup
  estados: EstadoModel[] = [];
  cidades: string[] = [];
  empresas: EmpresaModel[] = [];

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private empresaService: EmpresaService,
    private router: Router,
    ) {
    this.estados = ESTADOS;
   }

  ngOnInit(): void {
    this.formLocalizacao = this.fb.group({
      uf: [''],
      cidade: ['']
    });
    
  }

  conhecerEmpresa(empresa: EmpresaModel){
    this.router.navigate(["conhecer-empresa"], {queryParams: { empresa: empresa.id }} );
  }

  preencheSelectCidade(event: any){
    let uf = pesquisaCidadePelaUf(event.target.value);

    if(this.cidades.length > 0){
      this.cidades = [];
    }

    if(uf != undefined){
      this.cidades.push(...uf);
    }
  }

  submit(){
    let form = this.formLocalizacao.getRawValue();
    
    this.empresaService.recuperaEmpresaPorEstadoECidade(form.uf, form.cidade).pipe(
      tap((empresasRes: EmpresaModel[]) => {
        if(empresasRes.length == 0){
          this.toast.warning("Nenhuma empresa encontrada com estes parametros!","Alerta!");
        }

        if(empresasRes.length > 0){
          this.empresas.push(...empresasRes);
          this.toast.success("Visualize empresas da sua região","Sucesso!");
        }
      }),
      catchError((error) => {
        //this.toast.error(error.error.erro,"");
        return throwError(error);
      })
    ).subscribe();
  }
}
