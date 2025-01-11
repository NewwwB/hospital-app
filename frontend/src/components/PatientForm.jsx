import React, { useState } from 'react';
import api from '../api';

const PatientForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        contactInfo: '',
        emergencyContact: '',
        diseases: '',
        allergies: '',
        roomNumber: '',
        bedNumber: '',
        floorNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert form data to correct types before submitting
        const formToSend = {
            name: formData.name,
            age: parseInt(formData.age, 10),  // Convert age to integer
            gender: formData.gender,
            contactInfo: formData.contactInfo,
            emergencyContact: formData.emergencyContact,
            diseases: formData.diseases,
            allergies: formData.allergies,
            roomNumber: parseInt(formData.roomNumber, 10),  // Convert room number to integer
            bedNumber: parseInt(formData.bedNumber, 10),    // Convert bed number to integer
            floorNumber: parseInt(formData.floorNumber, 10) // Convert floor number to integer
        };

        // Check if any numeric fields are invalid (NaN) and show an alert
        if (isNaN(formToSend.age) || isNaN(formToSend.roomNumber) || isNaN(formToSend.bedNumber) || isNaN(formToSend.floorNumber)) {
            alert('Please ensure that age, room number, bed number, and floor number are valid numbers.');
            return;
        }

        try {
            const response = await api.post('/patients', formToSend);
            alert('Patient added successfully!');
            setFormData({
                name: '',
                age: '',
                gender: '',
                contactInfo: '',
                emergencyContact: '',
                diseases: '',
                allergies: '',
                roomNumber: '',
                bedNumber: '',
                floorNumber: '',
            });
        } catch (error) {
            console.error(error);
            alert('Failed to add patient.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Patient</h2>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} required />
            <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} required />
            <input name="contactInfo" placeholder="Contact Info" value={formData.contactInfo} onChange={handleChange} required />
            <input name="emergencyContact" placeholder="Emergency Contact" value={formData.emergencyContact} onChange={handleChange} required />
            <input name="diseases" placeholder="Diseases" value={formData.diseases} onChange={handleChange} />
            <input name="allergies" placeholder="Allergies" value={formData.allergies} onChange={handleChange} />
            <input name="roomNumber" type="number" placeholder="Room Number" value={formData.roomNumber} onChange={handleChange} required />
            <input name="bedNumber" type="number" placeholder="Bed Number" value={formData.bedNumber} onChange={handleChange} required />
            <input name="floorNumber" type="number" placeholder="Floor Number" value={formData.floorNumber} onChange={handleChange} required />
            <button type="submit">Add Patient</button>
        </form>
    );
};

export default PatientForm;
