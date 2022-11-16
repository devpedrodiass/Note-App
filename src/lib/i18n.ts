import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: {
				'home.title': 'Your Notes App',
				'common.change-language': 'Change Language',
				'common.title': 'Title',
				'common.edit': 'Edit',
				'common.select': 'Select',
				'common.tags': 'Tags',
				'common.create': 'Create',
				'common.body': 'Body of your Note',
				'common.edit-tags': 'Edit Tags',
				'common.cancel': 'Cancel',
				'common.save': 'Save',
				'common.back': 'Back',
				'common.delete': 'Delete',
				'common.general-placeholder': 'Type Here',
				'new-note.title': 'New Note',
				'edit-note.title': 'Edit Note: {{noteTitle}}',
				'common.no-tags': 'No Tags',
			},
		},
		pt: {
			translation: {
				'home.title': 'Seu Aplicativo de Notas',
				'common.change-language': 'Trocar Lingua',
				'common.title': 'Titulo',
				'common.edit': 'Editar',
				'common.select': 'Selecionar',
				'common.tags': 'Tags',
				'common.create': 'Criar',
				'common.body': 'Corpo da sua Nota',
				'common.edit-tags': 'Editar Tags',
				'common.cancel': 'Cancelar',
				'common.save': 'Salvar',
				'common.back': 'Voltar',
				'common.delete': 'Deletar',
				'common.general-placeholder': 'Escreva aqui',
				'new-note.title': 'Nova Nota',
				'edit-note.title': 'Editar Nota: {{noteTitle}}',
				'common.no-tags': 'Sem Tags',
			},
		},
	},
	lng: 'pt',
})
