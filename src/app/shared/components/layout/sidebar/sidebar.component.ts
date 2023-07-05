import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent{
    public sidebarShow: boolean = false;
    
    constructor(
        private router: Router,
        private routeActive: ActivatedRoute,
    ){}

    perfil() {
        this.router.navigate(['/usuario'], {relativeTo: this.routeActive});
    }

    planos(){
        this.router.navigate(["/planos"], {relativeTo: this.routeActive});
    }
    empresas(){
        this.router.navigate(["/empresas"], {relativeTo: this.routeActive});
    }
}
