import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabse/supabaseClient';

const SignIn = () => {
  console.log(motion)
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');

  const handleLogIn = async (e) => {
    e.preventDefault();

    if (email.trim() && password.trim()) {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error('Error signing in', error.message);
        setLoading(false)
        return;
      }
      toast.success('User successfully logged in ✅');
      setEmail('');
      setPassword('');
      setLoading(false);
    }else {
      toast.error('Error logging in');
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-row w--full h-screen">
      {/* Sign In form  */}
      <div className="relative bg-[#000000d3] w-full lg:w-[50%] flex flex-col items-center justify-center">
        <div
          className="lg:hidden absolute inset-0 w-full h-full"
          style={{ backgroundImage: 'url(/auth-img.jpg)' }}
        />

        <div className="lg:hidden bg-linear-to-b from-black/40 via-black/70 to-black absolute inset-0" />

        <div className="relative text-white w-[90%] lg:w-[60%] border border-white p-4 md:p-6 rounded-2xl flex flex-col gap-5">
          <h1 className="text-center font-medium text-xl md:text-2xl">
            SIgn In
          </h1>
          <fieldset className="border border-[#ffffff76] rounded-xl text-sm">
            <legend>Email *</legend>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 w-full outline-none"
            />
          </fieldset>
          <fieldset className="border border-[#ffffff76] rounded-xl text-sm">
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
            onClick={!loading ? handleLogIn : null}
            className="text-white font-medium p-2 bg-amber-500 rounded-xl cursor-pointer hover:bg-amber-600"
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
                className="w-6 h-2 p-2 rounded-full border-t-2 border-r-2 border-[white] place-self-center"
              />
            ) : (
              'Sign Up'
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

      {/* ABout form */}
      <div className="relative hidden w-[50%] lg:flex flex-col items-center justify-center">
        <div
          className="absolute inset-0 w-full h-full bg-cover "
          style={{ backgroundImage: 'url(/auth-img.jpg)' }}
        />

        <div className="bg-linear-to-b from-black/40 via-black/60 to-black absolute inset-0" />

        <motion.div
          className="relative text-white text-xl flex flex-col gap-5"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: 'easeOut',
            repeatDelay: 6,
            repeat: 10,
          }}
        >
          <motion.h1
            className="font-medium text-6xl text-amber-400"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: 'easeIn' }}
          >
            M&K Clothing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15, letterSpacing: 1.8 }}
            animate={{ opacity: 1, y: 0, letterSpacing: 1.5 }}
            transition={{ delay: 0.25, duration: 0.8 }}
          >
            We create professional dresses designed to inspire confidence,{' '}
            <br />
            elevate your style, and support you in every step of your <br />
            journey toward success.
          </motion.p>

          <motion.a
            href=""
            className="text-lg underline hover:decoration-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Visit site
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
