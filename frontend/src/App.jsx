import React, { useEffect, useState } from 'react';
// import './styles/variable.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { supabase } from './supabse/supabaseClient.js';

import ProtectedRoute from './routes/ProtectedRoute.jsx';
import MainRoutes from './routes/MainRoutes.jsx';
import AdminRoutes from './routes/AdminRoutes.jsx';


function App() {
  const [session, setSession] = useState(null)
  // const location = useLocation();
  // const state = location.state;

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession()
    console.log("The sessions",currentSession.data)
    setSession(currentSession.data.session);
  }
  

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [])

  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            borderRadius: '10px',
            padding: '14px',
          },
        }}
      />
      <BrowserRouter>
        { session ? ( <AdminRoutes />) : ( <ProtectedRoute />)}
        <MainRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
