const express = require("express") // Importação do framework Express, que facilita a criação de servidores HTTP com rotas e middlewares
const cors = require("cors") // Importação o middleware CORS, que permite que o frontend(em outra porta, como localhost:3000) acesse essa api que está na localhost:3001
const fs = require("fs") // Importação do módulo nativo do Node.js para manipulação de arquivos - é ele quem escreve os dados no arquivo JSON que funciona como um Banco de Dados
const path = require("path") // Importação do módulo nativo path para lidar com caminhos de arquivos de forma segura e multiplataforma - também ajuda na manipulação dos dados para o arquivo JSON

const { v4: uuidv4 } = require('uuid') // Importação da função v4 do pacote uuid - Responsável por gerar um ID único aleatório para cada livro, facilitando sua indentificação no Banco de Dados.

const app = express() // Cria uma instância do servidor Express. 
app.use(express.json()) // Middleware que permite à aplicação entender dados enviados em JSON no corpo das requisições (por exemplo, via POST).
app.use(cors()) // Ativa o CORS, permitindo que outras aplicações (como seu frontend em React) possam acessar essa API. Sem isso, o servidor barra o frontend de usar o backend

const filePath = path.join(__dirname, 'database', 'livros.json') // Caminho do arquivo JSON dentro da pasta 'database'

// Função que lê o conteúdo do arquivo livros.json(Banco de Dados), transforma em array e retorna esse array
function readBooksFromFile() {
    try {
        const data = fs.readFileSync(filePath, 'utf8')
        return JSON.parse(data)
    } catch (err) {
        console.error("Erro ao ler o arquivo:", err)
        return []
    }
}

// Função para salvar (escrever) os dados dos livros no arquivo livros.json(Banco de Dados)
function saveBooksToFile(books) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(books, null, 2))
    } catch (err) {
        console.error("Erro ao salvar o arquivo:", err)
    }
}

let books = readBooksFromFile() // Carrega os livros ao iniciar o servidor

// rota GET: retorna todos os livros - envia um array que contém todos os livros em formato de JSON que será consumido no front para exibir os livros
app.get('/livros', (req, res) => {
    res.json(books)
})

// rota POST: usada para adicionar um novo livro - ao cadastrar um livro no formúlario no frontend essa rota será acessada e criará um objeto de livro no banco de dados
app.post('/livros', (req, res) => {
    const { title, author } = req.body

    // Validação: indica que campos são obrigatórios, ou seja, não podem ser vazios. Caso os campos tente ser enviados vazios retorna erro 400
    if (!title || !author) {
        return res.status(400).json({ error: 'Nome e autor são obrigatórios.' })
    }

    // Validação: verifica se já exite um livro semelhante (mesmo nome e autor) no banco de dados para evitar cadastros duplicados
    const alreadyExists = books.some(book =>
        book.title.toLowerCase() === title.toLowerCase() &&
        book.author.toLowerCase() === author.toLowerCase()
    )

    // Caso ja exista um livro semelhante no banco retorna um erro 400 e não deixa que ele seja cadastrado novamente
    if (alreadyExists) {
        return res.status(409).json({ error: 'Livro já cadastrado.' })
    }

    // Cria novo objeto de livro
    const newBook = {
        id: uuidv4(), // Usa o uuidv4 para criar um ID aleatório e único
        title,
        author
    }

    // Adiciona o novo livro ao array e salva no arquivo JSON (Banco de Dados)
    books.push(newBook)
    saveBooksToFile(books)

    return res.status(201).json(newBook) // Caso tudo tenha dado certo retorna o livro criado com statos 201 indicando sucesso
})

// Rota DELETE - usada para remove um livro do Banco de Dados
app.delete('/livros/:id', (req, res) => {
    const { id } = req.params // Extrai o id do livro por meio da URL livros/seuid

    const bookIndex = books.findIndex(book => book.id === id) // Busca p index daquele livro no array

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Livro não encontrado.' }) // caso não encontre o livro retorna erro 404 (Não encontrado)
    }

    // remove o livro do array e salva a nova versão do arquivo
    const removedBook = books.splice(bookIndex, 1)[0] 
    saveBooksToFile(books)

    return res.status(200).json({ message: 'Livro removido com sucesso.', book: removedBook }) // Caso tudo tenha dado certo retorna statos 200 indicando sucesso na remoção do livro
})

// Inicializa o servidor na porta 3001 e imprime um aviso no termina para garantir
app.listen(3001, () => console.log('Servidor rodando na porta 3001'))