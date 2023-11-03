import { BeneficioAcessoModel } from "./beneficioAcesso.model";

export interface NivelAcessoModel{
    id: Number;
    nome: string;
    beneficioAcesso: BeneficioAcessoModel[];
}