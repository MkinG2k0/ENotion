import { Link } from 'react-router-dom'

import { Button, type ButtonProps } from 'shared/ui/button'

export interface NavBtnProps extends ButtonProps {
	to: string
}

export const NavBtn: FC<NavBtnProps> = ({children, to, ...props}) => {
	return (
		<Link to={to}>
			<Button {...props}>{children}</Button>
		</Link>
	)
}

