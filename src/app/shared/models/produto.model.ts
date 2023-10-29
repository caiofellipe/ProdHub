import { EmpresaModel } from 'src/app/shared/models/empresa.model';
import { CategoriaModel } from "./categoria.model";
import { SubCategoriaModel } from "./subCategoria.model";

export interface ProdutoModel{
    id?: string;
    nome: string;
    categoria: CategoriaModel;
    subCategoria: SubCategoriaModel;
    descricao: string;
    empresa: EmpresaModel;
    imagem: string | ArrayBuffer;
}