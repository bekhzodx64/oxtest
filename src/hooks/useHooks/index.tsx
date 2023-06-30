import lodash from 'lodash'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import qs from 'qs'
import { useQueryClient } from '@tanstack/react-query'
// import { useTranslation } from 'react-i18next'

const useHooks = () => {
	const queryClient = useQueryClient()
	// const { t } = useTranslation()
	const location = useLocation()
	const params = useParams()
	const query = qs.parse(location.search, { ignoreQueryPrefix: true })
	const navigate = useNavigate()

	return {
		query,
		location,
		params,
		// t,
		navigate,
		qs,
		queryClient,
		...lodash,
	}
}

export default useHooks
