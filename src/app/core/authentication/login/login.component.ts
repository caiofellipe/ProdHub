import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUsuarioModel } from 'src/app/shared/models/loginUsuario.model';
import { LocalStorageService } from '../../services/localStorage.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  autenticado: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private routeActive: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    console.log("");
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
    let usuarioLocalStorage: UsuarioModel[] = this.localStorageService.todosUsuarios();

    if(usuarioLocalStorage == null){
      this.toast.error("Usuario não encontrado com estes dados","ERRO");
    }

    let usuario = usuarioLocalStorage.find((usuarioLocal: UsuarioModel) => usuarioLocal.email == login.email && usuarioLocal.senha && login.senha);
    if(usuario){
      this.autenticado = true;
      this.toast.success("Autenticação realizada.","Sucesso");
      this.router.navigate(["planos"], {queryParams: { usuario: usuario.id }} );
    }else{
      this.autenticado = false;
      this.toast.error("Email ou senha estão incorretos.","ERRO");
    }
  }
}
