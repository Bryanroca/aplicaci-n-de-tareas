import React from "react";
import { Link } from "react-router-dom";

export function Navigation() {
    return (
        <div className="flex justify-between py-3">
            <button className="cursor-pointer">
                <Link to="/events">
                    <h1 className="font-bold text-3xl mb-4">Aplicación de eventos</h1>
                </Link>
            </button>
            <button className="bg-indigo-500 px-3 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition duration-300 ease-in-out">
                <Link to="/events-create">Crear tarea</Link>
            </button>
        </div>
    );
}
