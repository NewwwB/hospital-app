import React, { useState } from 'react';
import api from '../api';
import {useAuth} from '../context/AuthContext.jsx';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', { email, password });
            const { token, role } = response.data;
            login(token, role);
            alert('Logged in successfully!');
        } catch (error) {
            console.error(error);
            alert('Invalid credentials!');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
