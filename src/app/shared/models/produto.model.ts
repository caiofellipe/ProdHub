import { CategoriaModel } from "./categoria.model";
import { SubCategoriaModel } from "./subCategoria.model";

export interface ProdutoModel{
    id?: string;
    nome: string;
    categoria: CategoriaModel;
    subCategoria: SubCategoriaModel;
    descricao: string;
    imagem: string | ArrayBuffer;
}