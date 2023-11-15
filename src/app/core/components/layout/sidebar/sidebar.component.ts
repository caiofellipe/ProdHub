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

    constructor(
        private router: Router,
        private routeActive: ActivatedRoute,
        private localStorageService: LocalStorageService,
        private usuarioService: UsuarioService
    ){}

    ngOnInit(): void {
    }

    perfil() {
        this.router.navigate(['/usuario'], {relativeTo: this.routeActive});
    }

    usuarioTemNivelAcesso(){
       return this.usuarioService.usuarioTemNivelAcesso();
    }

    roleUsuario(){
        return this.usuarioService.roleUsuario().nome;   
    }
}
