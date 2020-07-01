import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function Register() {
	return (
		<div>
			<form>
				<TextField id="standard-basic" label="Email" />
				<TextField id="standard-basic" label="Password" />
				<Button variant="contained" color="primary">
					Register
				</Button>
			</form>
		</div>
	);
}
