import { PlanoAcessoService } from './../../../core/services/planoAcesso.service';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { pesquisaEstadoPelaUf } from 'src/app/core/helpers/estadosHelper';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { CepResponseModel } from 'src/app/shared/models/cepResponse.model';
import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { PlanoAcessoModel } from 'src/app/shared/models/planoAcesso.model';
import { Ramo } from 'src/app/shared/models/ramo.model';
import { UsuarioModel } from 'src/app/shared/models/usuario.model';
import { CepService } from './../../../core/services/cep.service';

@Component({
  selector: 'app-empresas-form',
  templateUrl: './empresas-form.component.html',
  styleUrls: ['./empresas-form.component.scss']
})
export class EmpresasFormComponent implements OnInit {
  empresaEdit?: EmpresaModel;
  logoBase64!: any;
  temLogo: boolean = false;
  temRamo: Ramo | undefined;
  usuario!: UsuarioModel;
  empresa!: EmpresaModel;

  planoAcessoEscolhido!: PlanoAcessoModel;
  temPlano: string = "Contratar";

  ramos: Ramo[] = [
    {nome: "Pizzaria", checked: false},
    {nome: "Lanchonete", checked: false},
    {nome: "Restaurante", checked: false},
    {nome: "Bar", checked: false},
    {nome: "Imobiliária", checked: false},
    {nome: "Salão de Beleza", checked: false},
    {nome: "Barbearia", checked: false},
    {nome: "Pet Shop", checked: false},
    {nome: "Estudio de Tatuagem", checked: false},
    {nome: "Loja de Informatica", checked: false},
    {nome: "Loja de Roupa", checked: false},
    {nome: "Pessoa Física", checked: false},
  ];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NgbModal,
    private toast: ToastrService,
    private cepService: CepService,
    private empresaService: EmpresaService,
    private planoAcessoService: PlanoAcessoService,
  ) { }

  ngOnInit(): void {
    this.criaForm();
    this.desabilitaCamposEndereco();
  }

  criaForm(){
    this.form = this.fb.group({
      id: [this.empresaEdit?.id || ''],
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
      logo: [this.empresaEdit?.logo || '', Validators.required ],
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
        this.toast.success("Endereço preenchido.","Sucesso");
        this.form.get('endereco.cidade')?.setValue(res.localidade);
        this.form.get('endereco.bairro')?.setValue(res.bairro);
        this.form.get('endereco.rua')?.setValue(res.logradouro);
        this.form.get('endereco.uf')?.setValue(res.uf);
        this.form.get('endereco.estado')?.setValue(pesquisaEstadoPelaUf(res.uf));
      });
    }
  }

  fechar(){
    return this.modal.dismissAll();
  }

  enviaLogo(event: any){
    const file = event.target.files[0];
    const fileReader = new FileReader;

    fileReader.readAsDataURL(file);
    fileReader.onloadend = (e) => {
      if(e.target?.result != null){
        this.logoBase64 = e.target?.result;
      }
    }
  }

  alterarLogo(){
    this.temLogo = false;
    this.form.get('logo')?.reset();
  }

  salvar(){
    let form = this.form.getRawValue();
    let empresa: EmpresaModel = {
      nome: form.nome,
      cnpj: form.cnpj,
      email: form.email,
      ramo: form.ramo,
      endereco: {
        rua: form.endereco.rua,
        numero: Number(form.endereco.numero),
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
    
    if(this.planoAcessoEscolhido != null){
      this.planoAcessoService.salvar(this.planoAcessoEscolhido).subscribe((res: PlanoAcessoModel) => {
        if(res){
          this.toast.success("Plano de Acesso vinculado.","Sucesso!");
        }
      });
    }

    this.empresaService.criar(empresa).subscribe((res: HttpResponse<EmpresaModel>) => {
      if(res){
        this.toast.success("Empresa " + empresa.nome + " criada","Sucesso!");
        this.form.reset();
        this.fechar();
      }
    });
  }

  atualizar(){
    let form =  this.form.getRawValue();

    let empresa: EmpresaModel = {
      id: form.id,
      nome: form.nome,
      cnpj: form.cnpj,
      email: form.email,
      ramo: form.ramo,
      endereco: {
        rua: form.endereco.rua,
        numero: Number(form.endereco.numero),
        cep: form.endereco.cep,
        estado: form.endereco.estado,
        cidade: form.endereco.cidade,
        uf: form.endereco.uf,
        bairro: form.endereco.bairro
      },
      telefone: form.telefone,
      logo: this.logoBase64,
      usuario: this.usuario,
    };
   
    this.empresaService.atualizar(empresa).pipe(
      tap((resposta: EmpresaModel) => {
        this.toast.success("Cadastro da empresa " + resposta.nome + " foi atualizado","Sucesso.");
        this.form.reset();
        this.fechar();
      }),
      catchError((error) => {
        this.toast.error("Erro ao atualizar cadastro.","ERRO.");
        return error;
      })
    ).subscribe();
  }

}
