import { Link } from 'react-router-dom'

import { UserAuthForm } from 'entities/auth/ui'

import { buttonVariants } from 'shared/ui/button'
import { cn } from 'shared'

export const AuthenticationPage = () => {
	return (
		<div className={'h-[100vh]'}>
			<div className={'md:hidden'}>
				{/*<img*/}
				{/*	alt={'Authentication'}*/}
				{/*	className={'block dark:hidden'}*/}
				{/*	height={843}*/}
				{/*	src={'/examples/authentication-light.png'}*/}
				{/*	width={1280}*/}
				{/*/>*/}
				{/*<img*/}
				{/*	alt={'Authentication'}*/}
				{/*	className={'hidden dark:block'}*/}
				{/*	height={843}*/}
				{/*	src={'/examples/authentication-dark.png'}*/}
				{/*	width={1280}*/}
				{/*/>*/}
			</div>
			<div
				className={
					'container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0'
				}
			>
				<Link
					className={cn(
						buttonVariants({ variant: 'ghost' }),
						'absolute right-4 top-4 md:right-8 md:top-8',
					)}
					to={'/'}
				>
					Login
				</Link>
				<div
					className={
						'relative max-xl:hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'
					}
				>
					<div className={'absolute inset-0 bg-zinc-900'} />
					<div className={'relative z-20 flex items-center text-lg font-medium'}>
						<svg
							className={'mr-2 h-6 w-6'}
							fill={'none'}
							stroke={'currentColor'}
							strokeLinecap={'round'}
							strokeLinejoin={'round'}
							strokeWidth={'2'}
							viewBox={'0 0 24 24'}
							xmlns={'http://www.w3.org/2000/svg'}
						>
							<path d={'M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3'} />
						</svg>
						Acme Inc
					</div>
					<div className={'relative z-20 mt-auto'}>
						<blockquote className={'space-y-2'}>
							<p className={'text-lg'}>
								&ldquo;This library has saved me countless hours of work and helped me deliver
								stunning designs to my clients faster than ever before.&rdquo;
							</p>
							<footer className={'text-sm'}>Sofia Davis</footer>
						</blockquote>
					</div>
				</div>
				<div className={''}>
					<div className={'mx-auto flex w-full flex-col justify-center space-y-6 max-w-[350px]'}>
						<div className={'flex flex-col space-y-2 text-center'}>
							<h1 className={'text-2xl font-semibold tracking-tight'}>Create an account</h1>
							<p className={'text-sm text-muted-foreground'}>
								Enter your email below to create your account
							</p>
						</div>
						<UserAuthForm />
						<p className={'px-8 text-center text-sm text-muted-foreground'}>
							By clicking continue, you agree to our{' '}
							<Link className={'underline underline-offset-4 hover:text-primary'} to={'/terms'}>
								Terms of Service
							</Link>
							and
							<Link className={'underline underline-offset-4 hover:text-primary'} to={'/privacy'}>
								Privacy Policy
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AuthenticationPage
