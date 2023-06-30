import axios, { InternalAxiosRequestConfig } from 'axios'
import { get } from 'lodash'
import { logout } from 'utils'
import cookie from '../cookie'

const http = axios.create({
	// @ts-ignore
	baseURL: process.env.REACT_APP_BASE_URL,
	timeout: 30000,
})

http.interceptors.request.use(
	(configs: InternalAxiosRequestConfig) => {
		if (cookie.get('token')) {
			configs.headers.Authorization = `Bearer ${cookie.get('token')}`
		}
		return configs
	},
	(error) => {
		return Promise.reject(error)
	}
)

// http.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		// if (get(error, 'response.status') === 401) {
// 		// 	logout()
// 		// }
// 		return Promise.reject(error)
// 	}
// )

export default http
