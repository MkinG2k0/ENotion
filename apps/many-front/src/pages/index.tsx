import { RouterProvider } from 'react-router-dom'
import type { FC } from 'react'

import { router } from 'shared/config/routing'

import { setDefaultOptions } from 'date-fns'
// TODO
import { ru } from 'date-fns/locale'

setDefaultOptions({locale: ru})

export const Pages: FC = () => {
	return <RouterProvider router={router}/>
}
