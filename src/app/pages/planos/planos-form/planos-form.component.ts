import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { PlanoService } from 'src/app/core/services/plano.service';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { NivelPlanoModel } from 'src/app/shared/models/nivelPlano.model';
import { PlanoModel } from 'src/app/shared/models/plano.model';
import { ProdutoModel } from 'src/app/shared/models/produto.model';
import { SubCategoriaModel } from 'src/app/shared/models/subCategoria.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { LocalStorageService } from './../../../core/services/localStorage.service';
import { CategoriaModel } from './../../../shared/models/categoria.model';

@Component({
  selector: 'app-planos-form',
  templateUrl: './planos-form.component.html',
  styleUrls: ['./planos-form.component.scss']
})
export class PlanosFormComponent implements OnInit {
  form!: FormGroup;
  produtoForm!: FormGroup;
  cadastroProduto: string = "Produto";
  cadastroPlano: string = "Plano";
  etapa: Number = 1;
  comboSubCategorias: SubCategoriaModel[] = [];
  comboEmpresas: EmpresaModel[] = [];
  
  categorias: CategoriaModel[] = [
    {id:1, nome: "Alimentação"},
    {id:2, nome: "Beleza e Cuidados Pessoais"},
    {id:3, nome: "Tecnologia"},
  ];
  
  subCategorias: SubCategoriaModel[] = [
    {id: 1, nome: "Refeições prontas", categoriaId: 1},
    {id: 2, nome: "Kits de ingredientes para receitas", categoriaId: 1},
    {id: 3, nome: "Lanches Saudáveis", categoriaId: 1},
    {id: 4, nome: "Suplementos Alimentares", categoriaId: 1},
    {id: 5, nome: "Produtos para Limpeza facial", categoriaId: 2},
    {id: 6, nome: "Hidratantes", categoriaId: 2},
    {id: 7, nome: "Shampoos e condicionadores", categoriaId: 2},
    {id: 8, nome: "Maquiagem", categoriaId: 2},
    {id: 9, nome: "Plano de internet (Movel e Fibra)", categoriaId: 3},
    {id: 10, nome: "Assinatura Streaming", categoriaId: 3},
    {id: 11, nome: "Softwares de proteção de privacidade", categoriaId: 3},
  ];

  planos: PlanoModel[] = [];
  produtos: ProdutoModel[] = [];
  empresa?: EmpresaModel;
  usuarioAtual!: UsuarioModel;
  usuarioTemEmpresaCadastrada: boolean = false;

  temImagem: boolean = false;
  imagemBase64: string | ArrayBuffer = "";
  
  niveisPlano: NivelPlanoModel[] = [
    {id: 1, nivel:"BASICO"},
    {id: 2, nivel:"INTERMEDIARIO"},
    {id: 3, nivel:"PLUS"},
  ]
  usuarioNaoTemEmpresaCadastrada: boolean = false;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private empresaService: EmpresaService,
    private planoService: PlanoService,
    private toast: ToastrService,
    private modal: NgbModal,
  ){}

  ngOnInit(): void {
    this.criaForm();
    this.criarFormProduto();
  }

  criaForm(){
    this.form = this.fb.group({
      nome: ['', Validators.required],
      nivel: ['', Validators.required],
      empresaId: ['', Validators.required],
      produto: this.fb.array([]),
    });

    this.form.get('empresa')?.disable();
    //this.empresaVinculadaAoUsuario();
    this.populaSelectEmpresas();
  }

  novoProduto(){
    this.criarFormProduto();
    this.temImagem = false;
   }
 
   criarFormProduto(){
     return this.produtoArray.push(this.fb.group({
       nome: [''],
       categoria: [''],
       subCategoria: [''],
       descricao: [''],
       imagem: ['']
     }));
   }
 
   get produtoArray(): FormArray{
     return this.form.get('produto') as FormArray;
   }

  populaSelectSubCategoria(produto:any, eventInput: any, indexProdutoAtual: number){
    let categoria = eventInput.target?.value;

    if(this.comboSubCategorias.length > 0){
      this.comboSubCategorias = [];
    }
  
    this.subCategorias.map((subCat: SubCategoriaModel) => {
      if(subCat.categoriaId == Number(categoria)){
        this.comboSubCategorias.push(subCat);
      }
    });
  }

  populaSelectEmpresas(){
    this.empresaService.recuperaTodas().subscribe((res: EmpresaModel[]) => this.comboEmpresas = res);
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
    this.produtos = form.produto;
    const produtosFormatado: ProdutoModel[] = form.produto; 
    this.produtos.map((p: ProdutoModel) => {
      produtosFormatado.map((pr: ProdutoModel) => {
        pr.nome = p.nome,
        pr.categoria = this.getCategoria(Number(p.categoria)),
        pr.subCategoria = this.getSubCategoria(Number(p.categoria.id), Number(p.subCategoria)),
        pr.descricao = p.descricao,
        pr.imagem = p.imagem
      });
      return produtosFormatado;
    });
    let plano: PlanoModel = {
      nome: form.nome,
      nivel: form.nivel,
      empresaId: Number(form.empresaId),
      produto: produtosFormatado,
    };

    this.planoService.criar(plano).subscribe((res: HttpResponse<PlanoModel>) => {
      if(res){
        this.toast.success("Plano e Produto cadastrado com Sucesso");
        this.form.reset();
        this.fechar();
      }
    });
    // this.atualizaEmpresaComPlanoLocalStorage(plano, this.empresa);
  }

  getCategoria(categoriaId: Number){
    const cat = this.categorias.find((ct: CategoriaModel) => ct.id == categoriaId);
    
    if(cat == undefined){
      throw new Error("Categoria não encontrada!");
    }
    return cat;
  }

  getSubCategoria(categoriaId: Number, subCategoriaId: Number){
    const subCat = this.subCategorias.find((sbCat: SubCategoriaModel) => sbCat.categoriaId == categoriaId && sbCat.id == subCategoriaId);
    if(subCat == undefined){
      throw new Error("SubCategoria não encontrada!");
    }
    return subCat;
  }

  atualizaEmpresaComPlanoLocalStorage(plano: PlanoModel, empresa?: EmpresaModel){
    if(empresa){
      let chaveEmpresa = "empresa:" + empresa?.nome;
      this.planos.push(plano);
      if(this.planos.length > 0){
        empresa.planos.push(...this.planos);
      //  this.localStorageService.removerEmpresa(chaveEmpresa);
        this.localStorageService.salvarEmpresa(chaveEmpresa, empresa);
      }
    }

  }

  enviaImagem(event: any, index: number){
    const file = event.target.files[0];
    const fileReader = new FileReader;
    const produtos: ProdutoModel[] = this.form.get('produto')?.value;
    
    const pr = produtos.at(index);
    if(pr){
      fileReader.readAsDataURL(file);
      fileReader.onloadend = (e) => {
        pr.imagem = e.target?.result ? e.target?.result : "";
        this.temImagem = true;
      }
      this.produtos.push(pr);
    }
    
    // Insere imagem codificada em um array de string - habilitar se o 1 Produto possibilitar multiplas imagem
    /*const files: FileList = event.target.files;
    const fileReader = new FileReader;
    
    fileReader.onload = (e) => {
      const base64String = e.target?.result as string;
      
     for(let i = 0; i < files.length; i++){
      this.imagemBase64.push(base64String);
     }
     this.temImagem = true;
    };

    const blob: Blob[] = [];
    for(let i = 0; i < files.length; i++){
      blob.push(files[i]);
    }

    fileReader.readAsDataURL(new Blob(blob));
    */
  }

  alterarImagem(){
    this.temImagem = false;
  }

  fechar(){
    this.modal.dismissAll();
  }

}
