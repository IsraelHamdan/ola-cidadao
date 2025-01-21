import { Resposta } from "./Resposta";

export interface Manifestacao {
  id: number;
  conteudo: string;
  tipo: string;
  data_criacao: string;
  nome_cidadao: string;
  cidadao: number;
  nome_orgao: string;
  imagem: string;
  orgao: number;
  qtd_up: number;
  qtd_down: number;
  status: string;
  liked: boolean;
  disliked: boolean;
  respostas: Resposta[];
  show: boolean;
}
