import React from 'react'

export function EventCard({ event }) {
    return (
        <div key={event.id}>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <hr />
        </div>
    )
}

