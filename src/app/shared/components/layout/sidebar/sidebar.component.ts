import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent{
    
    constructor(
        private router: Router,
        private routeActive: ActivatedRoute,
    ){}

    acoesUsuarios() {
        console.log(this.routeActive);
        this.router.navigate(['usuario'], {relativeTo: this.routeActive});
    }
}