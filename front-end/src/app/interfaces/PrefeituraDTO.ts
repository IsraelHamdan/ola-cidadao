export interface Prefeitura {
  id: 0;
  cidade: string;
  descricao: string;
  gestor: string;
  email: string;
  telefone: string;
  cnpj: string;
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
