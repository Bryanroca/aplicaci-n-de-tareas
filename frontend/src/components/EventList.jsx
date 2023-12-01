import React, { useState, useEffect } from 'react';
import { getAllEvents } from '../api/events.api';
import { EventCard } from './EventCard';

export function EventList() {
    const [events, setEvents] = useState([]);

    const loadEvents = async () => {
        try {
            const res = await getAllEvents();
            setEvents(res.data);
        } catch (error) {
            console.error('Error loading events:', error);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    return (
        <div className="grid grid-cols-3 gap-3">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );

}
