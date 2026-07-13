// import React, { useState } from 'react';
// // eslint-disable-next-line no-unused-vars
// import { motion } from 'motion/react';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../../supabse/supabaseClient';

// const SignIn = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState('');

//   // console.log(motion)

//   const handleLogIn = async (e) => {
//     e.preventDefault();
//     if (loading) return;

//     if (email.trim() && password.trim()) {
//       setLoading(true);
//       const { error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
//       if (error) {
//         console.error('Error signing in', error.message);
//         setLoading(false);
//         return;
//       }
//       toast.success('User successfully logged in ✅');
//       setEmail('');
//       setPassword('');
//       setLoading(false);
//       navigate('/dashboard');
//     } else {
//       toast.error('Error logging in');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative w-full h-screen">
//       {/* Sign In form  */}

//       <div
//         style={{ backgroundImage: "url('auth-img.jpg')" }}
//         className="absolute inset-0 w-full h-full"
//       />

//       <div className="absolute inset-0 bg-black/60 w-full h-full backdrop-blur-md" />

//       <div className="relative bg-[#ede0e022] w-full h-full flex flex-col items-center justify-center">
//         <div className="w-[90%] md:w-120 text-white border border-white/40 p-4 md:p-6 rounded-2xl flex flex-col gap-5">
//           <h1 className="text-center font-medium text-xl md:text-2xl">
//             SIgn In
//           </h1>
//           <fieldset className="border border-[#f8f2f276] rounded-xl text-sm">
//             <legend>Email *</legend>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="p-2 w-full outline-none"
//             />
//           </fieldset>
//           <fieldset className="border border-[#f8f3f376] rounded-xl text-sm">
//             <legend>Password *</legend>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="p-2 w-full outline-none"
//             />
//           </fieldset>
//           <a
//             href=""
//             className="text-center underline cursor-pointer hover:decoration-0"
//           >
//             forgot password?
//           </a>
//           <button
//             disabled={loading}
//             onClick={handleLogIn}
//             className="text-white font-medium p-2 bg-amber-400 rounded-xl cursor-pointer hover:bg-amber-500"
//           >
//             {loading ? (
//               <motion.fieldset
//                 initial={{}}
//                 animate={{ rotate: '360deg' }}
//                 transition={{
//                   duration: 0.8,
//                   repeat: Infinity,
//                   ease: 'linear',
//                 }}
//                 className="w-6 h-2 p-3 rounded-full border-t-2 border-r-2 border-[white] place-self-center"
//               />
//             ) : (
//               'Sign In'
//             )}
//           </button>
//           <p className="text-center font-light text-sm">
//             <span>Don't have an account? </span>
//             <span>
//               <a
//                 href=""
//                 onClick={() => navigate('/signup')}
//                 className="underline hover:decoration-0 cursor-pointer"
//               >
//                 Sign Up
//               </a>
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabse/supabaseClient';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Recovery Process States
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState(1); // 1: Email check, 2: QA check, 3: New password
  const [fetchedQuestion, setFetchedQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // 1. Standard Login Handler
  const handleLogIn = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (email.trim() && password.trim()) {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });
      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }
      toast.success('User successfully logged in ✅');
      setLoading(false);
      navigate('/dashboard');
    } else {
      toast.error('Please fill in both email and password');
    }
  };

  // 2. Recovery Step 1: Check Email & Get Security Question
  const checkEmailAndFetchQuestion = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Enter your admin email");

    setLoading(true);
    const { data, error } = await supabase
      .from('Admin') // Points directly to your Admin table
      .select('recovery_question')
      .eq('email', email.trim())
      .maybeSingle();

    if (error || !data || !data.recovery_question) {
      toast.error("Account or recovery configurations not found.");
      setLoading(false);
      return;
    }

    setFetchedQuestion(data.recovery_question);
    setRecoveryStep(2); // Go to answer prompt
    setLoading(false);
  };

  // 3. Recovery Step 2: Validate Answer Locally to Advance UI
  const verifySecurityAnswerLocal = async (e) => {
    e.preventDefault();
    if (!securityAnswer.trim()) return toast.error("Provide your answer");

    setLoading(true);
    const { data, error } = await supabase
      .from('Admin')
      .select('recovery_answer')
      .eq('email', email.trim())
      .maybeSingle();

    if (error || !data || data.recovery_answer !== securityAnswer.trim().toLowerCase()) {
      toast.error("Verification failed. Incorrect answer.");
      setLoading(false);
      return;
    }

    setRecoveryStep(3); // Go to password override input
    setLoading(false);
  };

  // 4. Recovery Step 3: Run Secure Database Function Override
  const handlePasswordOverride = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) return toast.error("Password must be at least 6 characters");

    setLoading(true);

    // Call the RPC function we created in your database
    const { data, error } = await supabase.rpc('update_admin_password_via_recovery', {
      target_email: email.trim(),
      provided_question: fetchedQuestion,
      provided_answer: securityAnswer.trim().toLowerCase(),
      new_password: newPassword
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Password updated successfully! Log in now.");
    resetRecoveryState();
  };

  const resetRecoveryState = () => {
    setIsForgotMode(false);
    setRecoveryStep(1);
    setSecurityAnswer('');
    setNewPassword('');
    setLoading(false);
  };

  return (
    <div className="relative w-full h-screen">
      <div style={{ backgroundImage: "url('auth-img.jpg')" }} className="absolute inset-0 w-full h-full bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/60 w-full h-full backdrop-blur-md" />

      <div className="relative bg-[#ede0e022] w-full h-full flex flex-col items-center justify-center">
        <div className="w-[90%] md:w-120 text-white border border-white/40 p-4 md:p-6 rounded-2xl flex flex-col gap-5 bg-neutral-900/50 backdrop-blur-md">
          <h1 className="text-center font-medium text-xl md:text-2xl">
            {isForgotMode ? `Account Recovery (Step ${recoveryStep}/3)` : 'Sign In'}
          </h1>

          {!isForgotMode ? (
            /* --- LOGIN FORM --- */
            <>
              <fieldset className="border border-[#f8f2f276] rounded-xl text-sm">
                <legend className="px-1">Email *</legend>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 w-full outline-none bg-transparent" />
              </fieldset>
              <fieldset className="border border-[#f8f3f376] rounded-xl text-sm">
                <legend className="px-1">Password *</legend>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 w-full outline-none bg-transparent" />
              </fieldset>
              <button type="button" onClick={() => setIsForgotMode(true)} className="text-center underline cursor-pointer text-sm hover:text-amber-400 self-center">
                Forgot password?
              </button>
              <button disabled={loading} onClick={handleLogIn} className="text-white font-medium p-2 bg-amber-400 rounded-xl cursor-pointer hover:bg-amber-500 flex items-center justify-center min-h-10">
                {loading ? <motion.div animate={{ rotate: '360deg' }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 rounded-full border-2 border-white border-t-transparent" /> : 'Sign In'}
              </button>
            </>
          ) : (
            /* --- RECOVERY SEQUENCE --- */
            <>
              {recoveryStep === 1 && (
                <form onSubmit={checkEmailAndFetchQuestion} className="flex flex-col gap-4">
                  <p className="text-xs text-neutral-300 text-center">Enter your email address to check your configured security identity.</p>
                  <fieldset className="border border-white/40 rounded-xl text-sm">
                    <legend className="px-1">Confirm Admin Email *</legend>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 w-full outline-none bg-transparent" required />
                  </fieldset>
                  <button type="submit" disabled={loading} className="p-2 bg-amber-400 text-black font-semibold rounded-xl hover:bg-amber-500">
                    {loading ? 'Searching...' : 'Find Question'}
                  </button>
                </form>
              )}

              {recoveryStep === 2 && (
                <form onSubmit={verifySecurityAnswerLocal} className="flex flex-col gap-4">
                  <label className="text-sm font-medium text-amber-300 text-center block px-2 italic">
                     "{fetchedQuestion}"
                  </label>
                  <fieldset className="border border-white/40 rounded-xl text-sm">
                    <legend className="px-1">Your Security Answer *</legend>
                    <input type="text" value={securityAnswer} onChange={(e) => setSecurityAnswer(e.target.value)} className="p-2 w-full outline-none bg-transparent" placeholder="Type answer here..." required />
                  </fieldset>
                  <button type="submit" disabled={loading} className="p-2 bg-amber-400 text-black font-semibold rounded-xl hover:bg-amber-500">
                    {loading ? 'Verifying...' : 'Verify Answer'}
                  </button>
                </form>
              )}

              {recoveryStep === 3 && (
                <form onSubmit={handlePasswordOverride} className="flex flex-col gap-4">
                  <p className="text-xs text-emerald-400 text-center font-medium">Identity Confirmed! Set your new account credentials below.</p>
                  <fieldset className="border border-white/40 rounded-xl text-sm">
                    <legend className="px-1">New Password *</legend>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="p-2 w-full outline-none bg-transparent" placeholder="Minimum 6 characters" required />
                  </fieldset>
                  <button type="submit" disabled={loading} className="p-2 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600">
                    {loading ? 'Overriding...' : 'Save New Password'}
                  </button>
                </form>
              )}

              <button type="button" onClick={resetRecoveryState} className="text-center underline text-xs mt-2 opacity-70 hover:opacity-100">
                Cancel Recovery
              </button>
            </>
          )}

          {!isForgotMode && (
            <p className="text-center font-light text-sm">
              <span>Don't have an account? </span>
              <button type="button" onClick={() => navigate('/signup')} className="underline hover:decoration-0 cursor-pointer text-amber-400 bg-transparent border-none p-0">
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;