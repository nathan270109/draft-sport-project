export interface InterfaceProdutosTs { 
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  tamanhos: string[] | number[];
  categoria: string;
}
