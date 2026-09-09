import { Injectable } from '@angular/core';
import { InterfaceProdutosTs as Produto } from './interface-produtos';

function criarImagemMock(titulo: string, cor: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
      <rect width="600" height="600" fill="${cor}" />
      <circle cx="300" cy="240" r="100" fill="#ffffff" fill-opacity="0.35" />
      <path d="M210 275h180" stroke="#151515" stroke-opacity="0.35" stroke-width="16" stroke-linecap="round" />
      <text x="300" y="425" text-anchor="middle" fill="#151515" font-family="Arial, sans-serif" font-size="28" font-weight="700">${titulo}</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

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
      imagem: '/produtos/tenis-adizero-mock.png',
      tamanhos: ['37', '38', '39', '40', '41', '42'],
      categoria: 'Tênis',
    },
    {
      id: 2,
      nome: 'Jaqueta Adidas Running',
      descricao: 'Jaqueta esportiva para treinos em dias frios.',
      preco: 399.9,
      imagem: criarImagemMock('JAQUETA ADIDAS', '#e5e1dc'),
      tamanhos: ['P', 'M', 'G', 'GG'],
      categoria: 'Futebol',
    },
    {
  id: 3,
  nome: 'Camiseta Nike Dri-FIT',
  descricao: 'Camiseta esportiva leve, com tecido respirável para treinos e corridas.',
  preco: 149.9,
  imagem: criarImagemMock('CAMISETA NIKE', '#d7dee0'),
  tamanhos: ['P', 'M', 'G', 'GG'],
  categoria: 'Fitness',
},
{
  id: 4,
  nome: 'Short Nike Academy',
  descricao: 'Short confortável para futebol, academia e atividades do dia a dia.',
  preco: 119.9,
  imagem: criarImagemMock('SHORT NIKE', '#e8e4de'),
  tamanhos: ['P', 'M', 'G', 'GG'],
  categoria: 'Futebol',
},
{
  id: 5,
  nome: 'Bola Adidas Champions League',
  descricao: 'Bola de futebol com costura resistente para partidas e treinos.',
  preco: 199.9,
  imagem: criarImagemMock('BOLA ADIDAS', '#dbe2d6'),
  tamanhos: ['Único'],
  categoria: 'Futebol',
},
{
  id: 6,
  nome: 'Raquete Wilson Pro Staff',
  descricao: 'Raquete de tênis equilibrada para jogadores que buscam precisão e controle.',
  preco: 799.9,
  imagem: criarImagemMock('RAQUETE WILSON', '#e0d9d3'),
  tamanhos: ['Único'],
  categoria: 'Tênis',
},
{
  id: 7,
  nome: 'Legging Adidas Essentials',
  descricao: 'Calça legging de alta elasticidade para treinos, corrida e academia.',
  preco: 189.9,
  imagem: criarImagemMock('LEGGING ADIDAS', '#d9dce4'),
  tamanhos: ['P', 'M', 'G', 'GG'],
  categoria: 'Fitness',
},
{
  id: 8,
  nome: 'Tênis Asics Gel Excite',
  descricao: 'Tênis confortável com amortecimento para corridas leves e caminhadas.',
  preco: 459.9,
  imagem: criarImagemMock('TENIS ASICS', '#e4ded7'),
  tamanhos: ['37', '38', '39', '40', '41', '42'],
  categoria: 'Tênis',
},
{
  id: 9,
  nome: 'Mochila Puma RS',
  descricao: 'Mochila esportiva com compartimento principal amplo e bolsos laterais.',
  preco: 229.9,
  imagem: criarImagemMock('MOCHILA PUMA', '#d8e0de'),
  tamanhos: ['Único'],
  categoria: 'Acessórios',
},
{
  id: 10,
  nome: 'Luvas de Goleiro Adidas',
  descricao: 'Luvas com palma aderente para maior segurança durante defesas.',
  preco: 179.9,
  imagem: criarImagemMock('LUVAS ADIDAS', '#e4ddd9'),
  tamanhos: ['P', 'M', 'G'],
  categoria: 'Futebol',
},
{
  id: 11,
  nome: 'Top Esportivo On Running',
  descricao: 'Top de sustentação média, indicado para treinos funcionais e corrida.',
  preco: 159.9,
  imagem: criarImagemMock('TOP ESPORTIVO', '#dde2d9'),
  tamanhos: ['P', 'M', 'G'],
  categoria: 'Fitness',
},
{
  id: 12,
  nome: 'Boné New Era Performance',
  descricao: 'Boné leve com proteção solar e ajuste traseiro regulável.',
  preco: 139.9,
  imagem: criarImagemMock('BONE NEW ERA', '#dedbe4'),
  tamanhos: ['Único'],
  categoria: 'Acessórios',
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
