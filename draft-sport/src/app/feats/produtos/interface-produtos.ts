// Contrato que define quais informações toda tela de produto pode utilizar.
// Quando a API for integrada, a resposta dela deverá ser adaptada para este formato.
export interface InterfaceProdutosTs {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  tamanhos: string[];
  categoria: string;
}
