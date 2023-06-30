import { Box, Modal } from '@mui/material'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	borderRadius: '0.375rem',
	boxShadow: 24,
	bgcolor: 'background.paper',
	p: 3,
}

const CModal = ({
	isOpen,
	children,
	width = 400,
}: {
	isOpen: boolean
	children: JSX.Element
	width?: number
}) => {
	return (
		<Modal open={isOpen}>
			<Box sx={{ ...style, width }}>{children}</Box>
		</Modal>
	)
}

export default CModal
