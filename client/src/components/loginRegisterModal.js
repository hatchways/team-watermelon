import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function LoginRegisterModal() {
	const [loginActive, setLoginActive] = useState(true);
	const [userData, setUserData] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);

	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});
	const { email, password } = formData;
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmitForm = async (e) => {
		e.preventDefault();
		loginRegister(email, password, loginActive);
	};

	const loginRegister = async (email, password, login) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const body = { email, password };
		try {
			const res = await axios.post(`/auth/${login ? 'login' : 'register'}`, body, config);
			setUserData(res.data);
			setFormData({
				email: '',
				password: ''
			});
			console.log(userData);
		} catch (err) {
			const errors = err.response.data.errors;
			console.log(errors);
		}
	};
	const active = {
		marginTop: '0',
		color: 'red',
		borderBottom: '2px solid black'
	};
	const inactive = {
		color: 'black',
		border: 'none'
	};
	const dialog = {
		padding: '20px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	};
	console.log(userData);
	return (
		<div>
			<Button onClick={() => setDialogOpen(true)} variant="contained" color="primary">
				Login
			</Button>
			<Dialog style={dialog} open={dialogOpen}>
				<div style={dialog}>
					<Tab onClick={() => setLoginActive(true)} variant="contained" color="primary">
						Login
					</Tab>
					<Tab onClick={() => setLoginActive(false)} variant="contained" color="primary">
						Register
					</Tab>
					<AppBar position="static" color="default">
						<Tabs
							// value={value}
							// onChange={handleChange}
							indicatorColor="primary"
							textColor="primary"
							variant="fullWidth"
						>
							<Tab
								style={loginActive ? active : inactive}
								label="login"
								onClick={() => setLoginActive(true)}
								variant="contained"
								color="primary"
							>
								Login
							</Tab>
							<Tab
								style={loginActive ? inactive : active}
								label="register"
								onClick={() => setLoginActive(false)}
								variant="contained"
								color="primary"
							>
								Register
							</Tab>
						</Tabs>
					</AppBar>
					<form>
						<TextField
							id="standard-basic"
							label="Email"
							name="email"
							value={email}
							onChange={(e) => onChange(e)}
						/>
						<TextField
							id="standard-basic"
							label="Password"
							name="password"
							value={password}
							onChange={(e) => onChange(e)}
						/>
						<DialogActions>
							<Button onClick={onSubmitForm} variant="contained" color="primary">
								{loginActive ? 'Login' : 'Register'}
							</Button>
							<Button onClick={() => setDialogOpen(false)} color="primary">
								Cancel
							</Button>
						</DialogActions>
					</form>
				</div>
			</Dialog>
		</div>
	);
}
