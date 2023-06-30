import { TextField } from '@mui/material'
import { useState } from 'react'

import { useGetAll, useHooks } from 'hooks'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

interface TGood {
	id: number
	name: string
	description: string
	images: any
	stocks: any
}

const Goods = () => {
	const { get } = useHooks()

	const [searchTerm, setSearchTerm] = useState<String>('')
	const [filteredGoods, setFilteredGoods] = useState([])
	const [page, setPage] = useState(0)

	const { data, isLoading } = useGetAll({
		url: `https://toko.ox-sys.com/variations`,
		name: 'goods',
		params: {
			page,
		},
	})

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const search = event.target.value

		setSearchTerm(search)

		const filteredProducts = get(data, 'items', []).filter((product: any) =>
			product.name.toLowerCase().includes(search.toLowerCase())
		)

		const sortedProducts = filteredProducts.sort((a: any, b: any) => {
			if (a.name.toLowerCase().startsWith(search.toLowerCase())) {
				return -1
			}
			if (b.name.toLowerCase().startsWith(search.toLowerCase())) {
				return 1
			}
			return 0
		})

		setFilteredGoods(sortedProducts)
	}

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage)
	}

	return (
		<div className='container space-y-5'>
			<div className='relative flex flex-col gap-2'>
				<TextField
					name='search'
					type='text'
					className='w-[300px]'
					value={searchTerm}
					onChange={handleInputChange}
					label='Search'
				/>

				{searchTerm && (
					<div className='absolute z-20 pt-3 top-full'>
						<div className='overflow-y-auto drop-shadow-md max-h-[260px] w-[300px] bg-white'>
							{filteredGoods.length ? (
								filteredGoods.map((product: any) => (
									<div className='flex items-center justify-between px-3 py-2 hover:bg-gray-100'>
										<p>{product.name}</p>
										<p>${product.stocks[0].sellPrice.USD.toFixed(2)}</p>
									</div>
								))
							) : (
								<div className='flex items-center justify-center h-full py-10'>
									No results
								</div>
							)}
						</div>
					</div>
				)}
			</div>

			<div>
				<TableContainer component={Paper} sx={{ maxHeight: '72vh' }}>
					<Table stickyHeader aria-label='sticky table' sx={{ minWidth: 650 }}>
						<TableHead>
							<TableRow>
								<TableCell width={'50px'}>ID</TableCell>
								<TableCell>Name</TableCell>
								<TableCell width={'100px'} align='right'>
									Type
								</TableCell>
								<TableCell align='right'>Price</TableCell>
								<TableCell align='right' width={'50px'}>
									Barcode
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody className='relative h-[65vh]'>
							{isLoading ? (
								<div className='absolute inset-0 flex items-center justify-center '>
									Loading, Please wait !
								</div>
							) : (
								get(data, 'items', []).map((row: TGood) => (
									<TableRow
										key={row.id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component='th' scope='row' width={'50px'}>
											{get(row, 'id') ? get(row, 'id') : '-'}
										</TableCell>
										<TableCell component='th' scope='row'>
											{get(row, 'name') ? get(row, 'name') : '-'}
										</TableCell>
										<TableCell
											component='th'
											align='right'
											scope='row'
											width={'50px'}
										>
											{get(row, 'productProperties[0].value')
												? get(row, 'productProperties[0].value')
												: '-'}
										</TableCell>
										<TableCell align='right'>
											$
											{get(row, 'stocks[0].sellPrice.USD')
												? get(row, 'stocks[0].sellPrice.USD').toFixed(2)
												: '-'}
										</TableCell>
										<TableCell align='right' width={'100px'}>
											{get(row, 'barcode') ? get(row, 'barcode') : '-'}
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>

				<div className='py-5'>
					<TablePagination
						component='div'
						count={get(data, 'total_count', 0)}
						rowsPerPage={100}
						rowsPerPageOptions={[100]}
						page={page}
						onPageChange={handleChangePage}
					/>
				</div>
			</div>
		</div>
	)
}

export default Goods
