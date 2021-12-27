import { Delete } from '@mui/icons-material';
import {
	Button,
	Checkbox,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import AddTaskForm from '../components/AddTaskForm';
import LoaderTop from '../components/LoaderTop';
import PaperContainer from '../components/PaperContainer';
import { AuthContext } from '../contexts/AuthContext';
import {
	createTask,
	loadTasks,
	removeTask,
	selectLoading,
	selectTasks,
	toggleTask,
} from '../features/tasks/tasksSlice';
import formatDate from '../utils/formatDate';

export default function HomePage() {
	const tasks = useSelector(selectTasks);
	const dataLoading = useSelector(selectLoading);
	const dispatch = useDispatch();
	const inputRef = useRef();
	const { user } = useContext(AuthContext);
	const [activeTask, setActiveTask] = useState();
	const navigate = useNavigate();

	const { id } = useParams();

	const handleToggle = (id, completed) => {
		if (dataLoading) {
			return;
		}
		console.log(id, completed);

		dispatch(toggleTask(user.uid, id, completed));
	};

	const handleRemove = (id) => {
		if (dataLoading) {
			return;
		}
		dispatch(removeTask(user.uid, id));
	};
	const handleSubmit = (text) => {
		if (dataLoading) {
			return;
		}
		dispatch(
			createTask(user.uid, {
				text,
				id: uuidv4(),
				completed: false,
				createdAt: new Date().getTime(),
			})
		);
	};

	useEffect(() => {
		if (!id) {
			setActiveTask(undefined);
			return;
		}

		if (tasks.length === 0) {
			setActiveTask(undefined);
			return;
		}

		for (const task of tasks) {
			if (id === task.id) {
				setActiveTask(task);
				return;
			}
		}

		navigate('/tasks');
	}, [id, tasks]);

	useEffect(() => {
		if (user) {
			dispatch(loadTasks(user.uid));
		}
	}, [user]);

	return (
		<Grid container spacing={4}>
			<AnimatePresence>{dataLoading && <LoaderTop />}</AnimatePresence>
			<Grid
				item
				xs={id && activeTask ? 6 : 12}
				sx={{ display: 'flex', justifyContent: 'center' }}
			>
				<Stack
					spacing="2rem"
					sx={{
						maxHeight: 'calc(100vh - 200px)',
						paddingBottom: '2rem',
						width: '100%',
						maxWidth: activeTask ? 'initial' : '500px',
					}}
				>
					<PaperContainer elevation={2}>
						<Stack sx={{ padding: '1rem' }} gap="1rem">
							<Typography variant="h5">Hello, {user.displayName}</Typography>
							<AddTaskForm
								handleSubmit={handleSubmit}
								inputRef={inputRef}
								loading={dataLoading}
							/>
						</Stack>
					</PaperContainer>
					<PaperContainer sx={{ flexGrow: '2', overflowY: 'auto' }}>
						<List>
							<AnimatePresence>
								{tasks.length > 0 ? (
									tasks.map((task) => {
										const labelId = `checkbox-list-label-${task}`;

										return (
											<ListItem
												key={task.id}
												component={motion.li}
												sx={{ position: 'relative' }}
												secondaryAction={
													<IconButton
														edge="end"
														aria-label="delete"
														color="error"
														onClick={() => handleRemove(task.id)}
														disabled={dataLoading}
													>
														<Delete />
													</IconButton>
												}
												disablePadding
												exit={{ left: '50px', opacity: 0 }}
												initial={{ left: '-50px', opacity: 0 }}
												animate={{ left: '0', opacity: 1 }}
												transition={{ duration: 0.15, type: 'just' }}
											>
												<ListItemButton
													role={undefined}
													dense
													selected={activeTask?.id === task.id}
													onClick={() =>
														navigate(
															`/tasks/${
																activeTask?.id === task.id ? '' : task.id
															}`
														)
													}
												>
													<ListItemIcon
														style={{ minWidth: '2rem' }}
														onClick={(event) => {
															event.stopPropagation();
															handleToggle(task.id, !task.completed);
														}}
													>
														<Checkbox
															edge="start"
															checked={task.completed}
															tabIndex={-1}
															disableRipple
															inputProps={{ 'aria-labelledby': labelId }}
															disabled={dataLoading}
														/>
													</ListItemIcon>
													<ListItemText
														id={labelId}
														primary={task.text}
														sx={{
															opacity: task.completed ? 0.6 : 1,
															textDecoration: task.completed
																? 'line-through'
																: 'none',
														}}
														primaryTypographyProps={{
															style: {
																textOverflow: 'ellipsis',
																overflow: 'hidden',
																maxWidth: '390px',
																whiteSpace: 'nowrap',
															},
														}}
													/>
												</ListItemButton>
											</ListItem>
										);
									})
								) : (
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemText
												primary="No tasks here!"
												sx={{ textAlign: 'center' }}
												onClick={() => inputRef.current.focus()}
											/>
										</ListItemButton>
									</ListItem>
								)}
							</AnimatePresence>
						</List>
					</PaperContainer>
				</Stack>
			</Grid>
			{id && activeTask && (
				<Grid item xs={6}>
					<AnimatePresence>
						<PaperContainer
							sx={{ flexGrow: '2', overflowY: 'auto', padding: '1rem' }}
						>
							<Stack spacing={1}>
								<Typography variant="p">{activeTask.text}</Typography>

								<Grid container>
									<Grid item flexGrow={1}>
										<Typography
											variant="subtitle2"
											textAlign="left"
											fontSize="0.8rem"
											sx={{ opacity: 0.7 }}
										>
											Created at: {formatDate(activeTask.createdAt)}
										</Typography>
									</Grid>
									<Grid item flexGrow={1}>
										<Typography
											variant="subtitle2"
											textAlign="right"
											fontSize="0.8rem"
											sx={{ opacity: 0.7 }}
										>
											Finished at:{' '}
											{!activeTask.completed
												? '–'
												: formatDate(activeTask.finishedAt)}
										</Typography>
									</Grid>
								</Grid>

								<Grid container justifyContent="space-between">
									<Grid
										item
										onClick={() => handleToggle(id, !activeTask.completed)}
									>
										<Checkbox
											edge="start"
											checked={activeTask.completed}
											tabIndex={-1}
											disableRipple
											disabled={dataLoading}
										/>
									</Grid>
									<Grid item>
										<Button
											variant="contained"
											color="error"
											sx={{ height: '100%' }}
											onClick={() => handleRemove(id)}
											disabled={dataLoading}
										>
											<Delete /> Delete
										</Button>
									</Grid>
								</Grid>
							</Stack>
						</PaperContainer>
					</AnimatePresence>
				</Grid>
			)}
		</Grid>
	);
}
