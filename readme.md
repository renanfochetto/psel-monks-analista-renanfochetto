## 📌 PSEL MONKS - Analista - RENAN FOCHETTO

Este projeto consiste em uma página responsiva baseada no mockup fornecido no Figma, utilizando React no frontend e WordPress como backend. Ele consome dados via API REST do WordPress, tornando as informações totalmente dinâmicas.

### 📝 Descrição

O objetivo do projeto é desenvolver uma interface interativa e responsiva que exiba textos, links, cards e imagens carregados diretamente da API REST do WordPress. Além disso, o sistema possui um formulário com validação avançada e envio dos dados para um custom post type, garantindo que os registros sejam armazenados corretamente no WordPress.


### 🚀 Tecnologias Utilizadas
- React (Frontend)
- CSS Modules (Estilização)
- WordPress (Backend)
- API REST do WordPress (Consumo de dados dinâmico)
- ACF to REST API (Plugin para expor campos personalizados)
- Custom Post Type (Registro de formulários no WP)


### 📡 Endpoints Disponíveis
- Listar Posts com ACF

URL:
- https://psel-backend.shop/wp-json/acf/v3/posts
Método: GET Descrição: Retorna todos os posts com seus campos personalizados via ACF. 

### 📎 Exemplo de Resposta JSON:

json
[
{
"id": 1,
"title": "Título do Post",
"acf": {
"backgroundImage": "https://psel-backend.shop/wp-content/uploads/image.jpg",
"headerTitle": "Bem-vindo ao Site"
}
}
]
- Obter um Post Específico
URL:

https://psel-backend.shop/wp-json/acf/v3/posts/{id}
Método: GET Descrição: Retorna os detalhes de um post específico, incluindo os campos ACF.

- Formulário de Contato (Envio para Custom Post Type)

URL:

https://psel-backend.shop/wp-json/custom/v1/submit-form
Método: POST Descrição: Envia os dados do formulário e registra no WordPress. 

### 📎 Exemplo de Requisição:

json
{
"name": "João Silva",
"email": "joao@email.com",
"phone": "11999999999",
"cpf": "000.000.000-00"
}
📜 Validação do Formulário
O sistema de formulário inclui validação dos seguintes campos: ✅ Nome: Apenas letras, mínimo de 3 caracteres ✅ E-mail: Formato válido (usuario@dominio.com) ✅ Telefone: Aceita formatos nacionais e internacionais (+55 11 99999-9999) ✅ CPF: Padrão 000.000.000-00 ✅ Campo Matemático: Usuário deve resolver um cálculo simples antes do envio


### 🔄 Como Rodar o Projeto

1️⃣ Clone o repositório:

bash
git clone https://github.com/seu_usuario/psel-monks-analista-seu-nome.git

2️⃣ Acesse a pasta do projeto:

bash
cd psel-monks-analista-seu-nome

3️⃣ Instale as dependências:

bash
npm install

4️⃣ Inicie o servidor de desenvolvimento:

bash
npm start

### 🛠 Possíveis Erros

- Erro 404 - Rota Não Encontrada

Certifique-se de que a URL está correta (/acf/v3/posts).

Verifique se os permalinks do WordPress estão configurados corretamente.

- Erro 403 - Acesso Negado

O servidor pode estar bloqueando requisições externas.

Plugins de segurança podem estar impedindo o acesso.


### 🎯 Teste os Endpoints
Para testar, você pode usar Postman ou um simples fetch no JavaScript:

javascript
fetch('https://psel-backend.shop/wp-json/acf/v3/posts')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Erro:', error));
📩 Contato e Suporte
Caso tenha dúvidas ou precise de suporte, entre em contato com a equipe de desenvolvimento.

📧 Email: renandfochetto@gmail.com
