import cloudinary
import cloudinary.uploader
import cloudinary.api

# Configuração
cloudinary.config( 
    cloud_name="dd3kzvj47", 
    api_key="956127224917645", 
    api_secret="dafH8dVvGuk2UP1CXY2BzQXaFp8",
    secure=True
)

# Teste de conexão
try:
    result = cloudinary.api.ping()
    print("Conexão com Cloudinary bem-sucedida!")
    print("Detalhes:", result)
except Exception as e:
    print("Erro ao conectar com o Cloudinary:", e)
