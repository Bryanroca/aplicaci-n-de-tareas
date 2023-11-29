import React, { useState, useEffect } from 'react';
import { getAllEvents } from '../api/events.api';

export function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function loadEvents() {
            const res = await getAllEvents();
            setEvents(res.data);
        }
        loadEvents();
    }, []);

    return (
        <div>
            {events.map((event) => (
                <div>
                    <h1>{event.title}</h1>
                    <h2>{event.description}</h2>
                </div>
            ))}
        </div>
    );
}
