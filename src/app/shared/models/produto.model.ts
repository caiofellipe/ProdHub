export interface ProdutoModel{
    id: string;
    nome: string;
    categoria: string;
    subcategoria: string;
    descricao: string;
    imagens: Blob[] | string[];
}