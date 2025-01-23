JSON_SCHEMA_CIDADAO = {
    "type": "object",
    "properties": {
        "nome": {"type": "string", "description": "Nome do cidadão"},
        "cpf": {"type": "string", "description": "CPF do cidadão"},
        "data_nascimento": {"type": "string", "format": "date", "description": "Data de nascimento no formato YYYY-MM-DD"},
        "email": {"type": "string", "description": "E-mail do cidadão"},
        "password": {"type": "string", "description": "Senha"},
        "telefone": {"type": "string", "description": "Telefone"},
        "endereco": {
            "type": "object",
            "properties": {
                "estado": {"type": "string", "description": "Estado do endereço"},
                "cidade": {"type": "string", "description": "Cidade do endereço"},
                "logradouro": {"type": "string", "description": "Logradouro do endereço"},
                "numero": {"type": "string", "description": "Número do endereço"},
                "bairro": {"type": "string", "description": "Bairro do endereço"},
                "cep": {"type": "string", "description": "CEP do endereço"}
            },
            "required": ["estado", "cidade", "logradouro", "numero", "bairro", "cep"]
        }
    },
    "required": ["nome", "cpf", "data_nascimento", "email", "password", "telefone", "endereco"]
}


JSON_SCHEMA_USER_FORM = {
    "type": "object",
     "properties": {
                "nome": {"type": "string", "description": "Nome do cidadão"},
                "cpf": {"type": "string", "description": "CPF do cidadão"},
                "data_nascimento": {"type": "string", "format": "date", "description": "Data de nascimento no formato YYYY-MM-DD"},
                "email": {"type": "string", "description": "E-mail do cidadão"},
                "password": {"type": "string", "description": "Senha"},
                "telefone": {"type": "string", "description": "Telefone"},
                "endereco.estado": {"type": "string", "description": "Estado do endereço"},
                "endereco.cidade": {"type": "string", "description": "Cidade do endereço"},
                "endereco.logradouro": {"type": "string", "description": "Logradouro do endereço"},
                "endereco.numero": {"type": "string", "description": "Número do endereço"},
                "endereco.bairro": {"type": "string", "description": "Bairro do endereço"},
                "endereco.cep": {"type": "string", "description": "CEP do endereço"},
                "imagem_perfil": {"type": "string", "format": "binary", "description": "Imagem de perfil (arquivo)"},
                "imagem_background": {"type": "string", "format": "binary", "description": "Imagem de fundo (arquivo)"},
            },
            "required": ["nome", "cpf", "data_nascimento", "email", "password", "telefone", "endereco.estado", "endereco.cidade", "endereco.logradouro", "endereco.numero", "endereco.bairro", "endereco.cep"],
        }
        