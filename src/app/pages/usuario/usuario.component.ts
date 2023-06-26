import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  form!: FormGroup;
  retornoUsuario: UsuarioModel[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private modal: NgbModal,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.criaForm();
  }

  criaForm(): void{
    this.form = this.fb.group({
      nome: '',
      email: '',
      login: '',
    });
  }
  onSubmit() {
    let usuarioForm = this.form.getRawValue();
    this.usuarioService.getUsuario(usuarioForm).subscribe((usuario: UsuarioModel) => {
      if(usuario){
        this.toast.success("", "Usuario encontrado!");
        this.retornoUsuario.push(usuario);
      }else{
        this.toast.info("","Nenhum Usuario encontrado");
        throw new Error("Usuario não encontrado");
      }
     });
  }

  abrirModal(){
    this.modal.open(UsuarioFormComponent, { size: 'lg' });
  }

  editar(usuario: UsuarioModel){
    const modalRef = this.modal.open(UsuarioFormComponent, { size: 'lg' });
    modalRef.componentInstance.usuarioEdit = usuario;
  }

  buscarTodos() {
    this.usuarioService.getTodosUsuario().subscribe((usuarios: UsuarioModel[]) => {
      if(usuarios.length > 0){
        this.retornoUsuario.push(...usuarios);
        this.toast.success("","Usuarios Encontrados");
      }else{
        this.toast.info("","Nenhum Usuario encontrado");
        throw new Error("Nenhum Usuario encontrado");
      }
    });
  }

}
