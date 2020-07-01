import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function Login() {
	return (
		<div>
			<form>
				<TextField id="standard-basic" label="Email" />
				<TextField id="standard-basic" label="Password" />
				<Button variant="contained" color="primary">
					Login
				</Button>
			</form>
		</div>
	);
}
