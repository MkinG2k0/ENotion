import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

import { Test } from 'shared/config/routing/test'

const Main = lazy(() => import('pages/main'))
const Auth = lazy(() => import('pages/auth'))

export const router: any = createBrowserRouter([
	{
		element: <Main/>,
		path: '/',
	},
	{
		element: <Auth/>,
		path: '/auth',
	},
	{
		element: <Test/>,
		path: '/test',
	},
])
