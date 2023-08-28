import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { EmpresasFormComponent } from './empresas-form/empresas-form.component';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { LoginComponent } from 'src/app/core/authentication/login/login.component';
import { HttpResponse } from '@angular/common/http';

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
  ) { }

  ngOnInit(): void {
   // this.empresas.push(...this.empresaService.getTodasEmpresas());
    //this.recuperaEmpresaLocalStorage();
    this.recuperaEmpresas();
  }

  recuperaEmpresaLocalStorage(){
    
    /*let empresa = this.localStorageService.todasEmpresas();
    if(empresa.length > 0){
      this.empresas.push(...empresa);
    }*/

    console.log("IMPLEMENTAR O RECUPERAR EMPRESAS ");
  }

  cadastrar(){
    this.modal.open(EmpresasFormComponent, { size: "lg" });
  }
  
  recuperaEmpresas(): EmpresaModel[]{
    this.empresaService.recuperaTodas().subscribe((res: EmpresaModel[]) => this.empresas = res);
    return this.empresas;
  }

  verPlanos(empresa: EmpresaModel){}

  editar(empresa: EmpresaModel){
    
    const modalRef = this.modal.open(EmpresasFormComponent, {size: "lg"});
    modalRef.componentInstance.empresaEdit = empresa;
  }
}
