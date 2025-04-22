📌 PSEL MONKS - Analista - RENAN FOCHETTO
Este projeto é uma aplicação responsiva baseada no mockup do Figma, utilizando React para o frontend e WordPress como backend, com dados consumidos através da API REST do WordPress.

📝 Descrição
O objetivo é desenvolver uma interface interativa que exibe textos, links, cards e imagens carregados diretamente da API do WordPress. O sistema também inclui um formulário dinâmico com validação avançada e envio de dados para um Custom Post Type no WordPress.

🚀 Tecnologias Utilizadas
React (Frontend)

CSS Modules (Estilização)

WordPress (Backend)

API REST do WordPress (Consumo de dados dinâmico)

ACF to REST API (Plugin para expor campos personalizados)

Custom Post Type (Registro de dados no WordPress)

📡 Endpoints da API
1. Listar Posts com ACF
   URL: https://psel-backend.shop/wp-json/acf/v3/posts

Método: GET

Descrição: Retorna todos os posts com campos personalizados via ACF.

Exemplo de Resposta JSON:
json
Copiar
Editar
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
2. Obter um Post Específico
   URL: https://psel-backend.shop/wp-json/acf/v3/posts/{id}

Método: GET

Descrição: Retorna os detalhes de um post específico, incluindo os campos ACF.

3. Formulário de Contato (Envio para Custom Post Type)
   URL: https://psel-backend.shop/wp-json/custom/v1/submit-form

Método: POST

Descrição: Envia os dados do formulário e os registra no WordPress.

Exemplo de Requisição:
json
Copiar
Editar
{
"name": "João Silva",
"email": "joao@email.com",
"phone": "11999999999",
"cpf": "000.000.000-00"
}
📜 Validação do Formulário
O formulário inclui validação dos seguintes campos:

✅ Nome: Apenas letras, mínimo de 3 caracteres

✅ E-mail: Formato válido (usuario@dominio.com)

✅ Telefone: Formatos nacionais e internacionais (+55 11 99999-9999)

✅ CPF: Padrão 000.000.000-00

✅ Campo Matemático: O usuário deve resolver um cálculo simples antes do envio.

🔄 Como Rodar o Projeto
1️⃣ Clone o repositório:

bash
Copiar
Editar
git clone https://github.com/seu_usuario/psel-monks-analista-seu-nome.git
2️⃣ Acesse a pasta do projeto:

bash
Copiar
Editar
cd psel-monks-analista-seu-nome
3️⃣ Instale as dependências:

bash
Copiar
Editar
npm install
4️⃣ Inicie o servidor de desenvolvimento:

bash
Copiar
Editar
npm start
🛠 Possíveis Erros e Soluções
Erro 404 - Rota Não Encontrada
Verifique se a URL da API está correta (/acf/v3/posts).

Certifique-se de que os permalinks do WordPress estão configurados corretamente.

Erro 403 - Acesso Negado
O servidor pode estar bloqueando requisições externas.

Verifique se há plugins de segurança que possam estar impedindo o acesso.

🎯 Testar Endpoints
Você pode testar os endpoints utilizando ferramentas como o Postman ou com uma simples requisição fetch em JavaScript.

Exemplo de requisição com fetch:
javascript
Copiar
Editar
fetch('https://psel-backend.shop/wp-json/acf/v3/posts')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Erro:', error));
📩 Contato e Suporte
Em caso de dúvidas ou suporte, entre em contato com a equipe de desenvolvimento:

Email: renandfochetto@gmail.com
