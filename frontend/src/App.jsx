import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import MainRoutes from './routes/MainRoutes.jsx';
// Import the CartProvider you just created
import { CartProvider } from '../src/context/CartContext.jsx'; 

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
        {/* Wrap your routes inside the CartProvider */}
        <CartProvider>
          <MainRoutes />
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;