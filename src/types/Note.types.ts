import { Tag } from './Tag.types'

export type Note = {
	id: string
} & NoteData

export type NoteData = {
	title: string
	markdown: string
	tags: Tag[]
}

export type RawNote = {
	id: string
} & RawNoteData

export type RawNoteData = {
	title: string
	markdown: string
	tagIds: string[]
}

export type SimplifiedNote = {
	id: string
	title: string
	tags: Tag[]
}
