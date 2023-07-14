import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NivelPlanoModel } from 'src/app/shared/models/nivelPlano.model';

@Component({
  selector: 'app-planos-form',
  templateUrl: './planos-form.component.html',
  styleUrls: ['./planos-form.component.scss']
})
export class PlanosFormComponent implements OnInit {
  form!: FormGroup;
  cadastroProduto: string = "Produto";
  cadastroPlano: string = "Plano";
  etapa: Number = 1;
  categorias: any[] = [];
  subCategorias: any[] = [];
  
  niveisPlano: NivelPlanoModel[] = [
    {id: 1, nivel:"BÁSICO"},
    {id: 2, nivel:"INTERMEDIARIO"},
    {id: 3, nivel:"PLUS"},
  ]

  constructor(
    private fb: FormBuilder,
  ){}

  ngOnInit(): void {
    this.criaForm();
  }

  criaForm(){
    this.form = this.fb.group({
      nome: ['', Validators.required],
      nivel: ['', Validators.required],
      produto: this.fb.group({
        nome: ['', Validators.required],
        categoria: ['', Validators.required],
        subcategoria: ['', Validators.required],
        descricao: ['', Validators.required],
        imagens: ['', Validators.required],
      }),
    });
  }

  avancar(){
    this.etapa = 2;

  }

  enviaImagens(event: any){}

}
