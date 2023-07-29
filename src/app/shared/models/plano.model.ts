import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { ProdutoModel } from "./produto.model";
import { NivelPlanoModel } from './nivelPlano.model';

export interface PlanoModel{
    id?: Number;
    nome: string;
    nivel: NivelPlanoModel;
    empresaId: Number;
    produto: ProdutoModel[];
}