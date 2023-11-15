import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { ProdutoModel } from 'src/app/shared/models/produto.model';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
import { ProdutosModalComponent } from './produtos-modal/produtos-modal.component';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  quantidadeProdutosNoPlano: string = "";
  produtos: ProdutoModel[] = [];
  empresa!: EmpresaModel;
  temProduto!: boolean;
  usuario!: UsuarioModel;
  sugereMudancaPlano: boolean = false;
  podeCadastrarProduto!: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modal: NgbModal,
    private toast: ToastrService,
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(parametro => {
      let empresaId: Number = parametro['empresa'];

      if(empresaId == undefined || empresaId == null || empresaId == 0){
        this.router.navigate(["/empresa"]);
        this.toast.error("Empresa inválida", "ERRO");
        throw new Error("Empresa inválida");
      }else{
        this.empresaService.recuperaPorId(empresaId).pipe(
          tap((res: EmpresaModel) => {
            this.empresa = res;
            
            if(this.empresa.produto != undefined && this.empresa.produto?.length > 0){
              this.toast.success("Confira os produtos.", "Sucesso");
              this.temProduto = true;
            }else{
              this.toast.warning("É necessário cadastrar produtos.", "Atenção"); 
              this.temProduto = false;
            }

          }),
          catchError((error) => {
            this.toast.error(error.error.erro,"ERRO");
            return error;
          })
        ).subscribe();
      }
    });
  
  
  }


  verProduto(produto: ProdutoModel){
    const modalRefProdutos = this.modal.open(ProdutosModalComponent, { size: "lg" });
    modalRefProdutos.componentInstance.produto = produto;
  }

  abrirModalCadastro(){
    let quantidadeProdutosPlano: number | undefined = this.empresa.usuario?.planoAcesso?.quantidadeProdutos; 
    let quantidadeProdutosNaEmresa: number | undefined = this.empresa.produto?.length;
 

    if(this.empresa.usuario == undefined){
      this.toast.info("Empresa não tem vinculo com nenhum usuario","Atenção");
    }

    if(quantidadeProdutosPlano != undefined && quantidadeProdutosNaEmresa != undefined){
      if(quantidadeProdutosNaEmresa <= quantidadeProdutosPlano){
        const modalRef = this.modal.open(ProdutosFormComponent, { size: "lg" });
        modalRef.componentInstance.empresa = this.empresa;
        modalRef.componentInstance.usuario = this.empresa.usuario;
      }else{
        this.sugereMudancaPlano = true;
      }
    }



  }

  getUsuario(){
    this.usuario = this.usuarioService.getUsuarioAtualLocalStorage();

  }

}
