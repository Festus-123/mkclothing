import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import styles from './ReviewsChart.module.css';
import { useSelector } from "react-redux";

const ReviewsChart = () => {
  const { reviews, loading } = useSelector((state) => state.analytics);

  if (loading) return <p>Loading reviews...</p>;

const totalStars = reviews.reduce(
  (sum, item) => sum + item.stars * item.count,
  0
);

const totalReviews = reviews.reduce(
  (sum, item) => sum + item.count,
  0
);

const averageRating = totalReviews > 0
  ? (totalStars / totalReviews).toFixed(1)
  : 0;


  const data = (reviews || []).map((item) => ({
    name: `${item.stars}★`,
    count: item.count,
  }));

  return (
    <div className = {styles.container}>
      <h3 style={{ marginBottom: "10px", color: 'brown' }}>Review Ratings</h3>

      <ResponsiveContainer width="70%" height="80%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false}/>
          <Tooltip />
          <Bar dataKey="count" fill='#81451873' radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className={styles.totalStats}>
        <p className={styles.readings}>Average: ⭐{averageRating}</p>
        <p className={styles.readings}>Total Reviews {totalReviews}</p>
        <button className={styles.readReviewsBtn}>Read reviews</button>
      </div>
    </div>
  );
};

export default ReviewsChart;
