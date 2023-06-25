import { NivelUsuario } from './../../../shared/models/nivelUsuario.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {
  criarUsuarioForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.criaFormNovoUsuario();
  }

  criaFormNovoUsuario(usuario?: Usuario){
    this.criarUsuarioForm = this.fb.group({
      nome: [usuario?.nome || ''],
      sobrenome: [usuario?.sobrenome || ''],
      email: [usuario?.email || ''],
      login: [usuario?.login || ''],
      idUsuario: [usuario?.idUsuario || ''],
      ativo: [usuario?.ativo || ''],
      dataCriado: [usuario?.dataCriado || ''],
      dataAlterado: [usuario?.dataAlterado || ''],
      nivelUsuario: [usuario?.nivelUsuario || ''],
    });
  }

  fechar(){
    return this.modal.dismissAll();
  }

}
