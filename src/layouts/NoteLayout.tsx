import React from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { Note } from '../types'

type NoteLayoutProps = {
	availableNotes: Note[]
}

export function NoteLayout({ availableNotes }: NoteLayoutProps) {
	const { id } = useParams()
	const note = availableNotes.find((note) => note.id === id)

	if (note == null) return <Navigate to="/" replace />

	return <Outlet context={note} />
}
