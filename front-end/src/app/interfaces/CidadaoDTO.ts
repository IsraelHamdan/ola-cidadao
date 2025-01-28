export interface CidadaoDTO {
  id: number;
  nome: string;
  cpf: string;
  data_nascimento: Date;
  email: string;
  telefone: string;
  password: string;
  last_login?: Date;
  is_superuser?: boolean;
  is_active?: boolean;
  status?: string;
  imagem_perfil?: string;
  imagem_background?: string;
  endereco: {
    id?: number;
    logradouro: string;
    bairro: string;
    numero: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}
