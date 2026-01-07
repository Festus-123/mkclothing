import React from 'react';
import { useNavigate } from 'react-router-dom';
// import styles from './404page.module.css';

const PageError = () => {
  const navigate = useNavigate();


  return (
    <div className="">
        <button onClick={() => navigate('/home')} className="">Go back</button>
    </div>
  );
};

export default PageError;
