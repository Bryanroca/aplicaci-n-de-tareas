import { BrowserRouter, Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { EventsPage } from "./pages/EventsPage";
import { EventFormPage } from './pages/EventFormPage';
import { Navigation } from './components/Navigation'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <div className='container mx-auto'>
        <Navigation />
        <Routes>
          <Route path="/" element={<> <Navigate to="/events" /></>} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events-create" element={<EventFormPage />} />
          <Route path="/events/:id" element={<EventFormPage />} />
        </Routes>
        <Toaster />

      </div>
    </BrowserRouter>
  );
}

export default App;
