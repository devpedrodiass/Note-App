import React, { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import CreatableReactSelect from 'react-select/creatable'
import { NoteData, ParsedTags, Tag } from '../../types'
import { generateRandomId, parseTags, unparseTags } from '../../utils'

type NoteFormProps = {
	onSubmit: (data: NoteData) => void
	onAddTag: (tag: Tag) => void
	availableTags: Tag[]
} & Partial<NoteData>

export default function NoteForm({
	onSubmit,
	onAddTag,
	availableTags,
	markdown = '',
	tags = [],
	title = '',
}: NoteFormProps) {
	const { t } = useTranslation()

	const titleRef = useRef<HTMLInputElement>(null)
	const markdownRef = useRef<HTMLTextAreaElement>(null)

	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags ?? [])

	const navigate = useNavigate()

	function handleSubmit(e: FormEvent) {
		e.preventDefault()

		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: selectedTags,
		})

		navigate('..')
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					{/* TITLE */}
					<Col>
						<Form.Group controlId="title">
							<Form.Label>{t('common.title')}</Form.Label>
							<Form.Control
								placeholder={t('common.general-placeholder') as string}
								defaultValue={title}
								ref={titleRef}
								required
							/>
						</Form.Group>
					</Col>

					{/* TAGS */}
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>{t('common.tags')}</Form.Label>
							<CreatableReactSelect
								onCreateOption={(label: string) => {
									const newTag = {
										id: generateRandomId(),
										label,
									}
									onAddTag(newTag)
									setSelectedTags((prev) => [...prev, newTag])
								}}
								placeholder={t('common.select') as string}
								options={parseTags(availableTags)}
								onChange={(newTags) =>
									setSelectedTags(unparseTags(newTags as ParsedTags[]))
								}
								value={parseTags(selectedTags)}
								isMulti
							/>
						</Form.Group>
					</Col>
				</Row>

				{/* MARKDOWN */}
				<Form.Group controlId="markdown">
					<Form.Label>{t('common.body')}</Form.Label>
					<Form.Control
						placeholder={t('common.general-placeholder') as string}
						defaultValue={markdown}
						ref={markdownRef}
						required
						as="textarea"
						rows={15}
					/>
				</Form.Group>

				{/* SUBMIT / CANCEL */}
				<Stack direction="horizontal" gap={2} className="justify-content-end">
					<Button type="submit" variant="primary">
						{t('common.save')}
					</Button>
					<Link to="..">
						<Button type="button" variant="outline-secondary">
							{t('common.cancel')}
						</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	)
}
