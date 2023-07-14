import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanosFormComponent } from './planos-form/planos-form.component';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.scss']
})
export class PlanosComponent implements OnInit {
  linkConvite!: string;
  parametroRotaUsuarioId: any;
  urlAtual!: string;
  host!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.montaLinkConvite();
  }
  
  montaLinkConvite(){
    this.parametroRotaUsuarioId = this.activatedRoute.snapshot.queryParamMap.get("usuario");
    this.host = window.location.origin;

    this.linkConvite = this.host + "/cadastre-se?usuario=" + this.parametroRotaUsuarioId;
  }

  cadastrar(){
    this.modal.open(PlanosFormComponent, { size: "lg" });
  }

}
