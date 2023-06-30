import { useMutation } from '@tanstack/react-query'
import { http, queryBuilder } from 'services'
import { IMethod, TParams } from 'services/types'

interface IPostOptions {
	method: IMethod
	url: string
	data: any
	params?: TParams | undefined
	headers: any
}

export async function postData(options: IPostOptions) {
	const { url, data, params, method, headers } = options
	return await http[method](queryBuilder(url, params), data, { headers })
}

const usePost = () => {
	return useMutation(postData)
}

export default usePost
