import { Layout } from 'entities/layout/ui/layout'

export const WithLayout = (component: FC) => (props) => <Layout>{component(props)}</Layout>
