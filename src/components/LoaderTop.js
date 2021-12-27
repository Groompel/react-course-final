import { Box } from '@mui/system';
import Loader from 'react-loader-spinner';
import { motion } from 'framer-motion';

export default function LoaderTop() {
	return (
		<Box
			sx={{
				width: '100vw',
				display: 'flex',
				justifyContent: 'center',
				position: 'absolute',
				left: 0,
				top: '80px',
			}}
			component={motion.div}
			initial={{ top: '-100px', opacity: 0 }}
			animate={{ top: '80px', opacity: 1 }}
			exit={{ top: '-100px', opacity: 0 }}
			transition={{ duration: 0.1, type: 'just' }}
		>
			<Loader
				type="Oval"
				color="#1976D1"
				secondaryColor="#30bfdf"
				width="80px"
				height="80px"
			/>
		</Box>
	);
}
