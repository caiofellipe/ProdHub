import { NivelAcessoModel } from "./nivelAcesso.model";

export interface BeneficioAcessoModel{
    id: Number;
    nome: String;
    nivelAcesso: NivelAcessoModel;
}