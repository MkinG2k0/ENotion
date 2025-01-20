import { Content } from 'entities/content'
import { layout } from 'entities/layout'
import { SideBar } from 'entities/layout/ui/SideBar'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Button } from 'shared'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from 'shared/ui/dialog'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'shared/ui/resizable'
import { ChevronRight, Menu } from 'lucide-react'

const defaultSize = Number(localStorage.getItem('sidebarWidth')) || 20

export const Layout: FC = observer(({children}) => {

	const onResize = (size: number) => {
		localStorage.setItem('sidebarWidth', size.toString())
	}

	useEffect(() => {
		layout.setIsMobile(window.innerWidth < 768)

		const onResize = () => {
			layout.setIsMobile(window.innerWidth < 768)
		}

		window.addEventListener('resize', onResize)

		return () => {
			window.removeEventListener('resize', onResize)
		}
	}, [])

	return (
		<div className={'flex flex-auto flex-col h-[100dvh]'}>
			<Header/>
			{
				layout.isMobile || layout.collapsed ?
					<>
						{children}
						<Dialog open={layout.isOpenPages} onOpenChange={(value) => {
							layout.setOpenPages(value)
						}}>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle></DialogTitle>
								</DialogHeader>
								<SideBar/>
							</DialogContent>
						</Dialog>
					</> : <ResizablePanelGroup
						direction="horizontal"
						className="flex-auto flex"
					>
						<ResizablePanel defaultSize={defaultSize} onResize={onResize}>
							<SideBar/>
						</ResizablePanel>
						<ResizableHandle/>
						<ResizablePanel className={'flex-auto flex flex-col'}>
							{children}
						</ResizablePanel>
					</ResizablePanelGroup>
			}
		</div>
	)
})

const Header = observer(() => {
	const currentPage = Content.getCurrentPage()

	const onOpen = () => {
		layout.setOpenPages(true)
	}

	const onCollapse = () => {
		layout.setCollapsed(false)
	}

	return <div className={'border p-3 h-14 row-2 items-center'}>
		{
			layout.collapsed && !layout.isMobile &&
			<Button variant={'secondary'} size={'icon'} onClick={onCollapse}>
				<ChevronRight/>
			</Button>
		}
		{
			layout.isMobile &&
			<Button variant={'secondary'} size={'icon'} onClick={onOpen}>
				<Menu/>
			</Button>
		}
		<div className={'ml-5'}>
			{currentPage?.name}
		</div>
	</div>
})
