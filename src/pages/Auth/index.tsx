import { Navigate, Outlet, useLocation } from 'react-router-dom'

const Auth = () => {
	const location = useLocation()

	if (location.pathname === '/auth') return <Navigate to={'login'} />

	return (
		<div className='flex items-center justify-center min-h-screen p-10 bg-gradient-to-tl from-green-500 to-blue-500'>
			<div className='w-full max-w-sm p-5 overflow-hidden bg-white rounded-lg ring-8 ring-white/50'>
				<Outlet />
			</div>
		</div>
	)
}

export default Auth
