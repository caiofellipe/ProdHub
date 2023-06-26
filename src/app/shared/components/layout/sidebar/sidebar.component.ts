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

    acoesUsuarios() {
        this.router.navigate(['usuario'], {relativeTo: this.routeActive});
    }
}
