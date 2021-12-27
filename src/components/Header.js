import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useContext } from 'react';
import { auth, AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

export default function Header() {
	const { user } = useContext(AuthContext);

	return (
		<AppBar>
			<Toolbar
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Box>
					<Link
						to="/"
						style={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<AssignmentTurnedInIcon />
						&nbsp;&nbsp;
						<Typography variant="h6" color="inherit" noWrap>
							Tasker
						</Typography>
					</Link>
				</Box>
				{user ? (
					<Button
						variant="contained"
						color="secondary"
						onClick={() => {
							signOut(auth);
							window.location.reload();
						}}
					>
						Sign Out
					</Button>
				) : (
					<Button
						variant="contained"
						color="secondary"
						to="/sign-in"
						component={Link}
					>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
}
