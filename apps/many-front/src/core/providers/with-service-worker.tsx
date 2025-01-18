import { serviceWorker } from 'entities/service-worker'

export const WithServiceWorker = (component: FC) => (props) => {
	return <>{component(props)}</>
}
