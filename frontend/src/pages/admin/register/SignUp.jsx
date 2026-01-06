import React from 'react';
// import styles from './register.module.css';
import { signUpAdmin } from '../../../api/adminApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setName,
  setEmail,
  setPassword,
  setError,
} from '../../../redux/slices/authSlice';

const SignUp = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await signUpAdmin(auth.name, auth.email, auth.password);
      if (!data) throw new Error('Sign up failed');
      navigate('/signin');
    } catch (error) {
      console.error('Signup failed', error);
      dispatch(setError('Err msg', error));
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
            <label htmlFor="name" className="">
              Name:
            </label>
            <input
              type="text"
              className=""
              value={auth.name}
              onChange={(e) => dispatch(setName(e.target.value))}
              required
            />
          </div>
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
            Sign Up
          </button>

          <a onClick={() => navigate('/signin')} className="">
            Sign in
          </a>
        </form>
        {auth.error && <p className="">{auth.error}</p>};
      </main>
    </div>
  );
};

export default SignUp;
