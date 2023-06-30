import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import useGetAll from 'hooks/useGetAll'
import { get } from 'lodash'
import { FC, ReactElement } from 'react'
import { TParams } from 'services/types'

interface IContainer {
	children: (
		data: {
			items: object[]
		} & UseQueryResult
	) => ReactElement<any, any> | null
	name: string
	url: string
	dataKey?: string
	onSuccess?: (data: object[] | [] | object) => void
	onError?: (error: object | []) => void
	queryOptions?: UseQueryOptions<any, Error>
	params?: TParams | undefined
}

const All: FC<IContainer> = ({
	children,
	name,
	url,
	onSuccess,
	onError,
	dataKey = 'data',
	queryOptions,
	params,
}) => {
	const data = useGetAll({
		name,
		url,
		onSuccess,
		onError,
		queryOptions,
		params,
	})

	const newData: { items: object[] | [] } = {
		items: get(data, `data.${dataKey}`, []),
	}
	return children({
		items: newData.items,
		...data,
	})
}

export default All
