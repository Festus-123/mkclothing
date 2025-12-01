import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import styles from './InteractionsChart.module.css'
import { useSelector } from "react-redux";

const InteractionsChart = () => {
  const { interactions } = useSelector((state) => state.analytics);


  const totalLikes = interactions.reduce((sum, next) => sum + next.favorites, 0)
  const totalOrders = interactions.reduce((sum, next) => sum + next.orders, 0)

  const data = interactions.map((item) => ({
    name: item.date,
    favorites: item.favorites,
    orders: item.orders,
  }));

  return (
    <div className={styles.container}>
      <h3 style={{
        color: "brown"
      }}>Daily Interactions</h3>

      <ResponsiveContainer width="100%" height="82%">
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />

          <Line type="monotone" dataKey="favorites" stroke="#ff0066" strokeWidth={2} />
          <Line type="monotone" dataKey="orders" stroke="#0066ff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

        <div className={styles.totalStats}>
            <p className={styles.readings}> Total likes: ❤️ {totalLikes }</p>
            <p className={styles.readings}> Total orders: {totalOrders}</p>
        </div>
    </div>
  );
};

export default InteractionsChart