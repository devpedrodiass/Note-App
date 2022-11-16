import React from 'react'
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Tag } from '../../../types'

import { X } from 'phosphor-react'

type EditTagsModalProps = {
	availableTags: Tag[]
	show: boolean
	handleClose: () => void
	onDeleteTag: (id: string) => void
	onUpdateTag: (id: string, label: string) => void
}

export default function EditTagsModal({
	availableTags,
	show,
	handleClose,
	onDeleteTag,
	onUpdateTag,
}: EditTagsModalProps) {
	const { t } = useTranslation()
	return (
		<Modal animation={true} show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{t('common.edit-tags')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Stack gap={2}>
						{availableTags.length > 0 &&
							availableTags.map((tag) => (
								<Row key={tag.id}>
									<Col>
										<Form.Control
											onChange={(e) => onUpdateTag(tag.id, e.target.value)}
											type="text"
											value={tag.label}
										/>
									</Col>
									<Col xs="auto">
										<Button
											onClick={() => onDeleteTag(tag.id)}
											variant="outline-danger"
											className="align-items-center justify-content-center"
										>
											<X weight="bold" />
										</Button>
									</Col>
								</Row>
							))}
					</Stack>
				</Form>
				{availableTags.length === 0 && (
					<p className="text-center">{t('common.no-tags')}</p>
				)}
			</Modal.Body>
		</Modal>
	)
}
