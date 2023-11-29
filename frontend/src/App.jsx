import { BrowserRouter, Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { EventsPage } from "./pages/EventsPage";
import { EventFormPage } from './pages/EventFormPage';
import { Navigation } from './components/Navigation'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<> <Navigate to="/events" replace={true} /></>} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events-create" element={<EventFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
