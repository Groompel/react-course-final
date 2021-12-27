import { Box } from '@mui/system';
import Loader from 'react-loader-spinner';

export default function PageLoader() {
	return (
		<Box
			sx={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Loader type="MutatingDots" color="#1976D1" secondaryColor="#30bfdf" />
		</Box>
	);
}
