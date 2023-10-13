import { formataStringEmDinheiroPtBR } from 'src/app/core/helpers/formataMoedaHelper';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanoAcessoModel } from 'src/app/shared/models/planoAcesso.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { EmpresasFormComponent } from '../../../empresas/empresas-form/empresas-form.component';
import { ToastrService } from 'ngx-toastr';

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
  ) { }

  ngOnInit(): void {
    if(this.usuario.empresa){
      this.usuarioTemEmpresa = true;
    }
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
    this.toast.info("","Não disponivel.");
  }
}
