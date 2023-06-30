import { TextField, TextFieldProps, TextFieldVariants } from '@mui/material'

type InputProps = {
	field?: { [key: string]: any }
	name: string
	label?: string
	containerClassName?: string
	className?: string
	props?: TextFieldProps
	variant?: TextFieldVariants
	form?: { [key: string]: any }
}

const Input = ({
	field,
	name,
	label,
	containerClassName = '',
	className = '',
	variant = 'outlined',
	form,
	...props
}: InputProps) => {
	return (
		<div className={`flex flex-col gap-4 ${containerClassName}`}>
			<TextField
				id={name}
				className={className}
				name={name}
				label={label}
				variant={variant}
				{...field}
				{...props}
			/>
		</div>
	)
}

export default Input
