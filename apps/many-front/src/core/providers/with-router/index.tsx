import { RouterProvider } from 'react-router-dom'

import { browserRouter } from './config'

export const WithRouter = (component: FC) => (props) => {
	return <RouterProvider router={browserRouter} />
}
