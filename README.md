# 📢 Denúncias Backend

Este é o backend de um sistema de denúncias, desenvolvido com [NestJS](https://nestjs.com/), utilizando banco de dados PostgreSQL via Docker e `pnpm` como gerenciador de pacotes. O projeto segue uma arquitetura em camadas e conta com documentação interativa via Swagger.

---

## 🚀 Tecnologias Utilizadas

- ✅ **Node.js** + **NestJS**
- 🐘 **PostgreSQL** com Docker
- 🐳 **Docker** + **Docker Compose**
- 📚 **Swagger** para documentação da API
- 🧪 **Vitest** para testes unitários
- 🔐 **Zod** para validação de dados
- 🧱 **Arquitetura em camadas** (`@core`, `modules`, etc.)
- ⚙️ **pnpm** como gerenciador de pacotes

---

## 📦 Instalação

### 1. Clone o projeto

```bash
git clone https://github.com/Matheus-Imberio/denuncias-backend.git
cd denuncias-backend
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure o ambiente

```bash
cp .env.example .env
```

Preencha o `.env` conforme suas configurações. Um exemplo:

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/denuncias
PORT=3000
```

### 4. Suba o banco de dados

```bash
docker-compose up -d
```

---

## ⚙️ Rodando a Aplicação

Execute o projeto em modo desenvolvimento:

```bash
pnpm start:dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

# ✅ Como Enviar o Corpo para o Endpoint de Update/Create de Denúncia

Para que a requisição funcione corretamente na API, envie um JSON no seguinte formato (tanto para criação quanto para atualização de denúncia):

### 📦 Exemplo de Corpo (JSON)

```json
{
  "titulo": "Teste",
  "descricao": "ola",
  "latitude": -23.556857,
  "longitude": -46.660065,
  "denunciante": {
    "id": "018f52a0-e264-7e28-b43c-a3b77b5b0e67"
  },
  "endereco": {}
}
```

---

✅ O campo `denunciante.id` **deve existir previamente** no banco de dados. Para isso, siga o passo abaixo:

---

### 🛠️ Criando um Denunciante com Prisma Studio

1. Rode o Prisma Studio:

```bash
pnpm prisma studio
```

2. No navegador, clique na tabela **Denunciante**.

3. Crie um novo denunciante com os seguintes campos:

- **id**: Deixe em branco (será gerado automaticamente, copie o valor gerado depois).
- **nome** (se existir): Preencha.
- **cpf** (se existir): Preencha corretamente com um CPF válido.

4. Copie o `id` gerado e use no corpo da denúncia como:

```json
"denunciante": {
  "id": "COLE_O_ID_AQUI"
}
```

---

⚠️ Sem um denunciante válido com `id` existente, a denúncia será rejeitada com erro `400 - Dados inválidos`.

---


## 📄 Documentação da API (Swagger)

Acesse a documentação interativa da API após iniciar o servidor:

```
http://localhost:3000/api-docs
```

---

## 🧪 Executando os Testes

```bash
pnpm test
```

---

## 📂 Estrutura do Projeto (resumo)

```
src/
├── @core/                # Domínio (Entidades, UseCases, Errors, etc.)
├── denuncias/            # Módulo de denúncias
│   ├── controllers/
│   ├── usecases/
│   ├── dto/
│   └── ...
├── shared/               # Utils, validadores e helpers
.env
docker-compose.yml
```

---

## 📬 Contato

Feito com 💻 por [Matheus Henrique Imberio](https://www.linkedin.com/in/matheusimberio)

---

⭐ Se curtir o projeto, deixe uma estrela no repositório!
