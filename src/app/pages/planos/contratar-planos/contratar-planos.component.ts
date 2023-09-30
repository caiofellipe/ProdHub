import { NivelAcessoModel } from './../../../shared/models/nivelAcesso.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { PlanoAcessoService } from 'src/app/core/services/planoAcesso.service';
import { BeneficioAcessoModel } from 'src/app/shared/models/beneficioAcesso.model';
import { PlanoAcessoModel } from 'src/app/shared/models/planoAcesso.model';
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

  constructor(
    private toast: ToastrService,
    private planoAcessoService: PlanoAcessoService,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.planosDeAcesso();
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

}
