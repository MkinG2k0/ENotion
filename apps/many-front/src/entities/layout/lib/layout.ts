import { makeAutoObservable } from 'mobx'

class Layout {
	collapsed = false
	isOpenPages = false
	isMobile = false

	constructor() {
		makeAutoObservable(this)
	}

	setCollapsed(collapsed: boolean) {
		this.collapsed = collapsed
	}

	setOpenPages(open: boolean) {
		this.isOpenPages = open
	}

	setIsMobile(isMobile: boolean) {
		this.isMobile = isMobile
	}
}

export const layout = new Layout()
