import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import MainRoutes from './routes/MainRoutes.jsx';

function App() {

  return (
    <>
      <Toaster
        position="top-right"
        closeButton
        toastOptions={{
          style: {
            borderRadius: '10px',
            padding: '10px',
          },
        }}
      />
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
