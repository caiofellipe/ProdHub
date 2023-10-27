import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { ProdutoModel } from 'src/app/shared/models/produto.model';
import { ProdutosModalComponent } from './produtos-modal/produtos-modal.component';
import { catchError, tap } from 'rxjs';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  quantidadeProdutosNoPlano: string = "";
  produtos: ProdutoModel[] = [];
  empresa!: EmpresaModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modal: NgbModal,
    private toast: ToastrService,
    private localStorageService: LocalStorageService,
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
            }else{
              this.toast.warning("É necessário cadastrar produtos.", "Atenção"); 
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

  retornaDescricaoProduto(produto: ProdutoModel){
    let descricaoProduto: string = "";
    this.quantidadeProdutosNoPlano = "Contém " + " Produtos.";
    
  /*  if(plano.produto.length > 0){
      plano.produto.forEach((produto: ProdutoModel) => {
        descricaoProduto = produto.descricao;
      });
    }
*/
    return descricaoProduto;
  }

  verProdutos(produtos: ProdutoModel){
    const modalRefProdutos = this.modal.open(ProdutosModalComponent, { size: "lg" });
    modalRefProdutos.componentInstance.produtos = produtos;
  }

  abrirModalCadastro(){
    const modalRef = this.modal.open(ProdutosModalComponent, { size: "lg" });
    modalRef.componentInstance.empresa = this.empresa;
  }

}