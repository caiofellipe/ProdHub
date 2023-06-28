import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  ) { }

  ngOnInit(): void {
    this.montaLinkConvite();
  }
  
  montaLinkConvite(){
    this.parametroRotaUsuarioId = this.activatedRoute.snapshot.queryParamMap.get("usuario");
    this.host = window.location.origin;

    this.linkConvite = this.host + "/cadastre-se?usuario=" + this.parametroRotaUsuarioId;
  }

}
