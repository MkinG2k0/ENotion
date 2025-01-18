import 'core/styles/index.css'

import { ThemeContext } from 'shared/hook/use-theme'

export const WithTheme = (component: FC) => (props) => {
	return (
		<ThemeContext>
			<div className={' bg-background text-foreground'}>{component(props)}</div>
		</ThemeContext>
	)
}
