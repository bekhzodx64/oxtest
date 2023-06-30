import { cookie } from 'services'

const logout = () => {
	cookie.remove('token')
	window.location.reload()
}

export { logout }
