import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { formataStringEmDinheiroPtBR } from 'src/app/core/helpers/formataMoedaHelper';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { PlanoAcessoService } from 'src/app/core/services/planoAcesso.service';
import { BeneficioAcessoModel } from 'src/app/shared/models/beneficioAcesso.model';
import { PlanoAcessoModel } from 'src/app/shared/models/planoAcesso.model';
import { ResponseUsuarioAuthModel } from 'src/app/shared/models/responseUsuarioAuth.model';
import { Role } from 'src/app/shared/models/role.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { UsuarioService } from './../../../core/services/usuario.service';
import { NivelAcessoModel } from './../../../shared/models/nivelAcesso.model';
import { ContratarPlanosModalComponent } from './contratar-planos-modal/contratar-planos-modal.component';
import { ContratarPlanosModalEditComponent } from '../contratar-planos-modal-edit/contratar-planos-modal-edit.component';

@Component({
  selector: 'app-contratar-planos',
  templateUrl: './contratar-planos.component.html',
  styleUrls: ['./contratar-planos.component.scss']
})
export class ContratarPlanosComponent implements OnInit {

  planosAcesso: PlanoAcessoModel[] = [];
  beneficiosAcessos: BeneficioAcessoModel[] = [];
  classHtmlCorIconePlanoAcesso: string = "";
  usuarioAuth!: ResponseUsuarioAuthModel; 
  usuarioAtual!: UsuarioModel; 
  role!: Role;

  constructor(
    private toast: ToastrService,
    private planoAcessoService: PlanoAcessoService,
    private localStorageService: LocalStorageService,
    private usuarioService: UsuarioService,
    private modal: NgbModal,

  ) { }

  ngOnInit(): void {
    this.usuarioAuth = this.localStorageService.getToken();
    this.getUsuarioAtual();
    this.planosDeAcesso();
    this.habilitaEditar();
  }

  planosDeAcesso(){
    return this.planoAcessoService.buscarTodos().pipe(
      tap((resposta: PlanoAcessoModel[]) => {
        return this.planosAcesso.push(...resposta);
      }),
      catchError((error) => {
        this.toast.error("Não foi possivel recuperar os Planos", "ERRO");
        return error;
      })
    ).subscribe();
  }

  mudaCorIconePlano(nivelAcesso: NivelAcessoModel){
    switch (nivelAcesso.id) {
      case 1:
        return this.classHtmlCorIconePlanoAcesso = 'p1';
      case 2:
        return this.classHtmlCorIconePlanoAcesso = 'p2';
      case 3:
        return this.classHtmlCorIconePlanoAcesso = 'p3';
      default:
        return '';
    }
  }

  editarPlano(planoAcesso: PlanoAcessoModel){
    const modalRef = this.modal.open(ContratarPlanosModalEditComponent, { size: 'lg' });
    modalRef.componentInstance.planoAcessoEdit = planoAcesso;
  }

  habilitaEditar(){
    return this.role = this.usuarioAuth.usuario.role;
  }

  alteraMensagemContratoPlano(planoAcesso: PlanoAcessoModel){
    let planoAcessoId = this.usuarioAuth.usuario.planoAcesso?.id;  
    
    if(planoAcesso.id == planoAcessoId){
      return "Atual";
    }
    
    return "Contratar";
  }

  contratarPlano(plano: PlanoAcessoModel){
    const modalRef = this.modal.open(ContratarPlanosModalComponent, { size: 'lg' });
    modalRef.componentInstance.planoAcessoEscolhido = plano;
    modalRef.componentInstance.usuario = this.usuarioAtual;
    modalRef.componentInstance.classePlano = this.mudaCorIconePlano(plano.nivelAcesso);
  }

  getUsuarioAtual(): UsuarioModel | any{
    this.usuarioService.getUsuarioAtual().pipe(
      tap((res: UsuarioModel) => {
        return this.usuarioAtual = res;
      }),
      catchError((error) => {
        return error;
      })).subscribe();
  }

  formataValor(valor: Number){
    return formataStringEmDinheiroPtBR(valor);
  }

}
