import React from 'react';
import { useNavigate } from 'react-router-dom';

export function EventCard({ event }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/events/${event.id}`);
    };

    return (
        <div
            className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
            onClick={handleClick}
        >
            <h1 className="text-white text-xl font-bold uppercase mb-2">{event.title}</h1>
            <p className="text-gray-300 mb-1">{event.description}</p>
            <p className="text-gray-300">{event.date}</p>
            <p className="text-gray-300">{event.ubication}</p>
            <hr className="border-gray-500 my-2" />
        </div>
    );
}
