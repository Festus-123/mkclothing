import React, { useEffect, useState } from 'react';
// import './styles/variable.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { supabase } from './supabse/supabaseClient.js';

import MainRoutes from './routes/MainRoutes.jsx';
// import Placeholder from './components/admin/Placeholder.jsx';


function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true);


  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession()
    console.log("The sessions",currentSession.data)
    setSession(currentSession.data.session);
    setLoading(false);
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

  if (loading) return null;


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
        <MainRoutes session={session}/>
      </BrowserRouter>
    </>
  );
}

export default App;
