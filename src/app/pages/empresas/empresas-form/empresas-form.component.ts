import { CepService } from './../../../core/services/cep.service';
import { LocalStorageService } from './../../../core/services/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { pesquisaEstadoPelaUf } from 'src/app/core/helpers/estadosHelper';
import { CepResponseModel } from 'src/app/shared/models/cepResponse.model';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-empresas-form',
  templateUrl: './empresas-form.component.html',
  styleUrls: ['./empresas-form.component.scss']
})
export class EmpresasFormComponent implements OnInit {
  empresaEdit?: EmpresaModel;
  logoBase64: any;
  temLogo: boolean = false;
  usuario!: UsuarioModel;

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
    private cepService: CepService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.criaForm();
    this.desabilitaCamposEndereco();
    
  }

  criaForm(){
    this.form = this.fb.group({
      nome: [this.empresaEdit?.nome || '', Validators.required],
      cnpj: [this.empresaEdit?.cnpj || '', Validators.required],
      email: [this.empresaEdit?.email || '', Validators.required],
      ramo: [this.empresaEdit?.ramo || '', Validators.required],
      endereco: this.fb.group({
        rua: [this.empresaEdit?.endereco.rua || '', Validators.required],
        numero: [this.empresaEdit?.endereco.numero || '', Validators.required],
        cep: [this.empresaEdit?.endereco.cep || '', Validators.required],
        estado: [this.empresaEdit?.endereco.estado || '', Validators.required],
        cidade: [this.empresaEdit?.endereco.cidade || '', Validators.required],
        uf: [this.empresaEdit?.endereco.uf || '', Validators.required],
        bairro: [this.empresaEdit?.endereco.bairro || '', Validators.required],
      }),
      telefone: [this.empresaEdit?.telefone || '', Validators.required ],
      logo_b64: [this.empresaEdit?.logo || '', Validators.required ],
    });

    if(this.empresaEdit?.logo){
      this.temLogo = true;
    }

  }

  desabilitaCamposEndereco(){
    this.form.get('endereco.cidade')?.disable();
    this.form.get('endereco.bairro')?.disable();
    this.form.get('endereco.estado')?.disable();
    this.form.get('endereco.rua')?.disable();
    this.form.get('endereco.uf')?.disable();
  }

  buscaCep(cep: string){
    if(cep){
      this.cepService.getCep(cep).subscribe((res: CepResponseModel) => {
        if(res.erro){
          this.toast.warning("Digite outro Nº de CEP","CEP não encontrado.");
        }
        this.form.get('endereco.cidade')?.setValue(res.localidade);
        this.form.get('endereco.bairro')?.setValue(res.bairro);
        this.form.get('endereco.rua')?.setValue(res.logradouro);
        this.form.get('endereco.uf')?.setValue(res.uf);
        this.form.get('endereco.estado')?.setValue(pesquisaEstadoPelaUf(res.uf));
      });
    }
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
      usuario: this.usuario,
    }
    
    if(this.usuario.empresaId == ""){
      this.atualizaEmpresaIdNoCadastroUsuario(empresa.id, empresa.usuario);
    }
  
    this.localStorageService.salvarEmpresa("empresa:" + empresa.nome, empresa);
    this.localStorageService.getEmpresa(empresa.nome);
    this.toast.success("Empresa " + empresa.nome + " criada","Cadastro concluido.");
    this.form.reset();
    this.fechar();

  }

  atualizaEmpresaIdNoCadastroUsuario(empresaId: string, usuario: UsuarioModel){
    let chaveUsuario = "usuario " + usuario.id;
    this.localStorageService.removerUsuario(chaveUsuario);
    usuario.empresaId = empresaId;
    this.localStorageService.salvarUsuario(chaveUsuario, usuario);
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

  alterarLogo(){
    this.temLogo = false;
    this.form.get('logo_b64')?.reset();
  }
}
