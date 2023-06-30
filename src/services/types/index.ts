export type TParams = {
	fields?: object[]
	include?: string | string[]
	append?: string | string[]
	limit?: number
	sort?: string | null
	filter?: {
		[key: string]: number | string | boolean | [] | object | undefined | null
	}
	page?: number | undefined | null
	extra?: {
		[key: string]: number | string | boolean | [] | object | undefined | null
	}
}

export type TContainerAllProps = {
	items: any
}

export type IMethod = 'post' | 'put' | 'delete' | 'patch'

type TRoutesObj = {
	path: string
	element: () => JSX.Element
	children?: TRoutesObj[]
}

export type TRoutes = {
	protectedRoutes: TRoutesObj[]
	routes: TRoutesObj[]
}
