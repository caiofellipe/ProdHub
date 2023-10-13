import { NivelAcessoModel } from "./nivelAcesso.model";

export interface PlanoAcessoModel{
    id: Number;
    nome: String;
    descricao: String;
    valor: Number;
    dataEditado?: Date;
    nivelAcesso: NivelAcessoModel;
}