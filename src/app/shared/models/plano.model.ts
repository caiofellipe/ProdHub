import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { ProdutoModel } from "./produto.model";
import { NivelPlanoModel } from './nivelPlano.model';

export interface PlanoModel{
    id: string;
    nome: string;
    nivel: NivelPlanoModel;
    empresa: EmpresaModel;
    produto: ProdutoModel;
}