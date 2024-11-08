// src/components/IncidentForm.js
import React, { useState, useEffect } from "react";
import { createIncident, updateIncident } from "../api";

export default function IncidentForm({ incident, onSave, onCancel }) {
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("PENDING");

    useEffect(() => {
        if (incident) {
            setDescription(incident.description);
            setStatus(incident.status);
        }
    }, [incident]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { description, status };

        if (incident) {
            const success = await updateIncident(incident.id, data);
            if (success) onSave();
        } else {
            const newIncidentId = await createIncident(data);
            if (newIncidentId) onSave();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{incident ? "Edit Incident" : "Create Incident"}</h2>
            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Status:
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="PENDING">PENDING</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="CLOSED">CLOSED</option>
                </select>
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
}
