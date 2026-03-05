import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { supabase } from '../../../supabse/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // console.log(motion);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (name.trim() && email.trim() && password.trim()) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error("Couldn't sign up", error.message);
        setLoading(false);
        return;
      }
      toast.success('User successfully Sign up ✅');
      setEmail('');
      setPassword('');
      setName('');
      setLoading(false);
      navigate('/signin');
    } else {
      toast.error('invalid input');
      setLoading(false);
      return;
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Sign Up form  */}

      <div 
        style={{ backgroundImage: "url('auth-img.jpg')"}}
        className='absolute inset-0 w-full h-full'/>

        <div className="absolute inset-0 bg-black/60 w-full h-full backdrop-blur-md" />

      <div className="relative bg-[#e8dada11] w-full h-full flex flex-col items-center justify-center">
        <div className="relative text-white  w-[90%] md:w-120  border border-white/40 p-4 md:p-6 rounded-2xl flex flex-col gap-5">
          <h1 className="text-center font-medium text-xl md:text-2xl">
            SIgn Up
          </h1>
          <fieldset className="border border-[#f8f2f276] rounded-xl text-sm">
            <legend>Name *</legend>
            <input
              type="text"
              className="p-2 w-full outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </fieldset>
          <fieldset className="border border-[#fdf3f376] rounded-xl text-sm">
            <legend>Email *</legend>
            <input
              type="email"
              className="p-2 w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="border border-[#f8f3f376] rounded-xl text-sm">
            <legend>Password *</legend>
            <input
              type="password"
              className="p-2 w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <button
            onClick={!loading ? handleSignup : null}
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
              'Sign Up'
            )}
          </button>
          <p className="text-center font-light text-sm">
            <span>Already have an account? </span>
            <span>
              <a
                href=""
                onClick={() => navigate('/signin')}
                className="underline hover:decoration-0 cursor-pointer"
              >
                Sign In
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
