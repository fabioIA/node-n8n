# Random n8n Custom Node

## Descrição

Este projeto contém um conector personalizado para o n8n, chamado **Random**, que permite gerar números aleatórios usando a API do [Random.org](https://www.random.org/).  

O conector possui uma operação principal chamada **True Random Number Generator**, que recebe dois inputs — **Min** e **Max** — e retorna um número aleatório dentro desse intervalo.

O projeto inclui toda a infraestrutura necessária para rodar o n8n localmente usando **Docker Compose** com um banco **PostgreSQL**.

---

## Tecnologias

- Node.js 22 LTS  
- TypeScript  
- n8n (self-hosted)  
- Docker & Docker Compose  
- PostgreSQL  
- API Random.org  

---

## Estrutura do Projeto

n8n-random-node/
  docker-compose.yml
  custom-nodes/
    Random/
      Random.node.ts
      Random.node.js
      package.json
      icon.svg
  README.md
  tsconfig.json


---

## Funcionalidades do Custom Node

### Random Node
**Operação:** True Random Number Generator  

**Inputs:**
- **Min (number):** valor mínimo do intervalo  
- **Max (number):** valor máximo do intervalo  

**Retorna:**
- Número aleatório gerado pela API do Random.org dentro do intervalo informado

**Diferenciais:**
- Nomes amigáveis e legíveis nos parâmetros  
- Ícone SVG personalizado para o Node  
- Código limpo e organizado seguindo as boas práticas do n8n  

---

## Requisitos

- Node.js 22 (LTS)  
- Docker & Docker Compose  
- Conta de usuário com permissão para rodar containers  
- Conexão com internet (para acessar a API do Random.org)  

---

## Instalação

### 1. Instale Node.js 22 (LTS)
[Download Node.js](https://nodejs.org/pt/download)

### 2. Instale Docker
[Instalação Docker](https://docs.n8n.io/hosting/installation/docker)

### 3. Instale n8n globalmente
```bash
npm install n8n -g
```

### 4. Crie um repositório a partir do template

Template https://github.com/new?template_name=n8n-nodes-starter&template_owner=n8n-io

### 5. Clone seu repositório
```bash
git clone https://github.com/seu-usuario/random-n8n-node.git
cd random-n8n-node
```
Exclua as pastas nodes e credentials do template.

### 6. Configure o Docker Compose

Crie o arquivo docker-compose.yml na raiz do projeto e configure o PostgreSQL e o n8n:
```yaml
version: "3.8"

volumes:
  db_storage:
  n8n_storage:

services:
  postgres:
    image: postgres:16
    restart: always
    environment:
      POSTGRES_USER: n8n
      POSTGRES_PASSWORD: n8n
      POSTGRES_DB: n8n
    volumes:
      - db_storage:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -h localhost -U n8n -d n8n"]
      interval: 5s
      timeout: 5s
      retries: 10

  n8n:
    image: n8nio/n8n:1.85.4
    restart: always
    environment:
      N8N_HOST: localhost
      N8N_PORT: 5678
      N8N_PROTOCOL: http
      DB_TYPE: postgresdb
      DB_POSTGRESDB_HOST: postgres
      DB_POSTGRESDB_PORT: 5432
      DB_POSTGRESDB_DATABASE: n8n
      DB_POSTGRESDB_USER: n8nuser
      DB_POSTGRESDB_PASSWORD: n8npass
    ports:
      - "5678:5678"
    volumes:
      - n8n_storage:/home/node/.n8n
      - ./custom-nodes:/home/node/.n8n/custom
    depends_on:
      postgres:
        condition: service_healthy
```

Suba a infraestrutura
```bash
docker-compose up -d
```
### 7. Configure o Custom Node

Crie a pasta do node:
```bash
mkdir -p custom-nodes/Random
cd custom-nodes/Random
```


Inicialize o package.json:
```bash
npm init -y
```

Instale dependências:
```bash
npm install n8n-core n8n-workflow axios
npm install -D @types/node @types/axios typescript
```

Adicione os arquivos:

Random.node.ts
icon.svg

Crie seu node em Random.node.ts

### 8. Compile e link o node
```bash
npx tsc
npm run build
npm link
```

Na raiz do projeto:
```bash
npm link random-n8n-node
```

### 9. Reinicie o container do n8n
```bash
docker restart random-n8n-node_n8n_1
```

### 10. Concluido
Agora, acesse http://localhost:5678
E adicione o node Random
