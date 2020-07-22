import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AuthContext from '../state_management/AuthContext';
import { Redirect } from 'react-router-dom';

const style = {
	error: {
		color: 'red'
	},
	dialog: {
		padding: '10px 40px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	appBar: {
		/*marginBottom: '30px'*/
	},
	formStyle: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: '40px',
		width: '100%'
	},
	hidden: {
		display: 'none'
	},
	textField: {
		width: '70%'
	}
};

export default function LoginRegisterModal(props) {
	const authContext = useContext(AuthContext);
	const [loginActive, setLoginActive] = useState(true);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [asyncStart, setAsyncStart] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	}; //handle tabs

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: ''
	});
	const { name, email, password } = formData;
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	const onSubmitForm = async (e) => {
		e.preventDefault();
		setAsyncStart(true);
	};

	const loginRegister = async (name, email, password, login) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const body = { name, email, password };
		try {
			const res = await axios.post(`/auth/${login ? 'login' : 'register'}`, body, config);
			setFormData({
				name: '',
				email: '',
				password: ''
			});
			setDialogOpen(false);
			return res;
		} catch (err) {
			const errors = err.response.data.errors; //server-end doesn't return msg
			setErrorMsg('Logging in failed. Try again.');
			setTimeout(() => {
				setErrorMsg('');
			}, 4000);
		}
		return null;
	};

	useEffect(() => {
		if (asyncStart) {
			loginRegister(name, email, password, loginActive).then((res) => {
				if (res) {
					authContext.handleLogin(res.data);
				} else {
					console.log('error: fetching user data failed.');
				}
			});
			setAsyncStart(false);
		}
	}, [asyncStart]);

	return (
		<div>
			{authContext.isAuthenticated ? (
				''
			) : (
				<Button id="login_button" onClick={() => setDialogOpen(true)} {...props}>
					Get Started
				</Button>
			)}
			<Dialog style={style.dialog} open={dialogOpen}>
				<AppBar style={style.appBar} position="static" color="default">
					<Tabs
						value={value}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
						onChange={handleChange}
					>
						<Tab label="login" onClick={() => setLoginActive(true)} />
						<Tab label="register" onClick={() => setLoginActive(false)} />
					</Tabs>
				</AppBar>
				<form style={style.formStyle}>
					<p style={style.error}>{errorMsg}</p>
					<TextField
						style={loginActive ? style.hidden : style.textField}
						id="standard-basic-name"
						label="Name"
						name="name"
						value={name}
						onChange={(e) => onChange(e)}
					/>
					<TextField
						style={style.textField}
						id="standard-basic-email"
						label="Email"
						name="email"
						value={email}
						onChange={(e) => onChange(e)}
					/>
					<TextField
						style={style.textField}
						id="standard-password-input"
						type={showPassword ? 'text' : 'password'}
						label="Password"
						name="password"
						value={password}
						onChange={(e) => onChange(e)}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
				</form>
				<DialogActions>
					<Button
						id="login_submit_button"
						fullWidth
						onClick={onSubmitForm}
						variant="contained"
						color="primary"
					>
						{loginActive ? 'Login' : 'Register'}
					</Button>
					<Button fullWidth onClick={() => setDialogOpen(false)} color="primary">
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
