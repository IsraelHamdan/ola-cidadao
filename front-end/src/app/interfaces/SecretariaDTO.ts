export interface Secretaria {
  id: number;
  nome: string;
  descricao: string;
  email: 'user@example.com';
  telefone: string;
  prefeitura_rel: number;
  imagem_perfil: string;
  imagem_background: string;
  endereco: {
    id: number;
    estado: string;
    cidade: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cep: string;
  };
}
