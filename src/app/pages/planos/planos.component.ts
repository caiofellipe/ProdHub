import { EmpresasFormComponent } from './../empresas/empresas-form/empresas-form.component';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanosFormComponent } from './planos-form/planos-form.component';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { ToastrService } from 'ngx-toastr';
import { PlanoModel } from 'src/app/shared/models/plano.model';
import { PlanoService } from 'src/app/core/services/plano.service';
import { ProdutoModel } from 'src/app/shared/models/produto.model';
import { ProdutoModalComponent } from './produto-modal/produto-modal.component';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.scss']
})
export class PlanosComponent implements OnInit {
  parametroRotaUsuarioId: any;
  linkConvite!: string;
  urlAtual!: string;
  host!: string;
  usuarioTemPlano: boolean = false;
  planos: PlanoModel[] = [];
  quantidadeProdutosNoPlano: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private modal: NgbModal,
    private toast: ToastrService,
    private localStorageService: LocalStorageService,
    private planoService: PlanoService,
  ) { }

  ngOnInit(): void {
    this.montaLinkConvite();
    this.getPlanos();
  }
  
  montaLinkConvite(){
    this.parametroRotaUsuarioId = this.activatedRoute.snapshot.queryParamMap.get("usuario");
    this.host = window.location.origin;

    this.linkConvite = this.host + "/cadastre-se?usuario=" + this.parametroRotaUsuarioId;
  }

  cadastrar(){
    let usuario: UsuarioModel = this.getUsuarioLogado(this.parametroRotaUsuarioId);
//    if(usuario.empresaId != "" && usuario.empresaId != undefined){
      const modalRefPlanosForm = this.modal.open(PlanosFormComponent, { size: "lg" });
      modalRefPlanosForm.componentInstance.usuarioAtual = usuario;
   /* }else{
      this.toast.error("","Nenhuma empresa vinculada a este usuario.");
      this.toast.warning("","Cadastre uma empresa para ser vinculada ao seu usuario");
      const modalRefCadastroEmpresa = this.modal.open(EmpresasFormComponent, { size: "lg" });
      modalRefCadastroEmpresa.componentInstance.usuario = usuario;
    }*/
  }

  getUsuarioLogado(usuarioId: string){
    let chave: string = "usuario " + usuarioId;
    return this.localStorageService.getUsuario(chave);
  }

  getPlanos(){
    this.planoService.recuperaTodas().subscribe((res: PlanoModel[]) => {
      if(res.length > 0){
        this.planos = res;
      }
    });
  }

  retornaDescricaoProduto(plano: PlanoModel){
    let descricaoProduto: string = "";
    this.quantidadeProdutosNoPlano = "Contém " + plano.produto.length + " Produtos.";
    
    if(plano.produto.length > 0){
      plano.produto.forEach((produto: ProdutoModel) => {
        descricaoProduto = produto.descricao;
      });
    }

    return descricaoProduto;
  }

  verProdutos(produtos: ProdutoModel[]){
    const modalRefProdutos = this.modal.open(ProdutoModalComponent, { size: "lg" });
    modalRefProdutos.componentInstance.produtos = produtos;
  }

}
