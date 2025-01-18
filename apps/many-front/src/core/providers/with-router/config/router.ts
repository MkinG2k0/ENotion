const paths = (...paths: string[]) => '/'.concat(paths.join('/'))

export const route = {
	all: () => '*',
	auth: () => 'auth',
	main: () => '/',
}
