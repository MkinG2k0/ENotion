import { Content } from 'entities/content'
import Editor from 'entities/editor/ui/advanced-editor'
import { observer } from 'mobx-react-lite'

const Main = observer(() => {
	const currentPage = Content.getCurrentPage()

	if (currentPage === null) {
		return <div>Choose page</div>
	}

	return (
		<Editor
			key={currentPage.id}
			onUpdate={(content) => {
				Content.updateContentCurrentPage(content)
			}}
			content={currentPage.content}
		/>
	)
})

export default Main

