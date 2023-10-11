import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { PlanoService } from 'src/app/core/services/plano.service';
import { PlanoModel } from 'src/app/shared/models/plano.model';
import { AuthService } from './../../core/services/auth.service';
@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.scss']
})
export class PlanosComponent implements OnInit {
  parametroRotaUsuarioId: any;
  planos: PlanoModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private modal: NgbModal,
    private toast: ToastrService,
    private localStorageService: LocalStorageService,
    private planoService: PlanoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //this.montaLinkConvite();
    this.getPlanos();
  }

  cadastrar(){
      //return this.modal.open(PlanosFormComponent, { size: "lg" });
  }

  getPlanos(){
    this.planoService.recuperaTodas().subscribe((res: PlanoModel[]) => {
      if(res.length > 0){
        this.planos = res;
      }
    });
  }


}
