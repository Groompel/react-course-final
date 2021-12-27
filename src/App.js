import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PageLoader from './components/PageLoader';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';

// const theme = createTheme({
// 	palette: {
// 		primary: {
//       main:
//     }
// 	},
// });

function App() {
	const { userLoading } = useContext(AuthContext);

	return (
		<div className="App">
			{/* <ThemeProvider theme={theme}> */}
			<Header />
			{userLoading ? (
				<PageLoader />
			) : (
				<Container maxWidth="lg" sx={{ width: '100%' }}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							paddingTop: '200px',
							paddingBottom: '1rem',
							maxHeight: '100vh',
							width: '100%',
							overflow: 'hidden',
						}}
					>
						<Routes>
							<Route
								path="/tasks"
								exact
								element={
									<PrivateRoute>
										<HomePage />
									</PrivateRoute>
								}
							/>
							<Route
								path="/tasks/:id"
								exact
								element={
									<PrivateRoute>
										<HomePage />
									</PrivateRoute>
								}
							/>
							<Route exact path="/sign-in" element={<SignInPage />} />
							<Route exact path="/" element={<Navigate to="/tasks" />} />
						</Routes>
					</Box>
				</Container>
			)}
			{/* </ThemeProvider> */}
		</div>
	);
}

export default App;
