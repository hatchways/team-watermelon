import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

export default function LoginRegisterModal() {
	const [loginActive, setLoginActive] = useState(true);

	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});
	const { email, password } = formData;
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	//Refactor this to use axios, or just externalize this function
	const onSubmitForm = async (e) => {
		e.preventDefault();
		loginActive ? login(email, password) : register(email, password);
	};

	const login = async (email, password) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const body = { email, password };
		try {
			const res = await axios.post('/auth/login', body, config);
			console.log(res);
		} catch (err) {
			const errors = err.response.data.errors;
			console.log(errors);
		}
	};

	const register = async (email, password) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const body = { email, password };
		try {
			const res = await axios.post('/auth/register', body, config);
		} catch (err) {
			const errors = err.response.data.errors;
			console.log(errors);
		}
	};

	return (
		<div>
			<Button onClick={() => setLoginActive(true)} variant="contained" color="primary">
				Login
			</Button>
			<Button onClick={() => setLoginActive(false)} variant="contained" color="primary">
				Register
			</Button>
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
					{loginActive ? 'Login' : 'Register'}
				</Button>
			</form>
		</div>
	);
}
