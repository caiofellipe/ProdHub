export interface ProdutoModel{
    id?: string;
    nome: string;
    categoria: Number;
    subCategoria: Number;
    descricao: string;
    imagens: string | ArrayBuffer;
}