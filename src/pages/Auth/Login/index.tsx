import { Button } from '@mui/material'
import fields from 'components/fields'
import { ErrorMessage, Field } from 'formik'
import { useHooks } from 'hooks'
import Container from 'modules'
import { toast } from 'react-toastify'
import { cookie } from 'services'

const Login = () => {
	const { get, navigate } = useHooks()

	return (
		<div>
			<Container.Form
				method='post'
				url='/security/auth_check'
				fields={[
					{ name: '_username', required: true, value: 'user_task' },
					{ name: '_password', required: true, value: 'user_task' },
					{ name: '_subdomain', required: true, value: 'toko' },
				]}
				onSuccess={(data) => {
					cookie.set('token', get(data, 'token'))
					navigate('/')
				}}
				onError={(error) => {
					toast.error(
						get(error, 'response.data.message') ?? 'This user already exist!'
					)
				}}
				headers={{
					'Content-Type': 'application/x-www-form-urlencoded',
					Accept: 'application/json',
				}}
			>
				{({ isLoading }) => {
					return (
						<div className='space-y-10'>
							<h2 className='text-xl text-center'>Welcome to Dashboard</h2>

							<div className='flex flex-col gap-3'>
								<div>
									<Field
										label='Username'
										name='_username'
										type='text'
										component={fields.Input}
									/>
									<ErrorMessage
										name='_username'
										className='mt-2 text-red-500'
										component='div'
									/>
								</div>

								<div>
									<Field
										label='Password'
										name='_password'
										type='password'
										component={fields.Input}
									/>
									<ErrorMessage
										name='_password'
										className='mt-2 text-red-500'
										component='div'
									/>
								</div>

								<div>
									<Field
										label='Subdomain'
										name='_subdomain'
										type='text'
										component={fields.Input}
									/>
									<ErrorMessage
										name='_subdomain'
										className='mt-2 text-red-500'
										component='div'
									/>
								</div>
							</div>

							<div className='flex justify-center'>
								<Button
									disabled={isLoading}
									type='submit'
									className='!py-3 w-full max-w-[150px] bg-gradient-to-tl from-green-500 to-blue-500'
									variant='contained'
								>
									Login
								</Button>
							</div>
						</div>
					)
				}}
			</Container.Form>
		</div>
	)
}

export default Login
