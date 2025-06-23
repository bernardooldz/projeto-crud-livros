# Sistema CRUD de Livros

## Descrição
Este projeto é uma aplicação web completa para cadastro e listagem de livros. Possui frontend em React + Radix UI e backend em Node.js com Express, persistindo dados em arquivo `JSON` que funciona como um banco de dados.

## Tecnologias Utilizadas

### Back-end
- **Node.js + Express** – Leve, rápido e com excelente suporte para APIs REST.  
- **UUID** – Geração segura e única de IDs.  
- **File System (fs)** – Manipulação direta de arquivos JSON, facilitando a persistência sem precisar configurar bancos externos.  

### Front-end
- **React com Vite** – Setup rápido e eficiente para desenvolvimento em React.  
- **Radix UI** – Componentes acessíveis e com comportamento consistente (Modal e Toasts).  
- **Axios** – Cliente HTTP para consumo da API de forma simples e moderna.  

> As tecnologias foram escolhidas com foco em **simplicidade, clareza e velocidade de desenvolvimento**

---

## Funcionalidades

- ✅ Cadastro de novos livros  
- ✅ Listagem de todos os livros  
- ✅ Exclusão de livros existentes  
- ✅ Validação de dados (não permite duplicatas ou campos vazios)  
- ✅ Mensagens de feedback com toasts  
- ✅ Modal com formulário interativo  
- ✅ Persistência de dados em arquivo `.json`  
- ✅ Interface moderna com feedback visual  

---

## Como executar o projeto
Certifique-se de que tenha os requisitos listados e rode os comando indicados abaixo no terminal:

### Requisitos
- Node.js (>=16)
- npm ou yarn

### Clone o repositório
```bash
git clone https://github.com/bernardooldz/projeto-crud-livros.git
cd projeto-crud-livros
```

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Após esses passos acesse [Biblioteca](http://localhost:5173) para ver a aplicação funcionando.

---

## Endpoints da API

### Base URL
[LocalHost 3001](http://localhost:3001)

### `GET /livros`
Retorna todos os livros cadastrados.

**Exemplo de resposta:**
```json
[
  {
    "id": "123-uuid",
    "title": "Dom Casmurro",
    "author": "Machado de Assis"
  }
]
```

### `Post /livros`
Cadastra um novo livro.

**Exemplo de resposta:**
```json
{
  "title": "Livro Teste",
  "author": "Autor Teste"
}
```

### `DELETE /livros:id`
Remove um livro com base em seu id.

**Exemplo de resposta:**
```json
{
  "message": "Livro removido com sucesso.",
  "book": {
    "id": "uuid",
    "title": "Livro Removido",
    "author": "Autor"
  }
}
```

---

## Testes via cURL

### Cadastrar livro
```bash
curl -X POST http://localhost:3001/livros \
 -H "Content-Type: application/json" \
 -d '{"title":"Meu Livro","author":"Eu"}'
```

### Listar livros:
```bash
curl http://localhost:3001/livros
```

### Deletar livro:
```bash
curl -X DELETE http://localhost:3001/livros/<id>
```

---

## Considerações Finais

Este projeto foi desenvolvido com o objetivo de demonstrar domínio em:

- Integração front-end + back-end
- Manipulação de dados persistentes sem banco de dados complexo
- Uso de bibliotecas modernas de UI
- Boas práticas de estruturação e validação de código

---

## Autor

Feito por [Bernardo Diniz](https://github.com/bernardooldz)
