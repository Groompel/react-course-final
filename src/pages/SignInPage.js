import { Button, Stack } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import PaperContainer from '../components/PaperContainer';
import { auth } from '../contexts/AuthContext';

export default function SignInPage() {
	const navigate = useNavigate();

	const signIn = () => {
		const provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider).then((res) => navigate('/'));
	};

	return (
		<PaperContainer sx={{ maxWidth: '500px' }}>
			<Stack sx={{ padding: '1rem' }} gap="1rem">
				<Button variant="contained" onClick={signIn}>
					Sign In With Google
				</Button>
			</Stack>
		</PaperContainer>
	);
}
