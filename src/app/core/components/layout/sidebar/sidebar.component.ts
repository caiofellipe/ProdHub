import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { Role } from "src/app/shared/models/role.model";
import { UsuarioModel } from "src/app/shared/models/usuario.model";

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
        private authService: AuthService,
    ){}

    ngOnInit(): void {
      //  this.getUsuarioAtual();
    }

    getUsuarioAtual(){
        this.authService.getUsuarioAtual().subscribe((res: UsuarioModel) => this.usuario = res);
    }

    perfil() {
        this.router.navigate(['/usuario'], {relativeTo: this.routeActive});
    }

    planos(){
        this.router.navigate(["/planos"], {relativeTo: this.routeActive});
    }
    empresas(){
        this.router.navigate(["/empresas"], {relativeTo: this.routeActive});
    }

    contratarPlanos(){
        this.router.navigate(["/contratar-planos"], {relativeTo: this.routeActive});
    }

    convites(){
        this.router.navigate(["/convites"], {relativeTo: this.routeActive});
    }

    hiddenLink(){
        let usuarioTemPermissao = this.usuario.roles?.find((role: Role) => role.nome.startsWith("ADMIN"));
        return this.hidden = usuarioTemPermissao ? true : false
    }
}
