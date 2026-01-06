import React, { useEffect } from 'react';
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
    <div className="flex flex-row ">
      <NavBar />  

      <div className=" w-full p-8">
        <header className="flex flex-col gap-5 p-2 md:p-3 lg:p-4 rounded-3xl bg-[#80808021] border-r-red-600 border-l-red-600 border-r-8 border-l-8">
          <h2 className='text-lg lg:text-xl font-medium text-amber-600'>Welcome to dashboard</h2>
          <p className="">{analytics.message}</p>
        </header>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
