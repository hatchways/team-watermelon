import React, { useEffect, useState } from 'react';
import Login from './login.js';
import Register from './register.js';

export default function LoginRegisterModal() {
	return (
		<div>
			<Login />
			<Register />
		</div>
	);
}
