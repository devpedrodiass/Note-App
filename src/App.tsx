import 'bootstrap/dist/css/bootstrap.min.css'
import { useMemo } from 'react'
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useLocalStorage } from './hooks'
import { NoteLayout } from './layouts'
import { EditNote, NewNote, Note, NotesList } from './pages'
import { NoteData, RawNote, Tag } from './types'
import { generateRandomId, parseNotes } from './utils'

function App() {
	const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
	const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

	const notesWithTags = useMemo(() => {
		return parseNotes(notes, tags)
	}, [notes, tags])

	function onCreateNote({ tags, ...data }: NoteData) {
		setNotes((prevNotes) => [
			...prevNotes,
			{ ...data, id: generateRandomId(), tagIds: tags.map((tag) => tag.id) },
		])
	}

	function onUpdateNote(id: string, { tags, ...data }: NoteData) {
		setNotes((prevNotes) => {
			return prevNotes.map((note) => {
				if (note.id === id) {
					return { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
				} else {
					return note
				}
			})
		})
	}

	function onDeleteNote(id: string) {
		setNotes((prevNotes) => {
			return prevNotes.filter((note) => note.id !== id)
		})
	}

	function addTag(tag: Tag) {
		setTags((prev) => [...prev, tag])
	}

	function updateTags(id: string, label: string) {
		setTags((prev) => {
			return prev.map((tag) => {
				if (tag.id === id) {
					return { ...tag, label }
				} else {
					return tag
				}
			})
		})
	}

	function deleteTag(id: string) {
		setTags((prev) => {
			return prev.filter((tag) => tag.id !== id)
		})
	}

	return (
		<Container className="my-4">
			<Routes>
				<Route
					path="/"
					element={
						<NotesList
							onUpdateTag={updateTags}
							onDeleteTag={deleteTag}
							availableTags={tags}
							availableNotes={notesWithTags}
						/>
					}
				/>
				<Route
					path="/new"
					element={
						<NewNote
							onSubmit={onCreateNote}
							onAddTag={addTag}
							availableTags={tags}
						/>
					}
				/>
				<Route
					path="/:id"
					element={<NoteLayout availableNotes={notesWithTags}></NoteLayout>}
				>
					<Route index element={<Note onDeleteNote={onDeleteNote} />} />
					<Route
						path="edit"
						element={
							<EditNote
								onSubmit={onUpdateNote}
								onAddTag={addTag}
								availableTags={tags}
							/>
						}
					/>
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Container>
	)
}

export default App
