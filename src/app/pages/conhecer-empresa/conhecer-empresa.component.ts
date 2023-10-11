import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';

@Component({
  selector: 'app-conhecer-empresa',
  templateUrl: './conhecer-empresa.component.html',
  styleUrls: ['./conhecer-empresa.component.scss']
})
export class ConhecerEmpresaComponent implements OnInit {

  empresa!: EmpresaModel;
  mensagemErro: string = "";
  mascaraTel: string = "(00) 0000-0000||(00) 0 0000-0000";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(param => {
      let idEmpresa = param['empresa'];
      
      if(idEmpresa == undefined || idEmpresa == ""){
        this.mensagemErro = "Empresa inválida.";
        this.router.navigate(["/home"]);
        this.toast.error(this.mensagemErro,"ERRO!");
        throw new Error(this.mensagemErro);
      }

      this.empresaService.recuperaPorId(Number(idEmpresa)).pipe(
        tap((resposta: EmpresaModel) => {
          this.empresa = resposta;
          this.toast.success("Confira os dados e produtos da Empresa","Sucesso!");
        }),
        catchError((error) => {
          this.mensagemErro = error.error.erro;
          this.toast.error(error.error.erro, "ERRO!");
          return error;
        })
      ).subscribe();
    });
  }

}
