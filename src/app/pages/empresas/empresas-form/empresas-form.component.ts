import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';

@Component({
  selector: 'app-empresas-form',
  templateUrl: './empresas-form.component.html',
  styleUrls: ['./empresas-form.component.scss']
})
export class EmpresasFormComponent implements OnInit {
  logoBase64: any;

  ramos: string[] = [
    "Pizzaria",
    "Lanchonete",
    "Restaurante",
    "Bar",
    "Imobiliária",
    "Salão de Beleza",
    "Barbearia",
    "Pet Shop",
    "Estudio de Tatuagem",
    "Loja de Informatica",
    "Loja de Roupa",
    "Pessoa Física",
  ];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NgbModal,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      cnpj: ['', Validators.required],
      email: ['', Validators.required],
      ramo: ['', Validators.required],
      endereco: this.fb.group({
        rua: ['', Validators.required],
        numero: ['', Validators.required],
        cep: ['', Validators.required],
        estado: ['', Validators.required],
        cidade: ['', Validators.required],
        uf: ['', Validators.required],
        bairro: ['', Validators.required],
      }),
      telefone: ['', Validators.required ],
      logo_b64: ['', Validators.required ],
    });
  }

  salvar(){
    let form = this.form.getRawValue();
    let empresa: EmpresaModel = {
      id: crypto.randomUUID(),
      nome: form.nome,
      cnpj: form.cnpj,
      email: form.email,
      ramo: form.ramo,
      endereco: {
        rua: form.endereco.rua,
        numero: form.endereco.numero,
        cep: form.endereco.cep,
        estado: form.endereco.estado,
        cidade: form.endereco.cidade,
        uf: form.endereco.uf,
        bairro: form.endereco.bairro
      },
      telefone: form.telefone,
      logo: this.logoBase64,
    }
    


    console.log(empresa);
  }
  fechar(){
    this.modal.dismissAll();
  }

  enviaLogo(event: any){
    const file = event.target.files[0];
    const fileReader = new FileReader;

    fileReader.readAsDataURL(file);
    fileReader.onloadend = (e) => {
      this.logoBase64 = e.target?.result;
    }
  }
}
