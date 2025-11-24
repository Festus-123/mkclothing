import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../../api/adminApi';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../../redux/slices/analyticsSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const analytics = useSelector((state) => state.analytics);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/signin');
        return;
      }

      try {
        const data = await getDashboard(token);
        if (!data) throw new Error('No data received');
        dispatch(setMessage(data.message));
      } catch (error) {
        console.error(error);
        navigate('/signin');
      }
    };
    fetchDashboard();
  }, [navigate]);

  return (
    <div>
      <h2>Welcome to dashboard</h2>
      <p>{analytics.message}</p>
    </div>
  );
};

export default Dashboard;
