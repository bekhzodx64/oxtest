import { InputLabel } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectProps } from '@mui/material/Select'
import { get } from 'lodash'

type MuiSelectProps = {
	field?: { [key: string]: any }
	name: string
	label?: string
	containerClassName?: string
	className?: string
	props?: SelectProps
	form?: { [key: string]: any }
	options: { [key: string]: any }[]
	optionLabel?: string
	optionValue?: string
}

export default function MuiSelect({
	field,
	name,
	label,
	containerClassName = '',
	className = '',
	form,
	options,
	optionLabel = 'label',
	optionValue = 'value',
	...props
}: MuiSelectProps) {
	return (
		<FormControl fullWidth>
			<InputLabel id={name}>{label}</InputLabel>
			<Select
				labelId={name}
				id={name}
				label={label}
				{...field}
				{...props}
			>
				{options.map((option, index) => {
					return (
						<MenuItem
							value={get(option, optionValue)}
							key={get(option, optionValue)}
						>
							{get(option, optionLabel)}
						</MenuItem>
					)
				})}
			</Select>
		</FormControl>
	)
}
