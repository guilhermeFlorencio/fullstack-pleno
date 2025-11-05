🎯 Desafio: Sistema de Tarefas (Full-Stack)

Esta é uma aplicação full-stack de um "Sistema de Tarefas" (To-Do List) desenvolvida como parte de um desafio técnico. O projeto implementa um CRUD (Criar, Ler, Atualizar, Deletar) completo de tarefas com persistência de dados.

✅ Funcionalidades Implementadas

CRUD Completo: Criação, listagem, atualização (status e conteúdo) e exclusão de tarefas.

Persistência de Dados: O backend utiliza SQLite para armazenar os dados em um arquivo local (backend/database.db).

Validação de API: O backend utiliza Zod para validar os dados recebidos nas rotas (corpo da requisição).

Validação de Formulário: O frontend utiliza React Hook Form e Zod para validação em tempo real dos inputs do usuário.

Interface Responsiva: O frontend utiliza React-Bootstrap para garantir uma experiência de usuário agradável em diferentes tamanhos de tela.

Estrutura Monorepo: O projeto é dividido em duas pastas principais (backend e frontend) para uma clara separação de responsabilidades.

🛠️ Stack Utilizada

Frontend:

Vite

React 18

TypeScript

React-Bootstrap & Bootstrap 5

Axios (para chamadas de API)

React Hook Form & Zod (para validação)

Backend:

Node.js 22

Express

TypeScript

SQLite3 & sqlite

Zod (para validação de API)

ts-node-dev (para desenvolvimento)

🚀 Como Rodar o Projeto (Localmente)

Pré-requisitos:

Node.js (v22 ou superior)

npm (v10 ou superior)

1. Clonar o Repositório:

git clone [https://github.com/guilhermeFlorencio/fullstack-pleno.git](https://github.com/guilhermeFlorencio/fullstack-pleno.git)
cd fullstack-pleno


2. Instalar Dependências (Raiz):

Este projeto utiliza um package.json na raiz que instala as dependências do frontend e do backend automaticamente.

npm install


(Este comando irá rodar npm install nas pastas backend e frontend)

3. Iniciar o Backend:

Abra um terminal e rode:

cd backend
npm run dev


(O servidor backend iniciará em http://localhost:3001 (ou a porta definida no seu .env))

4. Iniciar o Frontend:

Abra um segundo terminal e rode:

cd frontend
npm run dev


(O servidor de desenvolvimento do Vite iniciará em http://localhost:5173)

5. Acessar a Aplicação:

Abra seu navegador e acesse: http://localhost:5173

⚙️ Comandos de Deploy

Para rodar o projeto em um ambiente de produção (conforme solicitado nos "Comandos de Deploy" do desafio):

Comando de Build: (Rode na pasta raiz)

npm run build


(Isso irá compilar o TypeScript do backend para backend/dist e buildar os arquivos estáticos do frontend para frontend/dist)

Comando de Start: (Rode na pasta raiz)

npm run start


(Isso irá iniciar o servidor Node a partir dos arquivos compilados em backend/dist)

📋 Endpoints da API (Backend)

Todos os endpoints estão prefixados com /api.

Método

Rota

Descrição

GET

/health

Verifica se a API está operacional.

GET

/tasks

Retorna uma lista de todas as tarefas.

POST

/tasks

Cria uma nova tarefa.

GET

/tasks/:id

Busca uma tarefa específica por ID.

PUT

/tasks/:id

Atualiza uma tarefa existente por ID.

DELETE

/tasks/:id

Deleta uma tarefa por ID.

Exemplo de body para POST /tasks:

{
"title": "Minha Nova Tarefa",
"description": "Descrição opcional da tarefa"
}
