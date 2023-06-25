import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  form!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private modal: NgbModal
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
    console.log(this.form.getRawValue());
  }

  criarUsuario(){
    this.modal.open(UsuarioFormComponent, { size: 'lg' });
  }

}
