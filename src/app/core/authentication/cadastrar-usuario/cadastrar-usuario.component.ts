import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CadastroUsuarioModel } from 'src/app/shared/models/cadastroUsuario.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit {
  form!: FormGroup;
  fotoBase64: any;
  idUsuarioQueConvidou!: Number;

  constructor(
    private authService: AuthService,
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
    let novoUsuario: CadastroUsuarioModel = {
      idUsuarioConvite: this.idUsuarioQueConvidou || "",
      nome: formUsuario.nome,
      email: formUsuario.email,
      senha: formUsuario.senha,
      foto: this.fotoBase64, 
    }

    console.log(novoUsuario);

    this.authService.criarUsuarioComConvite(novoUsuario).subscribe((res: UsuarioModel) => {
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
