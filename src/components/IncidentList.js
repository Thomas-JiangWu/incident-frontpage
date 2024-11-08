// src/components/IncidentList.js
import React, { useEffect, useState } from 'react';
import { getIncidents, deleteIncident } from '../api';

export default function IncidentList({ onEdit, refresh }) {
    const [incidents, setIncidents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({ status: '', priority: '' });

    const fetchIncidents = async () => {
        const data = await getIncidents(currentPage, 10, filters.status, filters.priority);
        setIncidents(data.records);
        setTotalPages(data.pages);
    };

    useEffect(() => {
        fetchIncidents();
    }, [currentPage, filters, refresh]);

    const handleDelete = async (id) => {
        await deleteIncident(id);
        fetchIncidents();
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
        setCurrentPage(1);
    };

    return (
        <div>
            <h2>Incident List</h2>
            <div>
                <label>Status:</label>
                <select name="status" value={filters.status} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Resolved">Resolved</option>
                </select>
                <label>Priority:</label>
                <select name="priority" value={filters.priority} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Reporter</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Created Time</th>
                    <th>Modified Time</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {incidents.map((incident) => (
                    <tr key={incident.id}>
                        <td>{incident.id}</td>
                        <td>{incident.reporter}</td>
                        <td>{incident.title}</td>
                        <td>{incident.description}</td>
                        <td>{incident.status}</td>
                        <td>{incident.priority}</td>
                        <td>{incident.createdTime}</td>
                        <td>{incident.modifiedTime}</td>
                        <td>
                            <button onClick={() => onEdit(incident)}>Edit</button>
                            <button onClick={() => handleDelete(incident.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}
