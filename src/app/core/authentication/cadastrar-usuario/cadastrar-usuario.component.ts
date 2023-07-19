import { NivelUsuarioModel } from './../../../shared/models/nivelUsuario.model';
import { EmpresaModel } from './../../../shared/models/empresa.model';
import { LocalStorageService } from './../../services/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit {
  form!: FormGroup;
  novoUsuario!: UsuarioModel;
  fotoBase64: any;
  idUsuarioQueConvidou!: string | null;

  constructor(
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: '',
      email: '',
      senha: '',
      foto_b64: '',
    });

    this.idUsuarioQueConvidou = this.activatedRoute.snapshot.queryParamMap.get("usuario");
  }

  cadastrarNovoUsuario(){
    let formUsuario = this.form.getRawValue();
    let novoUsuario: UsuarioModel = {
      id: crypto.randomUUID(),
      idUsuarioConvite: this.idUsuarioQueConvidou || "",
      nome: formUsuario.nome,
      email: formUsuario.email,
      login: formUsuario.email,
      senha: formUsuario.senha,
      ativo: true,
      dataCriado: new Date(),
      dataAlterado: new Date(),
      nivelUsuario: {id: 2, nivel: "Usuario", sigla:"USER"},
      foto: this.fotoBase64, 
      empresaId: "",
    }
    let chave = this.criaChaveLocalStorage(novoUsuario?.id);
    this.localStorageService.salvarUsuario(chave, novoUsuario);    
    let usuarioLocalStorage = this.localStorageService.getUsuario(chave);
    if(usuarioLocalStorage != null){
      this.toast.success("Usuario " + novoUsuario.nome + " criado","Cadastro concluido.");
      this.form.reset();
    }
  }

  criaChaveLocalStorage(id?: string){
    return "usuario " + id;
  }

  enviaFoto(event: any){
    const file = event.target.files[0];
    const fileReader = new FileReader;

    fileReader.readAsDataURL(file);
    fileReader.onloadend = (e) => {
      this.fotoBase64 = e.target?.result;
    }
  }

  voltar(){
    this.route.navigate([".."]);
  }

}
