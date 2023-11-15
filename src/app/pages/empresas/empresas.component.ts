import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { ProdutosModalComponent } from '../produtos/produtos-modal/produtos-modal.component';
import { EmpresasFormComponent } from './empresas-form/empresas-form.component';
import { Router } from '@angular/router';
import { ResponseUsuarioAuthModel } from 'src/app/shared/models/responseUsuarioAuth.model';
import { Role } from 'src/app/shared/models/role.model';
import { permissaoUsuario } from 'src/app/core/helpers/permissaoUsuarioHelper';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {
  empresas: EmpresaModel[] = [];
  usuario!: UsuarioModel;
  roleUsuario!: Role;

  constructor(
    private empresaService: EmpresaService,
    private localStorageService: LocalStorageService,
    private usuarioService: UsuarioService,
    private modal: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.roleUsuario = this.usuarioService.roleUsuario();

    this.roleUsuario.nome == 'USER' ? this.recuperaEmpresaUsuario() : this.recuperaTodasEmpresas();
    
  }

  cadastrar(){
    this.modal.open(EmpresasFormComponent, { size: "lg" });
  }
  
  recuperaTodasEmpresas(): EmpresaModel[]{
    this.empresaService.recuperaTodas().subscribe((res: EmpresaModel[]) => this.empresas = res);
    return this.empresas;
  }
  recuperaEmpresaUsuario(){
    this.usuario = this.usuarioService.getUsuarioAtualLocalStorage();
    this.empresaService.recuperaPorId(Number(this.usuario.empresa?.id)).subscribe((res: EmpresaModel) => {
      return this.empresas.push(res);
    });
  }

  verProdutos(empresa: EmpresaModel){
    this.router.navigate(["produtos"], {queryParams: { empresa: empresa.id }} );
  }

  editar(empresa: EmpresaModel){
    
    const modalRef = this.modal.open(EmpresasFormComponent, {size: "lg"});
    modalRef.componentInstance.empresaEdit = empresa;
    modalRef.componentInstance.usuario = this.usuario;
    modalRef.componentInstance.planoAcessoEscolhido = this.usuario.planoAcesso;
  }
}
