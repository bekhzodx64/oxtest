import { Navigate } from 'react-router-dom'
import { cookie } from 'services'

type ProtectedRouteProps = { children: JSX.Element }

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const isAuthenticated = cookie.get('token')

	return isAuthenticated ? children : <Navigate to={'/auth/login'} />
}

export default ProtectedRoute
