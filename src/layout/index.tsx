import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'

const Layout = () => {
	return (
		<div className='flex'>
			<Sidebar />

			<div className='w-full p-5'>
				<Outlet />
			</div>
		</div>
	)
}

export default Layout
