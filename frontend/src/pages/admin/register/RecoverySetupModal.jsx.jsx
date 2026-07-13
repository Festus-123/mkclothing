import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabse/supabaseClient'; // Adjusted to match your relative file paths
import { toast } from 'sonner';

const RecoverySetupModal = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkRecoveryStatus = async () => {
      if (!session?.user) return;
      
      // Querying your custom "Admin" table directly via email or auth link
      const { data, error } = await supabase
        .from('Admin')
        .select('recovery_question')
        .eq('email', session.user.email)
        .maybeSingle();

      if (error) {
        console.error("Error checking recovery parameters:", error.message);
        return;
      }

      // Intercept the admin if they haven't configured their security credentials yet
      if (!data?.recovery_question) {
        setIsOpen(true);
      }
    };

    checkRecoveryStatus();
  }, [session]);

  const handleSaveRecovery = async (e) => {
    e.preventDefault();
    if (!question || !answer.trim()) {
      toast.error('Please fill completely all recovery parameters');
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('Admin')
      .update({
        recovery_question: question,
        recovery_answer: answer.trim().toLowerCase(), // Normalized to lowercase for easier frontend verification later
      })
      .eq('email', session.user.email);

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success('Security question configured successfully! 🔐');
    setLoading(false);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-white/20 text-white w-full max-w-md p-6 rounded-2xl flex flex-col gap-4 shadow-xl">
        <h2 className="text-xl font-bold text-amber-400 text-center">Set Security Question</h2>
        <p className="text-xs text-neutral-400 text-center">
          External email pipelines are bypassed. You must set up a recovery identity question to retrieve your access keys if forgotten.
        </p>

        <form onSubmit={handleSaveRecovery} className="flex flex-col gap-4 mt-2">
          <fieldset className="border border-white/30 rounded-xl text-sm">
            <legend className="px-1 text-xs text-amber-300">Select Question *</legend>
            <select
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="p-2 w-full outline-none bg-neutral-900 text-white cursor-pointer"
              required
            >
              <option value="" disabled>-- Select a Question --</option>
              <option value="What was the name of your first elementary school?">What was the name of your first elementary school?</option>
              <option value="In what city did your parents meet?">In what city did your parents meet?</option>
              <option value="What was your first pet's name?">What was your first pet's name?</option>
              <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
            </select>
          </fieldset>

          <fieldset className="border border-white/30 rounded-xl text-sm">
            <legend className="px-1 text-xs text-amber-300">Your Secure Answer *</legend>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="p-2 w-full outline-none bg-transparent text-white"
              placeholder="Case insensitive answer..."
              required
            />
          </fieldset>

          <button
            type="submit"
            disabled={loading}
            className="p-2.5 bg-amber-400 hover:bg-amber-500 text-black font-semibold rounded-xl transition-all mt-2"
          >
            {loading ? 'Saving Parameters...' : 'Lock Recovery Context'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverySetupModal;