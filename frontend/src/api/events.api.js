import axios from 'axios';

const eventsApi = axios.create({ baseURL: 'http://localhost:8000/event/api/v1/event/' });

export const getAllEvents = () => eventsApi.get('/');
export const createEvent = (event) => eventsApi.post('/', event);
