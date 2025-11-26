import React from 'react';
import styles from './register.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logInAdmin } from '../../../api/adminApi';
import { setEmail, setPassword, setError } from '../../../redux/slices/authSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await logInAdmin(auth.email, auth.password);
      if (data) {
        localStorage.setItem('adminToken', data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      dispatch(setError('Err msg', error.message));
    }
  };
  return (
    <div className={styles.container}>
      <header className={styles['login-header']}>
        <h1>Admin Use Only</h1>
      </header>

      <main className={styles.main}>
        <h1>Sign In to Admin</h1>
        <form className={styles.Register} onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              className={styles.input}
              value={auth.email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              type="password"
              className={styles.input}
              value={auth.password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              required
            />
          </div>
          <button type="submit" className={styles['login-button']}>
            Sign In
          </button>
        </form>
        {auth.error && <p className={styles['error-message']}>{auth.error}</p>};
      </main>
    </div>
  );
};

export default SignIn;
