// src/components/IncidentList.js
import React, { useEffect, useState } from "react";
import { getIncidents, deleteIncident } from "../api";

export default function IncidentList({ onEdit }) {
    const [incidents, setIncidents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const fetchIncidents = async () => {
            const recordsData = await getIncidents(currentPage, pageSize);
            setIncidents(recordsData.records || []);
            setTotalPages(recordsData.pages || 1);
        };
        fetchIncidents();
    }, [currentPage, pageSize]);

    const handleDelete = async (id) => {
        const success = await deleteIncident(id);
        if (success) {
            // Update incidents list after successful deletion
            setIncidents(incidents.filter((incident) => incident.id !== id));
        } else {
            alert("Failed to delete incident");
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <h2>Incident List</h2>
            {incidents.length > 0 ? (
                incidents.map((incident) => (
                    <div key={incident.id}>
                        <p>{incident.description} - {incident.status}</p>
                        <button onClick={() => onEdit(incident)}>Edit</button>
                        <button onClick={() => handleDelete(incident.id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No incidents available.</p>
            )}

            {/* Pagination Controls */}
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}
