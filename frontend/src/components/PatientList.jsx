import React, { useEffect, useState } from 'react';
import api from '../api';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await api.get('/patients');
                setPatients(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPatients();
    }, []);

    return (
        <div>
            <h2>Patients List</h2>
            {patients.length > 0 ? (
                <ul>
                    {patients.map((patient) => (
                        <li key={patient.id}>
                            {patient.name} - {patient.roomNumber}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No patients found.</p>
            )}
        </div>
    );
};

export default PatientList;
