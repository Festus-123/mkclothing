import React from 'react';
// import styles from './register.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logInAdmin } from '../../../api/adminApi';
import {
  setEmail,
  setPassword,
  setError,
} from '../../../redux/slices/authSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await logInAdmin(auth.email, auth.password);
      if (data) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      dispatch(setError('Err msg', error.message));
    }
  };
  return (
    <div className="">
      <header className="">
        <h1>Admin Use Only</h1>
      </header>

      <main className="">
        <h1>Sign In to Admin</h1>
        <form className="" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="email" className="">
              Email:
            </label>
            <input
              type="email"
              className=""
              value={auth.email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              required
            />
          </div>
          <div className="">
            <label htmlFor="password" className="">
              Password:
            </label>
            <input
              type="password"
              className=""
              value={auth.password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              required
            />
          </div>
          <button type="submit" className="">
            Sign In
          </button>
        </form>
        {auth.error && <p className="">{auth.error}</p>};
      </main>
    </div>
  );
};

export default SignIn;
