import { Paper } from '@mui/material';

export default function PaperContainer({ children, sx }) {
	return (
		<Paper sx={{ width: '100%', ...sx }} elevation={4}>
			{children}
		</Paper>
	);
}
