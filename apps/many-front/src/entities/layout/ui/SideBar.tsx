import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { Content } from 'entities/content'
import { ContentService } from 'entities/content/model'
import { PageService } from 'entities/content/model/PageService'
import { layout } from 'entities/layout'
import { observer } from 'mobx-react-lite'
import { type KeyboardEventHandler, useState } from 'react'
import { Button, buttonVariants } from 'shared'
import { Plus, Menu, Check, Pen, Trash, ChevronLeft, ChevronRight } from 'lucide-react'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'shared/ui/dropdown-menu'
import { Input } from 'shared/ui/input'

export const SideBar = observer(({isSideBar}: { isSideBar?: boolean }) => {
	const onAddPage = () => {
		const newPage = Content.addPage(`New page ${new Date().toISOString().slice(0, 10)}`)
		Content.setCurrentPage(newPage)
	}

	const collapse = () => {
		layout.setCollapsed(!layout.collapsed)
	}

	return <div className={'flex p-3 flex-col gap-2'}>
		<div className={'flex gap-2 items-center justify-between'}>
			<div>Pages</div>
			<div className={'row-2'}>
				{
					isSideBar &&
					<Button variant={'secondary'} size={'icon'} onClick={collapse}>
						{
							layout.collapsed ? <ChevronRight size={20}/> : <ChevronLeft size={20}/>
						}
					</Button>
				}

				<Button variant={'secondary'} size={'icon'} onClick={onAddPage}>
					<Plus size={20}/>
				</Button>
			</div>
		</div>
		<div className={'flex flex-col gap-2 overflow-auto'}>
			{
				Content.getHeaderPages().map((page) => <PageRow page={page} key={page.id} Content={Content}/>)
			}
		</div>
	</div>
})

const PageRow = observer(({page, Content}: { page: PageService, Content: ContentService }) => {
	const [isRename, setIsRename] = useState(false)
	const [name, setName] = useState(page.name)

	const onSaveName = () => {
		setIsRename(false)
		Content.updatePageName(page, name)
	}

	const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') {
			onSaveName()
		}
	}

	if (isRename) {
		return <div className={'row gap-2 items-center justify-between'}>
			<Input
				autoFocus
				className={'flex-auto '}
				defaultValue={page.name}
				onChange={(e) => setName(e.target.value)}
				onKeyDown={onKeyDown}
			/>
			<Button variant={'secondary'} className={'shrink-0'} size={'icon-md'} onClick={onSaveName}>
				<Check size={20}/>
			</Button>
		</div>
	}

	return <div
		className={`flex gap-2 justify-between cursor-pointer  ${buttonVariants({variant: 'ghost'})} `}
		onClick={() => {
			Content.setCurrentPage(page)
		}}
	>
		<div

			className={'select-none overflow-hidden text-ellipsis whitespace-nowrap'}
		>
			{page.name}
		</div>
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className={'shrink-0'} variant="ghost" size={'icon'}><Menu/></Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuItem
					onClick={() => {
						setIsRename(true)
					}}
					className={'flex gap-3 items-center'}
				>
					<Pen size={15}/>
					<div>Rename</div>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={(e) => {
						e.stopPropagation()
						Content.removePage(page.id)
					}}
					className={'flex gap-3 items-center focus:text-red-400'}
				>
					<Trash size={15}/>
					Remove
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
})
