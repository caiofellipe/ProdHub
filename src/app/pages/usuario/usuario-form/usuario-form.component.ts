import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { UsuarioService } from './../../../core/services/usuario.service';
import { NivelUsuarioModel } from './../../../shared/models/nivelUsuario.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {
  criarUsuarioForm!: FormGroup;
  usuarioEdit!: UsuarioModel;
  nivelSelecionado!: NivelUsuarioModel;
  usuarioTemNivel!: string;

  checkboxNivelUsario: NivelUsuarioModel[] = [
    {id: 1, nivel: "Administrador", sigla:"ADMIN"},
    {id: 2, nivel: "Usuario", sigla:"USER"},
    {id: 3, nivel: "Anunciante", sigla:"ANUNC"},
  ];

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private modal: NgbModal,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.criaFormNovoUsuario(this.usuarioEdit);
  }

  criaFormNovoUsuario(usuario?: UsuarioModel){
    this.criarUsuarioForm = this.fb.group({
      nome: [usuario?.nome || ''],
      sobrenome: [usuario?.sobrenome || ''],
      email: [usuario?.email || ''],
      login: [usuario?.login || ''],
      idUsuario: [usuario?.idUsuario || ''],
      ativo: [usuario?.ativo || ''],
      dataCriado: [usuario?.dataCriado || ''],
      dataAlterado: [usuario?.dataAlterado || ''],
      nivelUsuario: [
        {
          id: [usuario?.nivelUsuario.id || ''],
          sigla: [usuario?.nivelUsuario.sigla || ''],
          nivel: [usuario?.nivelUsuario.nivel || ''],
        }
      ],
    });
    if(usuario?.idUsuario != null){
      this.usuarioTemNivel = usuario.nivelUsuario.nivel.toString();
    }
  }

  fechar(){
    return this.modal.dismissAll();
  }

  criarUsuario(){
    this.nivelSelecionado = this.criarUsuarioForm.get('nivelUsuario')?.value;

    let nivelEncontrado = this.checkboxNivelUsario.find(nv => nv.id == Number(this.nivelSelecionado));

    this.criarUsuarioForm.patchValue({
      nivelUsuario: nivelEncontrado,
    })

    let usuarioForm: UsuarioModel = this.criarUsuarioForm.getRawValue();
    this.usuarioService.criarUsuario(usuarioForm).subscribe((usuario: UsuarioModel) => {
      if(usuario){
        this.toast.success("Usuario "+ usuario.nome +" cadastrado.", "Criado com Sucesso!");
      }else{
        this.toast.error("Algo deu errado, usuario não cadastrado", "Erro");
        throw new Error('Erro, usuario não cadastrado');
      }
    });
  }
}
