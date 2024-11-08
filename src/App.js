// src/App.js
import React, { useState } from 'react';
import IncidentList from './components/IncidentList';
import IncidentForm from './components/IncidentForm';

function App() {
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleEdit = (incident) => {
        setSelectedIncident(incident);
    };

    const handleSave = () => {
        setSelectedIncident(null);
        setRefresh(!refresh); // Toggle refresh state to reload IncidentList
    };

    return (
        <div>
            <h1>Incident Management</h1>
            <IncidentForm selectedIncident={selectedIncident} onSave={handleSave} />
            <IncidentList onEdit={handleEdit} refresh={refresh} />
        </div>
    );
}

export default App;
