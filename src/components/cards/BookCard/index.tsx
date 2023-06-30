import { Button } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useDelete, useHooks } from 'hooks'
import { toast } from 'react-toastify'

import cover from '../../../assets/images/book.png'

interface TBook {
	book: {
		isbn: string
		id: number
		author: string
		cover: string
		title: string
		published: number
	}
	status: number
}

const BookCard = ({ item }: { item: TBook }) => {
	const { get, navigate } = useHooks()
	const { mutate } = useDelete()
	const queryClient = useQueryClient()

	const status = {
		0: 'New',
		1: 'Reading',
		2: 'Finish',
	}

	const deleteAction = () => {
		mutate({
			url: `/books/${get(item, 'book.id')}`,
			onSuccess: () => {
				queryClient.invalidateQueries(['books'])
				toast.success('The book has been deleted.')
			},
			onError: (error) => {
				toast.error(get(error, 'response.data.message'))
			},
		})
	}

	const updateAction = (id: number) => {
		navigate(`/books/update/${id}`)
	}

	return (
		<div className='cursor-pointer'>
			<div className='aspect-[9/10] relative group'>
				<img
					src={cover}
					alt={get(status, item.status)}
					className='object-cover w-full h-full'
				/>

				<div className='absolute inset-0 flex items-center justify-center transition-all opacity-0 bg-black/40 hover:opacity-100'>
					<Button
						className='w-1/2'
						variant='contained'
						onClick={() => updateAction(get(item, 'book.id'))}
					>
						Update
					</Button>
				</div>
			</div>

			<div className='flex flex-col gap-3 p-2 border'>
				<div className='flex items-center justify-between'>
					<h2>{get(item, 'book.isbn')}</h2>
					<div>
						<span className={`${get(status, item.status)}`}>
							{get(status, item.status, 'Empty')}
						</span>
					</div>
				</div>
				<div className='flex items-center justify-end'>
					<Button
						className='w-full'
						variant='outlined'
						color='error'
						onClick={deleteAction}
					>
						Delete
					</Button>
				</div>
			</div>
		</div>
	)
}

export default BookCard
