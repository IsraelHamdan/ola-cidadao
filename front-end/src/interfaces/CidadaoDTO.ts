import { Endereco } from './endereco';

enum status {
  'LOGADO',
  'DESLOGADO',
}

export interface CidadaoDTO {
  endereco: Endereco;
  password: string;
  email: string;
  telefone: string;
  cpf: string;
  nome: string;
  dataNascimento: Date;
  last_login?: Date;
  is_superuser?: boolean;
  is_active?: boolean;
  status: status;
}
