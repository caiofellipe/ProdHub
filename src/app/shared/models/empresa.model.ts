import { EnderecoModel } from "./endereco.model";
import { PlanoModel } from "./plano.model";
import { UsuarioModel } from "./usuario.model";

export interface EmpresaModel{
    id: string;
    nome: string;
    cnpj: string;
    email: string;
    ramo: string;
    endereco: EnderecoModel;
    telefone: string;
    logo: string;
    planos?: PlanoModel[],
    usuario: UsuarioModel;
}