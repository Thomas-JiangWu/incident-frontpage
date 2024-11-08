// src/App.js
import React, { useState } from "react";
import IncidentList from "./components/IncidentList";
import IncidentForm from "./components/IncidentForm";

export default function App() {
  const [editingIncident, setEditingIncident] = useState(null);
  const [reload, setReload] = useState(false); // State to trigger reloading the list

  const handleEdit = (incident) => {
    setEditingIncident(incident);
  };

  const handleSave = () => {
    setEditingIncident(null);
    setReload(!reload); // Toggle reload state to refresh the list
  };

  return (
      <div className="App">
        <h1>Incident Management</h1>
        <IncidentForm
            incident={editingIncident}
            onSave={handleSave}
            onCancel={() => setEditingIncident(null)}
        />
        <IncidentList onEdit={handleEdit} key={reload} />
      </div>
  );
}
