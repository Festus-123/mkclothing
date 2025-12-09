import React from 'react';
import { useEffect,} from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setAuthorized } from '../redux/slices/authSlice';
import { getDashboard } from '../api/adminApi';

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await getDashboard(); // fetch with cookies
        if (data) dispatch(setAuthorized(true));
      } catch (error) {
        dispatch(setAuthorized(false));
        console.error('Authorization failed:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    verifyAuth();
  }, []);

  if (auth.loading) return <p style={{ margin: 20}}>Checking authentication...</p>;
  return auth.authorized ? children : <Navigate to="/signin" replace />;
}
