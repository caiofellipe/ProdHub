import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { Role } from "src/app/shared/models/role.model";
import { UsuarioModel } from "src/app/shared/models/usuario.model";
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { ResponseUsuarioAuthModel } from 'src/app/shared/models/responseUsuarioAuth.model';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
    public sidebarShow: boolean = false;
    usuario!: UsuarioModel;
    hidden: boolean = false;

    constructor(
        private router: Router,
        private routeActive: ActivatedRoute,
        private localStorageService: LocalStorageService,
        private usuarioService: UsuarioService
    ){}

    ngOnInit(): void {
        this.usuario = this.localStorageService.getToken().usuario as UsuarioModel;
    }

    perfil() {
        this.router.navigate(['/usuario'], {relativeTo: this.routeActive});
    }

    hiddenLink(){
        let usuarioTemPermissao = this.usuario.role.nome;
        return this.hidden = usuarioTemPermissao ? true : false
    }

    usuarioTemNivelAcesso(){
        let acesso: boolean = false;
        let role = this.usuario.role.nome;

        if(this.usuario.planoAcesso?.nivelAcesso.nome != "Bronze" || role){
            return acesso = true;
        }
        return acesso;
    }
}
