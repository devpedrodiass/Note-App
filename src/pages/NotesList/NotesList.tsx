import React, { useMemo, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import { Tag, ParsedTags, SimplifiedNote } from '../../types'
import { parseTags, unparseTags } from '../../utils'
import EditTagsModal from './components/EditTagsModal'
import { NoteCard } from './components/NoteCard'

type NotesListProps = {
	availableTags: Tag[]
	availableNotes: SimplifiedNote[]
	onDeleteTag: (id: string) => void
	onUpdateTag: (id: string, label: string) => void
}

export function NotesList({
	availableTags,
	availableNotes,
	onDeleteTag,
	onUpdateTag,
}: NotesListProps) {
	const {
		t,
		i18n: { changeLanguage, language },
	} = useTranslation()
	const [selectedTags, setSelectedTags] = useState<Tag[]>([])
	const [title, setTitle] = useState<string>('')
	const [showEditTagsModal, setShowEditTagsModal] = useState<boolean>(false)

	const filteredNotes = useMemo(() => {
		return availableNotes.filter((note) => {
			return (
				(title === '' ||
					note.title.toLowerCase().includes(title.toLowerCase())) &&
				(selectedTags.length === 0 ||
					selectedTags.every((tag) =>
						note.tags.some((noteTag) => noteTag.id === tag.id)
					))
			)
		})
	}, [title, selectedTags, availableNotes])

	return (
		<>
			<Row className="align-items-center mb-4">
				<Col>
					<h1>{t('home.title')}</h1>
				</Col>
				<Col xs="auto">
					<Stack gap={2} direction="horizontal">
						<Link to="/new">
							<Button variant="primary">{t('common.create')}</Button>
						</Link>
						<Button
							variant="outline-secondary"
							onClick={() => setShowEditTagsModal(true)}
						>
							{t('common.edit-tags')}
						</Button>
						<Button
							variant="outline-primary"
							onClick={() => changeLanguage(language === 'en' ? 'pt' : 'en')}
						>
							{t('common.change-language')}
						</Button>
					</Stack>
				</Col>
			</Row>
			<Form>
				<Row className="mb-4">
					{/* TITLE FILTER */}
					<Col>
						<Form.Group controlId="title">
							<Form.Label>{t('common.title')}</Form.Label>
							<Form.Control
								placeholder={t('common.general-placeholder') as string}
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>
					</Col>

					{/* TAG FILTER */}
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>{t('common.tags')}</Form.Label>
							<ReactSelect
								options={parseTags(availableTags)}
								onChange={(newTags) =>
									setSelectedTags(unparseTags(newTags as ParsedTags[]))
								}
								placeholder={t('common.select') as string}
								value={parseTags(selectedTags)}
								isMulti
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>
			<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
				{filteredNotes.map((note) => (
					<Col key={note.id}>
						<NoteCard id={note.id} title={note.title} tags={note.tags} />
					</Col>
				))}
			</Row>
			<EditTagsModal
				onDeleteTag={onDeleteTag}
				onUpdateTag={onUpdateTag}
				availableTags={availableTags}
				show={showEditTagsModal}
				handleClose={() => {
					setShowEditTagsModal(false)
				}}
			/>
		</>
	)
}
