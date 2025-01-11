// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PatientForm from './components/PatientForm.jsx';
import PatientList from './components/PatientList.jsx';
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";

const App = () => {
    return (
        <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route
                        path="/add-patient"
                        element={
                            <ProtectedRoute requiredRole="manager">
                                <PatientForm />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/patients"
                        element={
                            <ProtectedRoute>
                                <PatientList />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
        </AuthProvider>
    );
};

export default App;
