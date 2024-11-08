// src/api.js
import axios from 'axios';

const API_URL = "http://localhost:8080/api/incidents";

export const createIncident = async (incident) => {
  const response = await axios.post(API_URL, incident);
  return response.data;
};

export const getIncidents = async (pageNum, pageSize, status, priority) => {
  const response = await axios.get(API_URL, {
    params: { pageNum, pageSize, status, priority },
  });
  return response.data.data;
};

export const getIncident = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.data;
};

export const updateIncident = async (id, incident) => {
  const response = await axios.put(`${API_URL}/${id}`, incident);
  return response.data;
};

export const deleteIncident = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
