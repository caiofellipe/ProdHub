import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanoAcessoModel } from 'src/app/shared/models/planoAcesso.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { EmpresasFormComponent } from '../../empresas/empresas-form/empresas-form.component';

@Component({
  selector: 'app-contratar-planos-modal',
  templateUrl: './contratar-planos-modal.component.html',
  styleUrls: ['./contratar-planos-modal.component.scss']
})
export class ContratarPlanosModalComponent implements OnInit {
  usuario!: UsuarioModel;
  planoAcessoEscolhido!: PlanoAcessoModel;
  usuarioTemEmpresa: boolean = false;

  constructor(private modal: NgbModal,) { }

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

}
