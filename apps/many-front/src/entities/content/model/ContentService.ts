import type { JSONContent } from 'entities/content'
import { PageLocalStorage } from '../config/pageLocalStorage'
import { PageService } from './PageService'
import { makeAutoObservable } from 'mobx'

export class ContentService {
	pages: Record<string, PageService> = {}
	headerPages: Record<string, PageService> = {}
	currentPage: PageService | null = null

	constructor() {
		makeAutoObservable(this)

		this.init()
	}

	init() {
		this.headerPages = PageLocalStorage.getPagesHeader()
		// const valuePage = Object.values(this.pages)
		// if (valuePage.length) {
		// 	this.currentPage = valuePage[0]
		// }
	}

	getPages() {
		return Object.values(this.pages)
	}

	getHeaderPages() {
		return Object.values(this.headerPages)
	}

	getPage(id: string) {
		return this.pages[id]
	}

	addPage(name: string, content?: JSONContent) {
		const newPage = new PageService(name, content || {type: 'doc', content: []})
		this.pages[newPage.id] = newPage

		this.headerPages[newPage.id] = newPage

		PageLocalStorage.addPage(newPage)

		return newPage
	}

	removePage(id: string) {
		PageLocalStorage.removePage(id)

		delete this.pages[id]
		delete this.headerPages[id]

		if (this.currentPage?.id === id) {
			this.currentPage = null
		}
	}

	setCurrentPage(page: PageService) {
		const currentPage = PageLocalStorage.getValue(page.id)

		const pageService = new PageService(currentPage.name, currentPage?.content)
		pageService.setId(currentPage.id)

		this.pages[currentPage.id] = pageService

		this.currentPage = this.pages[pageService.id]
	}

	updatePage(page: PageService) {
		this.pages[page.id] = page
	}

	updateContentCurrentPage(content: JSONContent) {
		this.currentPage.updateContent(content)

		PageLocalStorage.setValue(this.currentPage.id, this.currentPage)
	}

	updatePageName(page: PageService, name: string) {
		page.setName(name)

		PageLocalStorage.setPage(page)
		PageLocalStorage.setPagesHeader(page)
	}

	getCurrentPage() {
		return this.currentPage
	}
}

