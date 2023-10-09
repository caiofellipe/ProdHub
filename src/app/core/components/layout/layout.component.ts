import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private route: Router,
    private routeActive: ActivatedRoute,
    private toast: ToastrService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  convites(){
    this.route.navigate(["/convites"], {relativeTo: this.routeActive});
  }

  sair(){
    this.localStorageService.removeToken();
    this.toast.success("","Saindo.");
    this.route.navigate(["/login"]);
  }

}
