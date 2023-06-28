import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUsuarioModel } from 'src/app/shared/models/loginUsuario.model';
import { LocalStorageService } from '../../services/localStorage.service';
import { ToastrService } from 'ngx-toastr';

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
    let chave = this.criaChaveLocalStorage(login.email);
    let usuarioLocalStorage =  this.localStorageService.getUsuario(chave);

    if(usuarioLocalStorage.email == login.email &&
      usuarioLocalStorage.senha == login.senha){
        this.autenticado = true;
        this.toast.success("Autenticação realizada.","Sucesso");
        this.router.navigate(["home"], {queryParams: { usuario: usuarioLocalStorage.id }} );
    }else{
      this.autenticado = false;
      this.toast.success("Email ou senha estão incorretos.","ERRO");
    }

  }

  criaChaveLocalStorage(email: string){
    return "usuario " + email;
  }

  cadastrar() {
    this.router.navigate(['cadastre-se']);
  }

}
