import { Component, OnInit } from '@angular/core';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { ProdutoModel } from 'src/app/shared/models/produto.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-produtos-modal',
  templateUrl: './produtos-modal.component.html',
  styleUrls: ['./produtos-modal.component.scss']
})
export class ProdutosModalComponent implements OnInit {
  produtos!: ProdutoModel[];
  empresa!: EmpresaModel;
  constructor() { }

  ngOnInit(): void {
  }

}
