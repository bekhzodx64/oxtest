import Auth from 'pages/Auth'
import Login from 'pages/Auth/Login'
import Goods from 'pages/Goods'

import { TRoutes } from 'services/types'

const data: TRoutes = {
	protectedRoutes: [
		{ path: '/', element: Goods },
		{ path: '/goods/:id', element: Goods },
	],
	routes: [
		{
			path: '/auth',
			element: Auth,
			children: [{ path: 'login', element: Login }],
		},
	],
}

export default data
