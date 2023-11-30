import React, { useState, useEffect } from 'react';
import { getAllEvents } from '../api/events.api';
import { EventCard } from './EventCard';

export function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const res = await getAllEvents();
                setEvents(res.data);
            } catch (error) {
                console.error('Error loading events:', error);
            }
        };

        loadEvents();
    }, []);

    return (
        <div>
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
}
