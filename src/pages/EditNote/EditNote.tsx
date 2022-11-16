import React from 'react'
import { useTranslation } from 'react-i18next'
import NoteForm from '../../components/NoteForm/NoteForm'
import { useNote } from '../../hooks'
import { NoteData, Tag } from '../../types'

type EditNoteProps = {
	onSubmit: (id: string, editedNote: NoteData) => void
	onAddTag: (tag: Tag) => void
	availableTags: Tag[]
}

export function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
	const { t } = useTranslation()
	const note = useNote()

	return (
		<>
			<h1 className="mb-4">
				{t('edit-note.title', {
					noteTitle: note.title,
				})}
			</h1>

			<NoteForm
				title={note.title}
				markdown={note.markdown}
				tags={note.tags}
				onSubmit={(data) => onSubmit(note.id, data)}
				availableTags={availableTags}
				onAddTag={onAddTag}
			/>
		</>
	)
}
