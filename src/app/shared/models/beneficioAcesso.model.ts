import { NivelAcessoModel } from "./nivelAcesso.model";

export interface BeneficioAcessoModel{
    id: Number;
    nome: string;
    nivelAcesso?: NivelAcessoModel;
    nomeNivelAcesso: string,
    codigo: string;
}