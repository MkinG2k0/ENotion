import { type ReactNode, useState } from 'react'
import * as React from 'react'

import { cn } from 'shared'

import { type VariantProps, cva } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'

const buttonVariants = cva(
	'inline-flex items-center hover:opacity-90 transition-all justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
		variants: {
			size: {
				default: 'h-10 px-3 py-2',
				icon: 'h-8 w-8',
				['icon-md']: 'h-10 w-10',
				lg: 'h-11 rounded-md px-8',
				sm: 'h-9 rounded-md px-3',
			},
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
			},
		},
	},
)

export interface ButtonProps
	// extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	// children?: ReactNode | (({onHover}: { onHover: boolean }) => React.JSX.Element)[]
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({asChild = false, className, size, variant, ...props}, ref) => {
		const Comp = asChild ? Slot : 'button'
		const [onHover, setOnHover] = useState(false)

		return (
			<Comp onMouseOver={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}
						className={cn(buttonVariants({className, size, variant}))} ref={ref} {...props} />
		)
	},
)

// {(children as any[])?.map((child) => {
// 	if (typeof child === 'function') {
// 		return child({onHover})
// 	}
// 	return child
// })}

Button.displayName = 'Button'

export { Button, buttonVariants }
