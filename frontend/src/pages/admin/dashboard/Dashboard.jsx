import React, { useEffect } from 'react';
import styles from './Dashboard.module.css';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../../../api/adminApi';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../../../redux/slices/analyticsSlice';

import NavBar from '../../../components/admin/sideBar/NavBar';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const analytics = useSelector((state) => state.analytics);
  const isCollapsed= useSelector((state) => state.navbar.isCollapsed)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
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
    <div className={styles.container}>
      <NavBar />

      <div className={`${styles.dashboardMain} ${
        isCollapsed ? styles.collapsedNavBar : ''
      }`}>
        <header className={styles.dashboardHeader}>
          <h2>Welcome to dashboard</h2>
          <p className={styles.message}>{analytics.message}</p>
        </header>

        <Outlet />

      </div>
    </div>
  );
};

export default Dashboard;
