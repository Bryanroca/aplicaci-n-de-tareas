import React from 'react';
import { useNavigate } from 'react-router-dom';

export function EventCard({ event }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/events/${event.id}`);
    };

    return (
        <div
            className="bg-gray-800 p-4 hover:bg-gray-700 cursor-pointer transition duration-300 ease-in-out"
            onClick={handleClick}
        >
            <h1 className="text-white text-2xl font-bold uppercase mb-2">{event.title}</h1>
            <p className="text-gray-300 mb-2">{event.description}</p>
            <div className="flex items-center justify-between">
                <p className="text-gray-300">{event.date}</p>
                <p className="text-gray-300">{event.ubication}</p>
            </div>
            <hr className="border-gray-500 my-2" />
        </div>
    );
};

