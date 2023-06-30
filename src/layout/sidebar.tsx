import { Button } from '@mui/material'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { logout } from 'utils'

import CModal from 'components/modal'

const Sidebar = () => {
	const [logoutModal, setLogoutModal] = useState<boolean>(false)

	return (
		<div className='sticky top-0 w-full max-w-xs min-h-screen px-5 py-10 bg-slate-700'>
			<ul className='flex flex-col h-full gap-2'>
				<li>
					<NavLink
						className={({ isActive }) =>
							`block w-full transition-all hover:bg-white px-3 hover:text-slate-700 py-3 rounded-md ${
								isActive ? 'bg-white text-slate-700' : 'text-white'
							}`
						}
						to={'/'}
					>
						Goods
					</NavLink>
				</li>

				<li className='mt-auto justify-self-end'>
					<div
						onClick={() => setLogoutModal(true)}
						className='inline-block px-3 font-light text-white transition-all cursor-pointer hover:text-red-600'
					>
						Logout
					</div>
				</li>
			</ul>

			<CModal isOpen={logoutModal}>
				<div className='py-10'>
					<div className='text-xl text-center font-medium mx-auto max-w-[200px]'>
						Are you sure you want to exit?
					</div>
					<div className='flex justify-center gap-4 mt-6'>
						<Button
							variant='outlined'
							color='error'
							onClick={() => setLogoutModal(false)}
						>
							No
						</Button>
						<Button className='' variant='outlined' onClick={logout}>
							Yes
						</Button>
					</div>
				</div>
			</CModal>
		</div>
	)
}

export default Sidebar
