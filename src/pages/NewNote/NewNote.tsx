import React from 'react'
import { useTranslation } from 'react-i18next'
import NoteForm from '../../components/NoteForm/NoteForm'
import { NoteData, Tag } from '../../types'

type NewNoteProps = {
	onSubmit: (newNote: NoteData) => void
	onAddTag: (tag: Tag) => void
	availableTags: Tag[]
}

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
	const { t } = useTranslation()
	return (
		<>
			<h1 className="mb-4">{t('new-note.title')}</h1>

			<NoteForm
				onSubmit={onSubmit}
				availableTags={availableTags}
				onAddTag={onAddTag}
			/>
		</>
	)
}
