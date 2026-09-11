// Formatos recebidos da API do professor. Eles refletem o JSON do backend,
// por isso usam urlImagem, e não imagem como o modelo visual do frontend.
export interface ProdutoListResponseApi {
  id: number;
  nome: string;
  preco: number;
  urlImagem: string;
}

export interface ProdutoResponseApi extends ProdutoListResponseApi {
  descricao: string;
}

// Corpo aceito pela API para criar ou atualizar um produto.
export interface ProdutoRequestApi {
  nome: string;
  descricao: string;
  preco: number;
  urlImagem: string;
}
