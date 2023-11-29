import axios from 'axios'

export const getAllEvents = () => {
    return axios.get('http://localhost:8000/event/api/v1/event/')
}