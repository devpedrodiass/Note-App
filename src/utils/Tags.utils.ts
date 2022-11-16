import { ParsedTags, Tag } from '../types'

export function parseTags(tags: Tag[]) {
	const parsedTags = tags.map((tag) => {
		return {
			label: tag.label,
			value: tag.id,
		}
	})
	return parsedTags
}

export function unparseTags(tags: ParsedTags[]) {
	const unparsedTags = tags.map((tag) => {
		return {
			label: tag.label,
			id: tag.value,
		}
	})
	return unparsedTags
}
