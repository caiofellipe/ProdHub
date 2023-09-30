import { BeneficioAcessoModel } from 'src/app/shared/models/beneficioAcesso.model';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanoAcessoService } from 'src/app/core/services/planoAcesso.service';
import { NivelAcessoModel } from 'src/app/shared/models/nivelAcesso.model';
import { PlanoAcessoModel } from 'src/app/shared/models/planoAcesso.model';
import { catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contratar-planos-modal-edit',
  templateUrl: './contratar-planos-modal-edit.component.html',
  styleUrls: ['./contratar-planos-modal-edit.component.scss']
})
export class ContratarPlanosModalEditComponent implements OnInit {
  planoAcessoEdit!: PlanoAcessoModel
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private planoAcessoService: PlanoAcessoService,
    private modal: NgbModal,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.criaForm();

  }

  criaForm(){
    this.form = this.fb.group({
      id: this.planoAcessoEdit.id || '',
      nome: this.planoAcessoEdit.nome || '',
      descricao: this.planoAcessoEdit.descricao || '',
      nivelAcesso: this.fb.group({
        id: this.planoAcessoEdit.nivelAcesso.id || '',
        nome: this.planoAcessoEdit.nivelAcesso.nome || '',
        beneficioAcesso: this.fb.array([])
      }),
    });
    this.criaFormBeneficio();
    this.form.get('nivelAcesso.nome')?.disable();
  }

  criaFormBeneficio(){
    this.planoAcessoEdit.nivelAcesso.beneficioAcesso.forEach((beneficio: BeneficioAcessoModel) => {
      return this.beneficioArray.push(
        this.fb.group({
          id: beneficio.id,
          nome: beneficio.nome
        }));
    });
  }

  novoBeneficio(){
    return this.beneficioArray.push(
      this.fb.group({
        id: [''],
        nome: ['']
      }));
  }

  get beneficioArray(): FormArray{
    return this.form.get('nivelAcesso.beneficioAcesso') as FormArray;
  }

  atualizar(){
    let form = this.form.getRawValue();
    let nivelAcesso: NivelAcessoModel = form.nivelAcesso;
    let planoAcesso: PlanoAcessoModel = {
      id: Number(form.id),
      nome: form.nome,
      descricao: form.descricao,
      nivelAcesso: nivelAcesso,
    };
    this.planoAcessoService.atualizar(planoAcesso).pipe(
      tap((resposta: PlanoAcessoModel) => {
        this.toast.success("Atualizado.","Sucesso");
        return resposta;
      }),
      catchError((error) => {
        console.log(error);
        return error;
      })
    ).subscribe();
  }

}
