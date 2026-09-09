import { Injectable } from '@angular/core';
import { InterfaceProdutosTs as Produto } from './interface-produtos';

@Injectable({
  providedIn: 'root',
})
export class ProdutosMockService {
  private readonly produtos: Produto[] = [
    {
      id: 1,
      nome: 'Tênis Adidas Adizero',
      descricao: 'Tênis leve para corrida e treinos de alta performance.',
      preco: 899.9,
      imagem: 'https://placehold.co/600x600?text=Tenis+Adidas',
      tamanhos: ['37', '38', '39', '40', '41', '42'],
      categoria: 'Tênis',
    },
    {
      id: 2,
      nome: 'Jaqueta Adidas Running',
      descricao: 'Jaqueta esportiva para treinos em dias frios.',
      preco: 399.9,
      imagem: 'https://placehold.co/600x600?text=Jaqueta+Adidas',
      tamanhos: ['P', 'M', 'G', 'GG'],
      categoria: 'Futebol',
    },
    // Adicione mais produtos aqui.
  ];

  listar(): Produto[] {
    return this.produtos;
  }

  buscarPorId(id: number): Produto | undefined {
    return this.produtos.find((produto) => produto.id === id);
  }

  pesquisar(termo: string): Produto[] {
    const busca = termo.trim().toLowerCase();

    if (!busca) {
      return this.listar();
    }

    return this.produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(busca),
    );
  }

  relacionados(idAtual: number): Produto[] {
    return this.produtos
      .filter((produto) => produto.id !== idAtual)
      .slice(0, 4);
  }
}
