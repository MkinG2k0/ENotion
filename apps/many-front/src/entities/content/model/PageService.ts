import { makeAutoObservable } from 'mobx'
import type { JSONContent } from 'entities/content'

import { uuid } from 'shared/lib/uuid'

export class PageService {
	id = uuid()

	constructor(public name: string, public content: JSONContent) {
		makeAutoObservable(this)
	}

	setId(id: string) {
		this.id = id
	}

	setName(name: string) {
		this.name = name
	}

	updateContent(content: JSONContent) {
		this.content = content
	}
}


