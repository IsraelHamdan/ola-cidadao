import { Endereco } from './endereco';

export interface CreateAdminDTO {
  endereco: Endereco;
  password: string;
  email: string;
  telefone: string;
  nome: string;
  cpf: string;
  data_nascimento: Date;
}
