import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { BeneficioAcessoService } from 'src/app/core/services/beneficioAcesso.service';
import { PlanoAcessoService } from 'src/app/core/services/planoAcesso.service';
import { BeneficioAcessoModel } from 'src/app/shared/models/beneficioAcesso.model';
import { NivelAcessoModel } from 'src/app/shared/models/nivelAcesso.model';
import { PlanoAcessoModel } from 'src/app/shared/models/planoAcesso.model';

@Component({
  selector: 'app-beneficio-acesso-form',
  templateUrl: './beneficio-acesso-form.component.html',
  styleUrls: ['./beneficio-acesso-form.component.scss']
})
export class BeneficioAcessoFormComponent implements OnInit {
  niveisAcesso: NivelAcessoModel[] = [];
  beneficioAcesso!: BeneficioAcessoModel;
  nivelAcesso!: NivelAcessoModel;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private planoAcessoService: PlanoAcessoService,
    private beneficioAcessoService: BeneficioAcessoService,
    private toast: ToastrService,
    private modal: NgbModal,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.beneficioAcesso?.id || ""],
      nome: [this.beneficioAcesso?.nome || ""],
      codigo: [this.beneficioAcesso?.codigo || ""],
      nivelAcesso: [],
    });
    this.getNivelAcesso();
    this.desabilitaCamposForm();
   
  }

  getNivelAcesso(){
    if(this.nivelAcesso == undefined || this.nivelAcesso == null){
      this.planoAcessoService.niveisAcesso().pipe(
        tap((res: NivelAcessoModel[]) => {
          return this.niveisAcesso = res;
        }),
        catchError((error) => {
          return error;
        })
      ).subscribe();
    }else{
      this.form.get('nivelAcesso')?.setValue(this.nivelAcesso.nome);
      
    }
  }

  desabilitaCamposForm(){
    if(this.beneficioAcesso != undefined){
      this.form.get('nivelAcesso')?.disable();
    }
    this.form.get("codigo")?.disable();
  }

  criaCodigoBeneficio(){
    let formNome: string = this.removeCaracteresEspeciais(this.form.get('nome')?.value);
    let codigo = formNome.replace(/ /g, "_").toUpperCase();
    this.form.get("codigo")?.setValue(codigo);
   
    this.cdr.detectChanges();
    return codigo;
  }

  removeCaracteresEspeciais(str: string){
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, "");
  }

  salvar(){
    let form = this.form.getRawValue();

    let beneficio: BeneficioAcessoModel = {
      id: form.id,
      nome: form.nome,
      codigo: this.criaCodigoBeneficio(),
      nomeNivelAcesso: form.nivelAcesso
    };

    if(beneficio.id.toString() != ''){
      this.beneficioAcessoService.atualizar(beneficio).pipe(
        tap((res: BeneficioAcessoModel) => {
          this.toast.success("Beneficio Atualizado!","Sucesso!");
          this.modal.dismissAll();
          this.cdr.detectChanges();
          return res;
        }),
        catchError((error) => {
          return error;
        })
      ).subscribe();
    }else{
      this.beneficioAcessoService.salvar(beneficio).pipe(
        tap((res: BeneficioAcessoModel) => {
          this.toast.success("Beneficio Cadastrado!","Sucesso!");
          return res;
        }),
        catchError((error) => {
          return error;
        })
      ).subscribe();
    }
  }

}
