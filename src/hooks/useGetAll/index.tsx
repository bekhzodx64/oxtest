import {
	useQuery,
	QueryFunctionContext,
	UseQueryResult,
	UseQueryOptions,
} from '@tanstack/react-query'
import { TParams } from 'services/types'
import { http, queryBuilder } from 'services'

interface QueryKeyArgs {
	url: string
	params?: TParams | undefined
}

interface Props {
	name: string
	url: string
	onSuccess?: (data: any) => void
	onError?: (error: any) => void
	queryOptions?: UseQueryOptions<any, any, any, any>
	params?: TParams | undefined
}

async function getAll({
	queryKey,
}: QueryFunctionContext<[string, QueryKeyArgs]>) {
	const { url, params } = queryKey[1]

	const res = await http.get(queryBuilder(url, params))
	return res.data
}

function useGetAll(args: Props): UseQueryResult {
	const { name, onSuccess, onError, queryOptions, url, params } = args

	const data = useQuery({
		queryKey: [`${name}`, { url, params }],
		queryFn: getAll,
		onSuccess,
		onError,
		...queryOptions,
	})

	return { ...data }
}
export default useGetAll
