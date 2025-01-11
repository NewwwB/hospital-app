import React, { useState } from 'react';
import api from '../api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/register', { email, password, role });
            if(response.status > 200 && response.status <300) alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert('something went wrong!');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
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
            <label htmlFor="roles">Choose a role:</label>
            <select required name="roles" id="roles" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="" disabled>Select a role</option>
                <option value="manager">Manager</option>
                <option value="pantry">Pantry</option>
                <option value="delivery">Delivery</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default Login;
