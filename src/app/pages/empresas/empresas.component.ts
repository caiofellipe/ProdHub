import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { ProdutosModalComponent } from '../produtos/produtos-modal/produtos-modal.component';
import { EmpresasFormComponent } from './empresas-form/empresas-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {
  empresas: EmpresaModel[] = [];

  constructor(
    private empresaService: EmpresaService,
    private localStorageService: LocalStorageService,
    private modal: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.recuperaEmpresas();
  }

  cadastrar(){
    this.modal.open(EmpresasFormComponent, { size: "lg" });
  }
  
  recuperaEmpresas(): EmpresaModel[]{
    this.empresaService.recuperaTodas().subscribe((res: EmpresaModel[]) => this.empresas = res);
    return this.empresas;
  }

  verProdutos(empresa: EmpresaModel){
    this.router.navigate(["produtos"], {queryParams: { empresa: empresa.id }} );
  }

  editar(empresa: EmpresaModel){
    
    const modalRef = this.modal.open(EmpresasFormComponent, {size: "lg"});
    modalRef.componentInstance.empresaEdit = empresa;
  }
}
