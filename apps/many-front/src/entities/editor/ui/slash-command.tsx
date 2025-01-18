import { uploadFn } from './image-upload'

import {
	CheckSquare,
	Code,
	Heading1,
	Heading2,
	Heading3,
	ImageIcon,
	List,
	ListOrdered,
	MessageSquarePlus,
	Text,
	TextQuote,
	Twitter,
	Youtube,
} from 'lucide-react'
import { createSuggestionItems } from 'novel/extensions'
import { Command, renderItems } from 'novel/extensions'

export const suggestionItems = createSuggestionItems([
	{
		command: ({editor, range}) => {
			editor.chain().focus().deleteRange(range).run()
			window.open('/feedback', '_blank')
		},
		description: 'Let us know how we can improve.',
		icon: <MessageSquarePlus size={18}/>,
		title: 'Send Feedback',
	},
	{
		command: ({editor, range}) => {
			editor.chain().focus().deleteRange(range).toggleNode('paragraph', 'paragraph').run()
		},
		description: 'Just start typing with plain text.',
		icon: <Text size={18}/>,
		searchTerms: ['p', 'paragraph'],
		title: 'Text',
	},
	{
		command: ({editor, range}) => {
			editor.chain().focus().deleteRange(range).toggleTaskList().run()
		},
		description: 'Track tasks with a to-do list.',
		icon: <CheckSquare size={18}/>,
		searchTerms: ['todo', 'task', 'list', 'check', 'checkbox'],
		title: 'To-do List',
	},
	{
		command: ({editor, range}) => {
			editor.chain().focus().deleteRange(range).setNode('heading', {level: 1}).run()
		},
		description: 'Big section heading.',
		icon: <Heading1 size={18}/>,
		searchTerms: ['title', 'big', 'large'],
		title: 'Heading 1',
	},
	{
		command: ({editor, range}) => {
			editor.chain().focus().deleteRange(range).setNode('heading', {level: 2}).run()
		},
		description: 'Medium section heading.',
		icon: <Heading2 size={18}/>,
		searchTerms: ['subtitle', 'medium'],
		title: 'Heading 2',
	},
	{
		command: ({editor, range}) => {
			editor.chain().focus().deleteRange(range).setNode('heading', {level: 3}).run()
		},
		description: 'Small section heading.',
		icon: <Heading3 size={18}/>,
		searchTerms: ['subtitle', 'small'],
		title: 'Heading 3',
	},
	{
		command: ({editor, range}) => {
			editor.chain().focus().deleteRange(range).toggleBulletList().run()
		},
		description: 'Create a simple bullet list.',
		icon: <List size={18}/>,
		searchTerms: ['unordered', 'point'],
		title: 'Bullet List',
	},
	{
		command: ({editor, range}) => {
			editor.chain().focus().deleteRange(range).toggleOrderedList().run()
		},
		description: 'Create a list with numbering.',
		icon: <ListOrdered size={18}/>,
		searchTerms: ['ordered'],
		title: 'Numbered List',
	},
	{
		command: ({editor, range}) =>
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.toggleNode('paragraph', 'paragraph')
				.toggleBlockquote()
				.run(),
		description: 'Capture a quote.',
		icon: <TextQuote size={18}/>,
		searchTerms: ['blockquote'],
		title: 'Quote',
	},
	{
		command: ({editor, range}) =>
			editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
		description: 'Capture a code snippet.',
		icon: <Code size={18}/>,
		searchTerms: ['codeblock'],
		title: 'Code',
	},
	{
		command: ({editor, range}) => {
			editor.chain().focus().deleteRange(range).run()
			// upload image
			const input = document.createElement('input')
			input.type = 'file'
			input.accept = 'image/*'
			input.onchange = async () => {
				if (input.files?.length) {
					const file = input.files[0]
					const pos = editor.view.state.selection.from
					uploadFn(file, editor.view, pos)
				}
			}
			input.click()
		},
		description: 'Upload an image from your computer.',
		icon: <ImageIcon size={18}/>,
		searchTerms: ['photo', 'picture', 'media'],
		title: 'Image',
	},
	{
		command: ({editor, range}) => {
			const videoLink = prompt('Please enter Youtube Video Link')
			//From https://regexr.com/3dj5t
			const ytregex = new RegExp(
				/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
			)

			if (ytregex.test(videoLink)) {
				editor
					.chain()
					.focus()
					.deleteRange(range)
					.setYoutubeVideo({
						src: videoLink,
					})
					.run()
			} else {
				if (videoLink !== null) {
					alert('Please enter a correct Youtube Video Link')
				}
			}
		},
		description: 'Embed a Youtube video.',
		icon: <Youtube size={18}/>,
		searchTerms: ['video', 'youtube', 'embed'],
		title: 'Youtube',
	},
	{
		command: ({editor, range}) => {
			const tweetLink = prompt('Please enter Twitter Link')
			const tweetRegex = new RegExp(
				/^https?:\/\/(www\.)?x\.com\/([a-zA-Z0-9_]{1,15})(\/status\/(\d+))?(\/\S*)?$/,
			)

			if (tweetRegex.test(tweetLink)) {
				editor
					.chain()
					.focus()
					.deleteRange(range)
					.setTweet({
						src: tweetLink,
					})
					.run()
			} else {
				if (tweetLink !== null) {
					alert('Please enter a correct Twitter Link')
				}
			}
		},
		description: 'Embed a Tweet.',
		icon: <Twitter size={18}/>,
		searchTerms: ['twitter', 'embed'],
		title: 'Twitter',
	},
])

export const slashCommand = Command.configure({
	suggestion: {
		items: () => suggestionItems,
		render: renderItems,
	},
})
