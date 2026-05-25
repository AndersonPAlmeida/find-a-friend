# Find a Friend API 🐶

API para adoção de pets desenvolvida com Node.js, Fastify, Prisma e PostgreSQL.

## Tecnologias utilizadas

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- Docker
- Zod
- JWT
- Vitest
- Biome

---

# Requisitos

Antes de começar, você precisa ter instalado:

- Node.js 20+
- Docker
- Docker Compose
- npm

---

# Clonando o projeto

git clone <https://github.com/AndersonPAlmeida/find-a-friend.git>

cd find-a-friend

npm install

# Configuração do ambiente

## Crie um arquivo .env na raiz do projeto:

NODE_ENV=dev

PORT=3333

DATABASE_URL="postgresql://docker:docker@localhost:5432/find_a_friend?schema=public"

JWT_SECRET="find-a-friend-secret"

# Subindo o banco com Docker

## Execute:

docker compose up -d
docker ps

# Executando as migrations do Prisma

npx prisma migrate dev
npx prisma generate

# Rodando o projeto em desenvolvimento

npm run dev