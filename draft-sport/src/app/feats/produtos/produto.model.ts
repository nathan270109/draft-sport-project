export interface ProdutoRequest {
  nome: string;
  descricao: string;
  preco: number;
  urlImagem: string;
}

export interface ProdutoListItem {
  id: number;
  nome: string;
  preco: number;
  urlImagem: string;
}

export interface Produto extends ProdutoRequest {
  id: number;
}
