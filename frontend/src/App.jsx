import React, { useEffect, useState } from 'react';
// import './styles/variable.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { supabase } from './supabse/supabaseClient.js';

import MainRoutes from './routes/MainRoutes.jsx';

import Home from './pages/user/home/Home.jsx';
import About from './pages/user/about/About.jsx';
import Collection from './pages/user/collection/Collection.jsx';
import Contact from './pages/user/contact/Contact.jsx';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log('The sessions', currentSession.data);
    setSession(currentSession.data.session);
    setLoading(false);
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      fetchSession();
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null;

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
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <MainRoutes session={session} />
      </BrowserRouter>
    </>
  );
}

export default App;
