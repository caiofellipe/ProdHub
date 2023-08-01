export interface ProdutoModel{
    id?: string;
    indexP?: Number;
    nome: string;
    categoria: Number;
    subCategoria: Number;
    descricao: string;
    imagens: string | ArrayBuffer;
}