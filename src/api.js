// src/api.js
const BASE_URL = "http://localhost:8080/api/incidents";

export async function createIncident(data) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result.data; // Returns the new incident ID
}

export async function getIncidents(page = 1, size = 10) {
  const response = await fetch(`${BASE_URL}?pageNum=${page}&pageSize=${size}`);
  const result = await response.json();
  return result.data; // { records: [...], total, size, current, pages }
}

export async function getIncidentById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  const result = await response.json();
  return result.data;
}

export async function updateIncident(id, data) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result.data; // Returns true if successful
}

export async function deleteIncident(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  return result.data; // Returns true if successful
}
