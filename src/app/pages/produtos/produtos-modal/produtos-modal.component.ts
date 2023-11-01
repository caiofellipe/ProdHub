import { SubCategoriaModel } from 'src/app/shared/models/subCategoria.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriaModel } from 'src/app/shared/models/categoria.model';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { ProdutoModel } from 'src/app/shared/models/produto.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { ProdutoService } from 'src/app/core/services/produto.service';
import { catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-produtos-modal',
  templateUrl: './produtos-modal.component.html',
  styleUrls: ['./produtos-modal.component.scss']
})
export class ProdutosModalComponent implements OnInit {
  form!: FormGroup;
  produto!: ProdutoModel;
  empresa!: EmpresaModel;
  edicao: boolean = false;
  temImagem: boolean = false;
  categoria!: CategoriaModel;
  subCategoria!: SubCategoriaModel;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private toast: ToastrService,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  habilitarEdicao(){
    this.form = this.fb.group({
      id: [this.produto.id],
      nome: [this.produto.nome],
      categoria: [this.produto.categoria],
      subCategoria: [this.produto.subCategoria],
      descricao: [this.produto.descricao],
      empresa: [this.produto.empresa],
      imagem: [],
    });
    if(this.produto.imagem){
      this.temImagem = true;
    }
    return this.edicao = true;
  }

  editar(){
    let form = this.form.getRawValue();

    let produtoEdit: ProdutoModel = {
      id: form.id,
      nome: form.nome,
      categoria: form.categoria,
      subCategoria: form.subCategoria,
      descricao: form.descricao,
      empresa: this.produto.empresa,
      imagem: this.produto.imagem,
    }

    this.produtoService.atualizar(produtoEdit).pipe(
      tap((res: ProdutoModel) => {
        this.toast.success("Produto "+ res.nome +" Atualizado","Sucesso!");
        this.form.reset();
        this.fechar();
      }),
      catchError((error) => {
        return error
      })
    ).subscribe();
  }

  enviaImagem(event: any){
    const file = event.target.files[0];
    const fileReader = new FileReader;

    fileReader.readAsDataURL(file);
    fileReader.onloadend = (e) => {
      this.produto.imagem =  e.target?.result as string;
      this.temImagem = true;
    }
  }

  alterarImagem(){
    this.temImagem = false;
  }

  fechar(){
    this.modal.dismissAll();
  }


}
