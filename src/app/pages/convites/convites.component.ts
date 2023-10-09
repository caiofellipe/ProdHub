import { LocalStorageService } from './../../core/services/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseUsuarioAuthModel } from 'src/app/shared/models/responseUsuarioAuth.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-convites',
  templateUrl: './convites.component.html',
  styleUrls: ['./convites.component.scss']
})
export class ConvitesComponent implements OnInit {
  parametroRotaUsuarioId: any;
  linkConvite!: string;
  urlAtual!: string;
  host!: string;
  usuarioAuth!: ResponseUsuarioAuthModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modal: NgbModal,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
  }

  gerarLinkConvite(){
    //this.parametroRotaUsuarioId = this.activatedRoute.snapshot.queryParamMap.get("usuario");
    this.host = window.location.origin;
    
    this.usuarioAuth = this.localStorageService.getToken();
    
    //if(this.parametroRotaUsuarioId){
      //this.linkConvite = this.host + "/#/cadastre-se?usuario=" + this.parametroRotaUsuarioId;
    //}else{
      return this.linkConvite = this.host + "/#/cadastre-se?usuario=" + this.usuarioAuth.usuario.id;
    //}
  }

}
