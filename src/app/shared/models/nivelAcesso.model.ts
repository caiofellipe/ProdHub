import { BeneficioAcessoModel } from "./beneficioAcesso.model";

export interface NivelAcessoModel{
    id: Number;
    nome: String;
    beneficioAcesso: BeneficioAcessoModel[];
}