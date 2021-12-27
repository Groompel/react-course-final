import React, { useState } from 'react';

import { Send } from '@mui/icons-material';
import { Button, Grid, TextField } from '@mui/material';

export default function AddTaskForm({ handleSubmit, inputRef, loading }) {
	const [text, setText] = useState('');

	const onSubmit = (event) => {
		event.preventDefault();
		if (text.trim().length === 0 || loading) {
			return;
		}

		handleSubmit(text.trim());
		setText('');
	};

	return (
		<Grid container component="form" onSubmit={onSubmit} spacing={1}>
			<Grid item flexGrow={2}>
				<TextField
					fullWidth
					inputRef={inputRef}
					id="outlined-basic"
					label="Enter new task here..."
					autoComplete="off"
					size="small"
					value={text}
					onChange={({ target: { value } }) => setText(value)}
					disabled={loading}
				/>
			</Grid>
			<Grid item>
				<Button
					aria-label="send"
					variant="contained"
					sx={{
						height: '100%',
					}}
					type="submit"
					disabled={loading}
				>
					<Send fontSize="1rem" />
				</Button>
			</Grid>
		</Grid>
	);
}
