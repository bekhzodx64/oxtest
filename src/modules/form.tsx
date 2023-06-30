import { FC, ReactNode } from 'react'
import {
	Formik,
	Form,
	FormikHelpers,
	FormikState,
	FormikHandlers,
} from 'formik'
import usePost from 'hooks/usePost'
import { IMethod, TParams } from 'services/types'
import { isArray } from 'lodash'
import { UseMutationResult } from '@tanstack/react-query'
import * as Yup from 'yup'
import { useHooks } from 'hooks'
import { QueryClient } from '@tanstack/query-core'

type TFields = {
	name: string
	type?:
		| 'object'
		| 'array'
		| 'number'
		| 'string'
		| 'boolean'
		| 'date'
		| undefined
	value?: any
	required?: boolean
	disabled?: boolean | string
	min?: number
	max?: number
	onSubmitKey?: any
	onSubmitValue?: (value: any, values: any) => any
}[]

interface IFormContent {
	url: string
	method: IMethod
	name?: string
	params?: TParams | undefined
	children: (
		data: FormikState<any> &
			FormikHelpers<any> &
			FormikHandlers &
			UseMutationResult<any, any, any>
	) => ReactNode
	onSuccess?: (data: any, resetForm: Function, queryClient: QueryClient) => any
	onError?: (data: any) => void
	fields: TFields
	headers?: Object
	// queryOptions?: UseQueryOptions<any, Error>;
}

const FormContent: FC<IFormContent> = ({
	url,
	method,
	name,
	onSuccess = () => {},
	onError = () => {},
	children,
	fields,
	params,
	headers,
	// queryOptions,
}) => {
	const { queryClient } = useHooks()
	const mutatePost = usePost()

	return (
		<div>
			<Formik
				initialValues={
					isArray(fields)
						? fields.reduce(
								(prev, curr) => ({
									...prev,
									[curr.name]: curr.value ?? curr.value,
								}),
								{}
						  )
						: {}
				}
				enableReinitialize={true}
				validationSchema={() => {
					if (!isArray(fields)) {
						return Yup.object().shape({})
					}

					let validationFields: any = {}

					fields.forEach((field) => {
						let validationField: any

						switch (field.type) {
							case 'string':
								validationField = Yup.string().typeError('Должна быть строка')
								break
							case 'object':
								validationField = Yup.object()
								break
							case 'number':
								validationField = Yup.number().typeError('Должен быть числом')
								break
							case 'array':
								validationField = Yup.array().typeError('Должен быть массивом')
								break
							case 'boolean':
								validationField = Yup.boolean().typeError('Должен быть булевым')
								break
							case 'date':
								validationField = Yup.date().typeError('Должен быть датой')
								break
							default:
								validationField = Yup.string()
						}

						if (field.required) {
							validationField = validationField.required('Required')
						}

						if (field.min) {
							validationField = validationField.min(
								field.min,
								'Слишком короткий!'
							)
						}

						if (field.max) {
							validationField = validationField.max(
								field.max,
								'Слишком длинный!'
							)
						}

						validationField = validationField.nullable()

						validationFields[field.name] = validationField
					})

					return Yup.object().shape(validationFields)
				}}
				onSubmit={(values, { resetForm }) => {
					values = { ...values }
					fields.forEach((field) => {
						if (field.hasOwnProperty('onSubmitValue')) {
							if (typeof field.onSubmitValue === 'function') {
								if (field.hasOwnProperty('onSubmitKey')) {
									values[field.onSubmitKey] = field.onSubmitValue(
										values[field.name],
										values
									)
									delete values[field.name]
								} else {
									values[field.name] = field.onSubmitValue(
										values[field.name],
										values
									)
								}
							}
						}
						if (field.hasOwnProperty('disabled')) {
							if (field.disabled) {
								delete values[field.name]
							}
						}
					})
					mutatePost.mutate(
						{
							url,
							method,
							data: values,
							params,
							headers,
						},
						{
							onSuccess: (data) => {
								onSuccess(data.data, resetForm, queryClient)
								if (name) {
									queryClient.invalidateQueries({ queryKey: [`${name}`] })
								}
							},
							onError,
						}
					)
				}}
			>
				{(props: FormikState<any> & FormikHelpers<any> & FormikHandlers) => {
					return (
						<Form onSubmit={props.handleSubmit}>
							{children({ ...props, ...mutatePost })}
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default FormContent
