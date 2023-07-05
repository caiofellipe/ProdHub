import { EnderecoModel } from "./endereco.model";

export interface EmpresaModel{
    id: string;
    nome: string;
    cnpj: string;
    email: string;
    ramo: string;
    endereco: EnderecoModel;
    telefone: string;
    logo: string;
}