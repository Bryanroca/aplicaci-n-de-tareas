import React from 'react';
import { useNavigate } from 'react-router-dom';

export function EventCard({ event }) {
    const navigate = useNavigate();


    return (
        <div key={event.id} style={{ background: 'black', cursor: 'pointer' }} onClick={() => {
            navigate(`/events/${event.id}`)
        }}>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <hr />
        </div>
    );
}
