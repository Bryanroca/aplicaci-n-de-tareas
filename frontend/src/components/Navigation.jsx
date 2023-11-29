import { Link } from "react-router-dom"

export function Navigation() {
    return (
        <div>
            <Link to="events">

                <h1>Aplicacion de eventos</h1>
            </Link>
            <Link to="/events-create">Crear tarea</Link >
        </div>
    )
}

