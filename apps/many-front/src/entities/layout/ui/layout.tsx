import { SideBar } from 'entities/layout/ui/SideBar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'shared/ui/resizable'

const defaultSize = Number(localStorage.getItem('sidebarWidth')) || 20

export const Layout: FC = ({children}) => {

	const onResize = (size: number) => {
		localStorage.setItem('sidebarWidth', size.toString())
	}

	return (
		<div className={'flex flex-auto flex-col h-[100dvh]'}>
			<ResizablePanelGroup
				direction="horizontal"
				className="flex-auto flex "
			>
				<ResizablePanel defaultSize={defaultSize} onResize={onResize}>
					<SideBar/>
				</ResizablePanel>
				<ResizableHandle/>
				<ResizablePanel className={'flex-auto flex flex-col p-2 '}>
					{children}
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	)
}
