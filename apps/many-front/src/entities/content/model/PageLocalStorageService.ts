import type { JSONContent } from 'entities/content'
import { PageService } from 'entities/content/model/PageService'
import { makeAutoObservable } from 'mobx'

// import {} from 'lodash'

export class PageLocalStorageService {

	constructor() {
		makeAutoObservable(this)
	}

	setValue(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value))
	}

	setPage(value: PageService) {
		localStorage.setItem(value.id, JSON.stringify(value))
	}

	getValue(key: string) {
		return JSON.parse(window.localStorage.getItem(key))
	}

	setPagesId(id: string) {
		const ids: string[] = this.getValue('pagesId')
		if (!ids) {
			this.setValue('pagesId', [id])
			return
		}
		this.setValue('pagesId', [...ids, id])
	}

	removePagesId(id: string) {
		const ids: string[] = this.getValue('pagesId')
		this.setValue('pagesId', ids.filter((item: string) => item !== id))
	}

	setPagesHeader(page: PageService) {
		console.log(page, 'a')
		this.setValue(`header-${page.id}`, {...page, content: undefined})
	}

	getPagesHeader() {
		const headers = {}
		const ids: string[] = this.getValue('pagesId')

		if (!ids) return {}

		ids.forEach((id) => {
			const headerPage = this.getValue(`header-${id}`) as { name: string, }
			const page = new PageService(headerPage.name, null)
			page.id = id
			headers[id] = page
		})

		return headers
	}

	addPage(page: PageService) {
		this.setPage(page)
		this.setPagesHeader(page)
		this.setPagesId(page.id)
	}

	removePage(id: string) {
		localStorage.removeItem(`header-${id}`)
		localStorage.removeItem(id)

		this.removePagesId(id)
	}

}


