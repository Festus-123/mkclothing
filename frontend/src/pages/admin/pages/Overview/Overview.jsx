import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalyticsData } from '../../../../redux/slices/analyticsSlice';
import styles from './Overview.module.css';
import ReviewsChart from '../../../../components/admin/reviews/ReviewsChart';
import InteractionsChart from '../../../../components/admin/interactions/InteractionsChart';

const Overview = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalyticsData());
    console.log('completed fetch');
  }, [dispatch]);

  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p>Error loading analytics {error}</p>;

  return (
    <div>
        <h2
          style={{
            margin: '20px',
          }}
        >
          Analytics
        </h2>
      <div className={styles.chatSection}>

        <ReviewsChart />
        <InteractionsChart />
      </div>
    </div>
  );
};

export default Overview;
