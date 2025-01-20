import { useEffect, useState } from 'react'
import { Separator } from 'shared/ui/separator'

import GenerativeMenuSwitch from './generative/generative-menu-switch'
import { slashCommand, suggestionItems } from './slash-command'
import { ColorSelector } from './selectors/color-selector'
import { LinkSelector } from './selectors/link-selector'
import { NodeSelector } from './selectors/node-selector'
import { MathSelector } from './selectors/math-selector'
import { TextButtons } from './selectors/text-buttons'
import { defaultExtensions } from './extensions'
import { uploadFn } from './image-upload'

import {
	EditorCommand,
	EditorCommandEmpty,
	EditorCommandItem,
	EditorCommandList,
	EditorContent,
	type EditorInstance,
	EditorRoot,
	type JSONContent,
} from 'novel'
import { ImageResizer, handleCommandNavigation } from 'novel/extensions'
import { handleImageDrop, handleImagePaste } from 'novel/plugins'
import { useDebouncedCallback } from 'use-debounce'
import hljs from 'highlight.js'

const extensions = [...defaultExtensions, slashCommand]

interface EditorProps {
	content: JSONContent | null
	onUpdate: (content: JSONContent) => void
}

const Editor = ({content, onUpdate}: EditorProps) => {
	const [saveStatus, setSaveStatus] = useState('Saved')
	const [charsCount, setCharsCount] = useState()

	const [openNode, setOpenNode] = useState(false)
	const [openColor, setOpenColor] = useState(false)
	const [openLink, setOpenLink] = useState(false)
	const [openAI, setOpenAI] = useState(false)

	//Apply Codeblock Highlighting on the HTML from editor.getHTML()
	const highlightCodeblocks = (content: string) => {
		const doc = new DOMParser().parseFromString(content, 'text/html')
		doc.querySelectorAll('pre code').forEach((el) => {
			// @ts-ignore
			// https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
			hljs.highlightElement(el)
		})
		return new XMLSerializer().serializeToString(doc)
	}

	const debouncedUpdates = useDebouncedCallback(async (editor: EditorInstance) => {
		const json = editor.getJSON()
		// setCharsCount(editor.storage.characterCount.words())
		// window.localStorage.setItem('html-content', highlightCodeblocks(editor.getHTML()))
		// window.localStorage.setItem('novel-content', JSON.stringify(json))
		// window.localStorage.setItem('markdown', editor.storage.markdown.getMarkdown())
		setSaveStatus('Saved')
		// console.log(json)
		onUpdate(json)
	}, 500)

	return (
		<div className={'relative flex flex-auto overflow-auto bg-background p-2'}>
			<div className={'flex absolute right-5 top-5 z-10 mb-5 gap-2'}>
				<div className={'rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground'}>
					{saveStatus}
				</div>
				<div
					className={
						charsCount ? 'rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground' : 'hidden'
					}
				>
					{charsCount} Words
				</div>
			</div>
			<div className={'relative flex flex-auto overflow-auto bg-background rounded-lg border'}>
				<EditorRoot>
					<EditorContent
						className={
							'relative flex flex-auto root_content'
						}
						editorProps={{
							attributes: {
								class:
									'prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none w-full',
							},
							handleDOMEvents: {
								keydown: (_view, event) => handleCommandNavigation(event),
							},
							handleDrop: (view, event, _slice, moved) =>
								handleImageDrop(view, event, moved, uploadFn),
							handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
						}}
						extensions={extensions}
						initialContent={content}
						onUpdate={({editor}) => {
							debouncedUpdates(editor)
							setSaveStatus('Unsaved')
						}}
						slotAfter={<ImageResizer/>}
					>
						<EditorCommand
							className={
								'z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all'
							}
						>
							<EditorCommandEmpty className={'px-2 text-muted-foreground'}>
								No results
							</EditorCommandEmpty>
							<EditorCommandList>
								{suggestionItems.map((item) => (
									<EditorCommandItem
										className={
											'flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent'
										}
										key={item.title}
										onCommand={(val) => item.command(val)}
										value={item.title}
									>
										<div
											className={
												'flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background'
											}
										>
											{item.icon}
										</div>
										<div>
											<p className={'font-medium'}>{item.title}</p>
											<p className={'text-xs text-muted-foreground'}>{item.description}</p>
										</div>
									</EditorCommandItem>
								))}
							</EditorCommandList>
						</EditorCommand>

						<GenerativeMenuSwitch onOpenChange={setOpenAI} open={openAI}>
							<Separator orientation={'vertical'}/>
							<NodeSelector onOpenChange={setOpenNode} open={openNode}/>
							<Separator orientation={'vertical'}/>

							<LinkSelector onOpenChange={setOpenLink} open={openLink}/>
							<Separator orientation={'vertical'}/>
							<MathSelector/>
							<Separator orientation={'vertical'}/>
							<TextButtons/>
							<Separator orientation={'vertical'}/>
							<ColorSelector onOpenChange={setOpenColor} open={openColor}/>
						</GenerativeMenuSwitch>
					</EditorContent>
				</EditorRoot>
			</div>
		</div>

	)
}

export default Editor
