import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { EmpresasFormComponent } from './empresas-form/empresas-form.component';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {
  empresas: EmpresaModel[] = [];

  constructor(
    private empresaService: EmpresaService,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.empresas.push(...this.empresaService.getTodasEmpresas());
  }

  cadastrar(){
    this.modal.open(EmpresasFormComponent, { size: "lg" });
  }
  verPlanos(empresa: EmpresaModel){}
  editar(empresa: EmpresaModel){}
}
