import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function Login() {
	const [inputs, setInputs] = useState({
		email: '',
		password: ''
	});
	const { email, password } = inputs;
	const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });
	console.log(inputs);
	//Refactor this to use axios, or just externalize this function
	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = { email, password };
			const response = await fetch('http://localhost:8084/auth/login', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(body)
			});

			const parseRes = await response.json();

			if (parseRes.jwtToken) {
				localStorage.setItem('token', parseRes.jwtToken);
				// setAuth(true);
				// toast.success('Logged in Successfully');
			} else {
				// setAuth(false);
				// toast.error(parseRes);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<div>
			<form>
				<TextField id="standard-basic" label="Email" name="email" value={email} onChange={(e) => onChange(e)} />
				<TextField
					id="standard-basic"
					label="Password"
					name="password"
					value={password}
					onChange={(e) => onChange(e)}
				/>
				<Button variant="contained" color="primary">
					Login
				</Button>
			</form>
		</div>
	);
}
