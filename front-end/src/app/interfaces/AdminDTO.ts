import { Endereco } from './endereco';

export interface AdminDTO {
  id: number;
  endereco: Endereco;
  last_login?: Date;
  is_superuser: boolean;
  email: string;
  status?: true;
  data_criacao?: Date;
  is_active?: boolean;
  password: string;
  nome: string;
  cpf: string;
  data_nascimento: Date;
}
