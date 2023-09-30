import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuarioModel } from 'src/app/shared/models/loginUsuario.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from './../../services/auth.service';
import { ResponseUsuarioAuthModel } from 'src/app/shared/models/responseUsuarioAuth.model';
import { catchError, finalize, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  autenticado: boolean = false;
  public usuarioLogado!: UsuarioModel;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private routeActive: ActivatedRoute,
    private toast: ToastrService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  login(){
    let formLogin = this.form.getRawValue();
    let login: LoginUsuarioModel = {
      email: formLogin.email,
      senha: formLogin.senha,
    }
    
    this.authService.sendAuth(login).pipe(
      tap((resposta: ResponseUsuarioAuthModel) => {
        this.autenticado = true;
        this.authService.setToken(resposta);
        this.localStorageService.salvaToken(resposta);
        this.usuarioLogado = resposta.usuario;
        this.toast.success("Autenticação realizada.","Sucesso");
        this.router.navigate(["contratar-planos"], {queryParams: { usuario: resposta.usuario.id }} );
      }),
      catchError((error) => {
        this.toast.error(error.error.erro,"");
        return throwError(error);
      })
    ).subscribe();
  }
}
