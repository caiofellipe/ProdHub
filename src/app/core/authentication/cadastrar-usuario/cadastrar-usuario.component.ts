import { NivelUsuarioModel } from './../../../shared/models/nivelUsuario.model';
import { EmpresaModel } from './../../../shared/models/empresa.model';
import { LocalStorageService } from './../../services/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit {
  form!: FormGroup;
  novoUsuario!: UsuarioModel;
  fotoBase64: any;
  idUsuarioQueConvidou!: Number;

  constructor(
    private usuarioService: UsuarioService,
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

    this.idUsuarioQueConvidou = Number(this.activatedRoute.snapshot.queryParamMap.get("usuario"));
  }

  cadastrarNovoUsuario(){
    let formUsuario = this.form.getRawValue();
    let novoUsuario: UsuarioModel = {
      idUsuarioConvite: this.idUsuarioQueConvidou || "",
      nome: formUsuario.nome,
      email: formUsuario.email,
      senha: formUsuario.senha,
      foto: this.fotoBase64, 
    }

    this.usuarioService.criarUsuario(novoUsuario).subscribe((res: UsuarioModel) => {
      console.log(res);
      if(res.id){
        this.toast.success("Usuario " + novoUsuario.nome + " criado", "Cadastro concluido.");
        this.form.reset();
      }
    });

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
