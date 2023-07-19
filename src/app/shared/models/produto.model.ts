export interface ProdutoModel{
    id: string;
    nome: string;
    categoria: Number;
    subcategoria: Number;
    descricao: string;
    imagens: Blob[] | string[];
}