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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );

}
