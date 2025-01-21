export interface Postagens {
  id: number;
  conteudo: string;
  data_criacao: string;
  status: string;
  qtd_up: number;
  qtd_down: number;
  prefeitura: number;
  nome_prefeitura: string;
  imagem: string;
  liked: boolean;
  disliked: boolean;
}
