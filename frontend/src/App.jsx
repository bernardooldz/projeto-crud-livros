import { useState, useEffect } from 'react' // Importação de hooks do React que serão utilizadas
import './App.css' // Importação do estilo css dessa página
import axios from 'axios' // Importação da biblioteca Axios, usada para fazer requisições HTTP à API
import DialogForms from './components/DialogForm/dialogForms' // Importação do componente do modal de formulário
import { Trash } from 'lucide-react' // Importação do icone de lixeira do botão de deletar vindo da biblioteca de ícones Lucide
import * as Toast from '@radix-ui/react-toast' // Importação do componente de Toast do Radix UI

// cria uma instancia conectando esta aplicação (frontend) com a api(server backened)
const api = axios.create({
  baseURL: 'http://localhost:3001'
})

function App() {

  const [books, setBooks] = useState([]) // Guarda a lista de livros retornada pela API.

  // Controlam o estado do Toast (mensagem, descrição, visibilidade e status como sucesso ou erro).
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastDescMessage, setToastDescMessage] = useState('')
  const [toastStatus, setToastStatus] = useState('')

  // Busca os livros da API (rota GET /livros) e salva no estado books
  useEffect(() => {
    api.get('/livros').then((response) => {
      setBooks(response.data) // armazena no array os dados recebidos da api
    })
  }, [])

  // Função usada para adicionar um novo livro
  function addNewBook(event, title, author) {
    event.preventDefault() // evita que o formulário recarregue a página

    // Envia os dados para o servidor backend (rota POST /livros).
    api.post('/livros', {
      title,
      author,
    }).then((response) => {
      setBooks([...books, response.data]) // atualiza o estado adicionando o novo livro à lista

      // Define as informações do toast com mensagem possitiva indicando sucesso ao adicionar o livro
      setToastMessage('Sucesso!')
      setToastDescMessage("Livro cadastrado com sucesso!")
      setToastOpen(true)
      setToastStatus('Good')
    }).catch((err) => {
      // Caso haja algum erro ao adicionar um livro aciona um toast indicando erro
      console.error("Errro ao tentar cadastrar livro:", err)
      setToastMessage('Erro!')
      setToastDescMessage("Algo deu errado... Tente novamente.")
      setToastOpen(true)
      setToastStatus('Bad')
    })
  }

  // Função usada para deletar um livro
  function deleteBook(id) {
    api.delete(`/livros/${id}`) // Envia uma requisição para deletar o livro
      .then(() => {
        setBooks(books.filter(book => book.id !== id)) // Remove o livro da lista atual do estado

        // Define as informações do toast com mensagem possitiva indicando sucesso ao deletar o livro
        setToastMessage('Deletado!')
        setToastDescMessage("Livro removido com sucesso.")
        setToastOpen(true)
        setToastStatus('Deleted')
      })
      .catch((err) => {
        // Caso haja algum erro ao adicionar um livro aciona um toast indicando erro
        console.error("Erro ao deletar livro:", err)
        setToastMessage('Erro!')
        setToastDescMessage("Algo deu errado... Tente novamente.")
        setToastOpen(true)
        setToastStatus('Bad')
      })
  }

  return (
    <div className='container-main'>

      {/* Cabeçalho da página */}
      <header>
        <h1 className="logo">Livros</h1>
      </header>

      {/* Corpo da página */}
      <main className='container-book-list'>
        <h2>Lista de Livros</h2>

        {/* Componente de botão que exibe o formulário de cadastrar um livro. Nele também é enviado uma prop da funcão de adicionar livro */}
        <DialogForms onAdd={addNewBook} />

        {/* Lista com os livros recebidos da api */}
        <ul>
          {books.map((book) => (
            // Metodo map que percorre todo o array criando um card para cada item que exite
            <div key={book.id} className='card-book'>
              <div className="container-book-infos">
                {/* Exibe título e autor do livro. */}
                <li className='book-name'>{book.title}</li>
                <li className='book-author'><strong>Author:</strong> {book.author}</li>
              </div>

              {/* Botão de deletar livro que usa o id do livro para ser utilizado ao clicar chamando a função deleteBook */}
              <div className="container-card-book-buttons">
                <button className="btn-card-book" onClick={() => deleteBook(book.id)}><Trash size={18} /></button>
              </div>
            </div>
          ))}
        </ul>
      </main>

      {/* Componente de Toast - Exibe o título e descrição indicados e se personaliza a partir das informações e contexto de onde é chamado */}
      <Toast.Provider swipeDirection="right">
        <Toast.Root open={toastOpen} onOpenChange={setToastOpen} className={`ToastRoot ${toastStatus === 'Good' ? "good" : "bad"}`}>
          <Toast.Title className="ToastTitle">{toastMessage}</Toast.Title>
          <Toast.Description className="ToastDescription">{!toastDescMessage ? "" : toastDescMessage}</Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    </div>
  )
}

export default App
