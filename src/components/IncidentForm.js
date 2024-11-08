// src/components/IncidentForm.js
import React, { useState, useEffect } from 'react';
import { createIncident, updateIncident } from '../api';

export default function IncidentForm({ selectedIncident, onSave }) {
    const [incident, setIncident] = useState({
        reporter: '',
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Low',
    });

    useEffect(() => {
        if (selectedIncident) {
            setIncident(selectedIncident);
        }
    }, [selectedIncident]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncident((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (incident.id) {
            await updateIncident(incident.id, incident);
        } else {
            await createIncident(incident);
        }
        onSave();
        setIncident({ reporter: '', title: '', description: '', status: 'Pending', priority: 'Low' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="reporter" value={incident.reporter} onChange={handleChange} placeholder="Reporter" />
            <input type="text" name="title" value={incident.title} onChange={handleChange} placeholder="Title" />
            <textarea name="description" value={incident.description} onChange={handleChange} placeholder="Description" />
            <select name="status" value={incident.status} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Resolved">Resolved</option>
            </select>
            <select name="priority" value={incident.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button type="submit">Save</button>
        </form>
    );
}
