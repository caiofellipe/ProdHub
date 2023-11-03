import { BeneficioAcessoFormComponent } from './beneficio-acesso-form/beneficio-acesso-form.component';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { BeneficioAcessoService } from 'src/app/core/services/beneficioAcesso.service';
import { PlanoAcessoService } from 'src/app/core/services/planoAcesso.service';
import { BeneficioAcessoModel } from 'src/app/shared/models/beneficioAcesso.model';
import { NivelAcessoModel } from 'src/app/shared/models/nivelAcesso.model';
import { PlanoAcessoModel } from 'src/app/shared/models/planoAcesso.model';

@Component({
  selector: 'app-beneficio-acesso',
  templateUrl: './beneficio-acesso.component.html',
  styleUrls: ['./beneficio-acesso.component.scss']
})
export class BeneficioAcessoComponent implements OnInit {

  beneficioAcesso: BeneficioAcessoModel[] = [];
  niveisAcesso: NivelAcessoModel[] = [];
  nivelAcesso?: NivelAcessoModel;
  nomeNivelAcesso: string = "";

  constructor(
    private beneficioAcessoService: BeneficioAcessoService,
    private planoAcessoService: PlanoAcessoService,
    private toast: ToastrService,
    private location: Location,
    private modal: NgbModal,
    
  ) { }

  ngOnInit(): void {
    this.getBeneficios();
  }

  getBeneficios(){
    this.planoAcessoService.niveisAcessoComBeneficio().pipe(
      tap((res: NivelAcessoModel[]) => {
        this.niveisAcesso.push(...res);
        res.map((nivelAcesso: NivelAcessoModel) => {
          this.beneficioAcesso.push(...nivelAcesso.beneficioAcesso);
        });
        this.toast.success("Confira os Beneficios de Acesso","Sucesso!");
      }),
      catchError((error) => {
        console.log(error); 
        return error;
      })
    ).subscribe();

  }

  preencheNomeNivelAcesso(beneficio: BeneficioAcessoModel){
    this.nivelAcesso = this.niveisAcesso.find((nivel: NivelAcessoModel) => nivel.beneficioAcesso.find((b: BeneficioAcessoModel) => b.id == beneficio.id));
    return this.nivelAcesso?.nome;
  }

  pesquisaNivelDeAcessoESeuBeneficio(beneficio?: BeneficioAcessoModel){
    this.nivelAcesso = this.niveisAcesso.find((nivel: NivelAcessoModel) => nivel.beneficioAcesso.find((b: BeneficioAcessoModel) => b.id == beneficio?.id));
    return this.nivelAcesso;
  }

  /*alteraClassNivelAcesso(){
    switch (this.nivelAcesso?.nome) {
      case "Ouro":
        return 'nv1';

      case "Prata":
        return 'nv2';

      case "Bronze":
        return 'nv3';

      default:
        return '';
    }
  }*/

  modalCadastroOuEdicao(beneficioAcesso?: BeneficioAcessoModel){
    const modalRef = this.modal.open(BeneficioAcessoFormComponent, {size: 'lg'});
    modalRef.componentInstance.beneficioAcesso = beneficioAcesso;
    modalRef.componentInstance.nivelAcesso = this.pesquisaNivelDeAcessoESeuBeneficio(beneficioAcesso);
  }

  voltar(){
    return this.location.back();
  }
}
