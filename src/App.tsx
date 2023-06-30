import { useGetAll } from 'hooks'
import { ToastContainer } from 'react-toastify'
import { cookie } from 'services'
import RoutesWrapper from './routes'

import 'react-toastify/dist/ReactToastify.css'

function App() {
	// useGetAll({
	// 	url: '/myself',
	// 	name: 'me',
	// 	queryOptions: {
	// 		enabled: cookie.get('key') && cookie.get('secret') ? true : false,
	// 	},
	// })

	return (
		<div>
			<ToastContainer />
			<RoutesWrapper />
		</div>
	)
}

export default App
