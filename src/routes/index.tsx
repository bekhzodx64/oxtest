import ProtectedRoute from 'middleware/ProtectedRoute'
import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from 'layout'
import data from './data'

const RoutesWrapper = () => {
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
					}
				>
					{data.protectedRoutes.map((item) => {
						return (
							<Route
								path={item.path}
								element={<item.element />}
								key={item.path}
							>
								{item.children
									? item.children.map((innerItem) => (
											<Route
												path={innerItem.path}
												element={<innerItem.element />}
												key={innerItem.path}
											/>
									  ))
									: null}
							</Route>
						)
					})}
				</Route>

				{data.routes.map((item) => (
					<Route path={item.path} element={<item.element />} key={item.path}>
						{item.children
							? item.children.map((innerItem) => (
									<Route
										path={innerItem.path}
										element={<innerItem.element />}
										key={innerItem.path}
									/>
							  ))
							: null}
					</Route>
				))}

				<Route path='*' element={<div>404</div>} />
			</Routes>
		</>
	)
}

export default RoutesWrapper
