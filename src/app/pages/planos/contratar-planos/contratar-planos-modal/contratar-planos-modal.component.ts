import { formataStringEmDinheiroPtBR } from 'src/app/core/helpers/formataMoedaHelper';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanoAcessoModel } from 'src/app/shared/models/planoAcesso.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { EmpresasFormComponent } from '../../../empresas/empresas-form/empresas-form.component';
import { ToastrService } from 'ngx-toastr';
import { PlanoAcessoService } from 'src/app/core/services/planoAcesso.service';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-contratar-planos-modal',
  templateUrl: './contratar-planos-modal.component.html',
  styleUrls: ['./contratar-planos-modal.component.scss']
})
export class ContratarPlanosModalComponent implements OnInit {
  usuario!: UsuarioModel;
  planoAcessoEscolhido!: PlanoAcessoModel;
  usuarioTemEmpresa: boolean = false;
  classePlano!: string;

  constructor(
    private modal: NgbModal,
    private toast: ToastrService,
    private planoAcessoService: PlanoAcessoService
  ) { }

  ngOnInit(): void {
    this.usuario.empresa ? this.usuarioTemEmpresa = true : this.usuarioTemEmpresa = false;
  }

  cadastrarEmpresa(){
    const modalRef = this.modal.open(EmpresasFormComponent, { size: 'lg' });
    modalRef.componentInstance.planoAcessoEscolhido = this.planoAcessoEscolhido;
    modalRef.componentInstance.usuario = this.usuario;
  }

  formataValor(valor: Number){
    return formataStringEmDinheiroPtBR(valor);
  }

  contratar(){
    this.usuario.planoAcesso = this.planoAcessoEscolhido;
    this.planoAcessoService.contratar(this.usuario).pipe(
      tap((res: UsuarioModel) => {
        this.toast.success("Plano Contratado","Sucesso!");
        return res;
      }),
      catchError((error) => {
        return error;
      })
    ).subscribe();


  }
}
