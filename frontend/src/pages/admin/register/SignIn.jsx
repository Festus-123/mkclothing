import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabse/supabaseClient';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');

  // console.log(motion)

  const handleLogIn = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (email.trim() && password.trim()) {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error('Error signing in', error.message);
        setLoading(false);
        return;
      }
      toast.success('User successfully logged in ✅');
      setEmail('');
      setPassword('');
      setLoading(false);
      navigate('/dashboard');
    } else {
      toast.error('Error logging in');
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen">
      {/* Sign In form  */}
      <div className="bg-[#ede0e022] w-full h-full flex flex-col items-center justify-center">
        <div className="w-100 md:w-120 border border-black/0 p-4 md:p-6 rounded-2xl flex flex-col gap-5">
          <h1 className="text-center font-medium text-xl md:text-2xl">
            SIgn In
          </h1>
          <fieldset className="border border-[#08080876] rounded-xl text-sm">
            <legend>Email *</legend>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 w-full outline-none"
            />
          </fieldset>
          <fieldset className="border border-[#05050576] rounded-xl text-sm">
            <legend>Password *</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 w-full outline-none"
            />
          </fieldset>
          <a
            href=""
            className="text-center underline cursor-pointer hover:decoration-0"
          >
            forgot password?
          </a>
          <button
            disabled={loading}
            onClick={handleLogIn}
            className="text-white font-medium p-2 bg-amber-400 rounded-xl cursor-pointer hover:bg-amber-500"
          >
            {loading ? (
              <motion.fieldset
                initial={{}}
                animate={{ rotate: '360deg' }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="w-6 h-2 p-3 rounded-full border-t-2 border-r-2 border-[white] place-self-center"
              />
            ) : (
              'Sign In'
            )}
          </button>
          <p className="text-center font-light text-sm">
            <span>Don't have an account? </span>
            <span>
              <a
                href=""
                onClick={() => navigate('/signup')}
                className="underline hover:decoration-0 cursor-pointer"
              >
                Sign Up
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
