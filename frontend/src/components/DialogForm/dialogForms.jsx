import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import "./styles.css";
import { PlusIcon } from "lucide-react";

export default function DialogForms({ onAdd }) {
	// Componente recebe como prop a função onAdd, vinda do App.

	// Estados locais para armazenar os valores do formulário
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");

	const [open, setOpen] = useState(false); // Controla abertura do modal

	// Função que indica que ao enviar o formulário (Clicar em CADASTRAR) chama o onAdd (função que adiciona o livro) e limpa os valores dos campos
	function handleSubmit(event) {
		event.preventDefault();

		onAdd(event, title, author); // envia os valores de título e autor do livro

		// Limpa os campos
		setTitle("");
		setAuthor("");
		
		setOpen(false); // Fecha o modal manualmente
	}

	return (

		// Estrutura do modal
		<Dialog.Root open={open} onOpenChange={setOpen}>

			{/* Botão de ADICIONAR LIVRO que chama o modal */}
			<Dialog.Trigger asChild>
				<button className="btn-add-book">Adicionar livro <span><PlusIcon size={15} /></span></button> 
			</Dialog.Trigger>

			{/* Corpo do modal */}
			<Dialog.Portal>
				<Dialog.Overlay className="DialogOverlay" />
				<Dialog.Content className="DialogContent">
					<Dialog.Title className="DialogTitle">Adicionar Novo Livro</Dialog.Title>
					<Dialog.Description className="DialogDescription">
						Adicione as informações para cadastrar um novo livro.
					</Dialog.Description>

					{/* Campos controlados do formulário que recebem os valeres de título e autor */}
					<form onSubmit={handleSubmit}>
						<fieldset className="Fieldset">
							<label className="Label" htmlFor="name">
								Nome
							</label>
							<input
								className="Input"
								id="name"
								placeholder="Nome do livro"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
						</fieldset>
						<fieldset className="Fieldset">
							<label className="Label" htmlFor="author">
								Autor
							</label>
							<input
								className="Input"
								id="author"
								placeholder="Nome do autor"
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
								required
							/>
						</fieldset>
						<div
							style={{ display: "flex", marginTop: 25, justifyContent: "flex-end", gap: 25 }}
						>
							{/* Botão de enviar formulário */}
							<button className="Button green" type="submit">
								Cadastrar
							</button>							
						</div>
					</form>

					{/* Botão de fechar o modal */}
					<Dialog.Close asChild>
						<button className="IconButton" aria-label="Fechar">
							<Cross2Icon />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
