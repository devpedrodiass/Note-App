import React from 'react'
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useNote } from '../../hooks'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'

type NoteProps = {
	onDeleteNote: (id: string) => void
}

export function Note({ onDeleteNote }: NoteProps) {
	const { t } = useTranslation()
	const note = useNote()
	const { id, markdown, tags, title } = note

	const navigate = useNavigate()

	return (
		<>
			<Row className="align-items-center mb-4">
				<Col>
					<h1>{title}</h1>
					{tags.length > 0 && (
						<Stack gap={1} direction={'horizontal'} className="flex-wrap">
							{tags.map((tag) => (
								<Badge className="text-truncate" key={tag.id}>
									#{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Col>
				<Col xs="auto">
					<Stack gap={2} direction="horizontal">
						<Link to={`/${id}/edit`}>
							<Button variant="primary">{t('common.edit')}</Button>
						</Link>
						<Button
							variant="outline-danger"
							onClick={() => {
								onDeleteNote(id)
								navigate('/')
							}}
						>
							{t('common.delete')}
						</Button>
						<Link to="..">
							<Button variant="outline-secondary">{t('common.back')}</Button>
						</Link>
					</Stack>
				</Col>
			</Row>
			<ReactMarkdown>{markdown}</ReactMarkdown>
		</>
	)
}
