import { Component, OnInit } from '@angular/core';
import { ProdutoModel } from 'src/app/shared/models/produto.model';

@Component({
  selector: 'app-produto-modal',
  templateUrl: './produto-modal.component.html',
  styleUrls: ['./produto-modal.component.scss']
})
export class ProdutoModalComponent implements OnInit {
  produtos!: ProdutoModel[];
  constructor() { }

  ngOnInit(): void {
  }

}
