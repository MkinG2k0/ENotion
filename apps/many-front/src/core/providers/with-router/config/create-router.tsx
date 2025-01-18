import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

const Main = lazy(() => import('pages/main'))
const Auth = lazy(() => import('pages/auth'))

export const browserRouter = createBrowserRouter([
	{
		element: <Main />,
		path: '/',
	},
	{
		element: <Auth />,
		path: '/auth',
	},
])
