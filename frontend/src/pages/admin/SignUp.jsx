import React from 'react';
import { signUpAdmin } from '../../api/adminApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setName,
  setEmail,
  setPassword,
  setError,
} from '../../redux/slices/authSlice';

const SignUp = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const data = await signUpAdmin(auth.name, auth.email, auth.password);
        if(!data) throw new Error('Sign up failed');
        navigate('/signin');
    } catch (error) {
        console.error("Signup failed", error)
        dispatch(setError("Err msg", error.message));
    }
  }
  return (
    <div>
      <header className="login-header">
        <h1>Admin Use Only</h1>
      </header>

      <main>
        <h1>Sign In to Admin</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="label">
              Name:
            </label>
            <input
              type="text"
              className="input"
              value={auth.name}
              onChange={(e) => dispatch(setName(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label">
              Email:
            </label>
            <input
              type="email"
              className="input"
              value={auth.email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">
              Password:
            </label>
            <input
              type="password"
              className="input"
              value={auth.password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        {auth.error && <p className="error-message">{auth.error}</p>};
      </main>
    </div>
  );
};

export default SignUp;
