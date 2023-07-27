import { LocalStorageService } from './../../../core/services/localStorage.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaModel } from 'src/app/shared/models/categoria.model';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { NivelPlanoModel } from 'src/app/shared/models/nivelPlano.model';
import { PlanoModel } from 'src/app/shared/models/plano.model';
import { SubCategoriaModel } from 'src/app/shared/models/subCategoria.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';

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
  comboSubCategorias: SubCategoriaModel[] = [];
  
  categorias: CategoriaModel[] = [
    {id:1, nome: "Alimentação"},
    {id:2, nome: "Beleza e Cuidados Pessoais"},
    {id:3, nome: "Tecnologia"},
  ];
  
  subCategorias: SubCategoriaModel[] = [
    {id: 1, nome: "Refeições prontas", idCategoria: 1},
    {id: 2, nome: "Kits de ingredientes para receitas", idCategoria: 1},
    {id: 3, nome: "Lanches Saudáveis", idCategoria: 1},
    {id: 4, nome: "Suplementos Alimentares", idCategoria: 1},
    {id: 5, nome: "Produtos para Limpeza facial", idCategoria: 2},
    {id: 6, nome: "Hidratantes", idCategoria: 2},
    {id: 7, nome: "Shampoos e condicionadores", idCategoria: 2},
    {id: 8, nome: "Maquiagem", idCategoria: 2},
    {id: 9, nome: "Plano de internet (Movel e Fibra)", idCategoria: 3},
    {id: 10, nome: "Assinatura Streaming", idCategoria: 3},
    {id: 11, nome: "Softwares de proteção de privacidade", idCategoria: 3},
  ];

  planos: PlanoModel[] = [];
  empresa?: EmpresaModel;
  usuarioAtual!: UsuarioModel;
  usuarioTemEmpresaCadastrada: boolean = false;

  temImagem: boolean = false;
  imagemBase64!: any;
  
  niveisPlano: NivelPlanoModel[] = [
    {id: 1, nivel:"BASICO"},
    {id: 2, nivel:"INTERMEDIARIO"},
    {id: 3, nivel:"PLUS"},
  ]
  usuarioNaoTemEmpresaCadastrada: boolean = false;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
  ){}

  ngOnInit(): void {
    this.criaForm();
  }

  criaForm(){
    this.form = this.fb.group({
      nome: ['', Validators.required],
      nivel: ['', Validators.required],
      empresa: ['', Validators.required],
      produto: this.fb.group({
        nome: ['', Validators.required],
        categoria: ['', Validators.required],
        subcategoria: ['', Validators.required],
        descricao: ['', Validators.required],
        imagens: ['', Validators.required],
      }),
    });

    this.form.get('empresa')?.disable();
    this.empresaVinculadaAoUsuario();
  }

  populaSelectSubCategoria(){
    let categoria = this.form.get('produto.categoria')?.value;
    if(this.comboSubCategorias.length > 0){
      this.comboSubCategorias = [];
    }

    this.subCategorias.map((subCat: SubCategoriaModel) => {
      if(subCat.idCategoria == Number(categoria)){
        this.comboSubCategorias.push(subCat);
      }
    });
  }

  avancar(){
    this.etapa = 2;
  }

  vinculaPlanoNaEmpresa(){

  }

  empresaVinculadaAoUsuario(){
    let empresas: EmpresaModel[] = this.localStorageService.todasEmpresas();
    let empresaEncontrada = empresas.find((empresa: EmpresaModel)=> empresa.id == this.usuarioAtual.empresaId);
    this.form.get('empresa')?.setValue(empresaEncontrada?.id); 
    this.empresa = empresaEncontrada;
    return empresaEncontrada;
  }

  voltar(){
    this.etapa = 1;
  }

  salvar(){
      let form = this.form.getRawValue();
      let plano: PlanoModel = {
        id: crypto.randomUUID(),
        nome: form.nome,
        nivel: form.nivel,
        empresaId: form.empresa,
        produto: {
          id: crypto.randomUUID(),
          nome: form.produto.nome,
          categoria: Number(form.produto.categoria),
          subcategoria: Number(form.produto.subcategoria),
          descricao: form.produto.descricao,
          imagens: this.imagemBase64,
        },
      };
      this.atualizaEmpresaComPlanoLocalStorage(plano, this.empresa);
    console.log(plano);
  }

  atualizaEmpresaComPlanoLocalStorage(plano: PlanoModel, empresa?: EmpresaModel){
    if(empresa){
      let chaveEmpresa = "empresa:" + empresa?.nome;
      this.planos.push(plano);
      console.log(empresa);
      if(this.planos.length > 0){
        empresa.planos.push(...this.planos);
      //  this.localStorageService.removerEmpresa(chaveEmpresa);
        this.localStorageService.salvarEmpresa(chaveEmpresa, empresa);
        console.log(empresa.planos);
      }
    }

  }

  enviaImagens(event: any){
    const file = event.target.files[0];
    const fileReader = new FileReader;

    fileReader.readAsDataURL(file);
    fileReader.onloadend = (e) => {
      this.imagemBase64 = e.target?.result ? e.target?.result : "";
      this.temImagem = true;
    }
  }
  alterarImagem(){
    this.temImagem = false;
  }

}
