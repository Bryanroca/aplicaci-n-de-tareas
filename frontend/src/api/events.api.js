import axios from 'axios';

const eventsApi = axios.create({ baseURL: 'http://localhost:8000/event/api/v1/event/' });

export const getAllEvents = () => eventsApi.get('/');
export const getEvent = (id) => eventsApi.get(`/${id}/`)
export const createEvent = (event) => eventsApi.post('/', event);
export const DeleteEvent = (id) => eventsApi.delete(`/${id}`)
export const updateEvent = (id, event) => eventsApi.put(`/${id}/`, event)