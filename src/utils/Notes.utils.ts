import { RawNote, Tag } from '../types'

export function parseNotes(rawNotes: RawNote[], tags: Tag[]) {
	return rawNotes.map((note) => {
		return {
			...note,
			tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
		}
	})
}
