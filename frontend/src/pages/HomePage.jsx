import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Hospital Management</h1>
            <Link to="/add-patient">Add Patient</Link>
            <br />
            <Link to="/patients">View Patients</Link>
            <br />
            <Link to="/login">Login</Link>
            <br />
            <Link to="/logout">Logout</Link>
            <br />
            <Link to="/register">Register</Link>
        </div>
    );
};

export default HomePage;
