import React, { useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AddAnnouncement = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    title: '',
    description: '',
    expiry_date: 3,
    level: 'important',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setDetails({
      title: '',
      description: '',
      expiry_date: 3,
      level: 'important',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Adding announcement...');

    try {
      if (
        !details.title.trim() ||
        !details.description.trim() ||
        !details.expiry_date ||
        !details.level
      ) {
        toast.error('Required inputs must be filled', { id: toastId });
        return;
      }

      const { data, error } = await supabase
        .from('announcements')
        .insert(details)
        .select()
        .single();

      if (error) {
        toast.error('Failed adding announcement', { id: toastId });
        return;
      }

      const { error: errorAddMsg } = await supabase.from('products_logs').insert({
        action: 'created',
        product_id: data.id,
        details: `created ${details.title} described ${details.description}, expiry date at ${details.expiry_date}`,
      });

      if (errorAddMsg) throw new Error(errorAddMsg.message);

      toast.success('Announcement added successfully', { id: toastId });

      clearForm();

    } catch (err) {
      console.log('Error', err.message);
      toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-2 backdrop-blur-md">
      <div
        className="bg-white/90 rounded-xl p-4 w-[90%] md:w-[50%] flex flex-col gap-2"
        method="post"
      >
        <fieldset className="w-full border text-black/50 border-gray-300 rounded-xl">
          <legend>title*</legend>
          <input
            placeholder="Anoucement title"
            type="text"
            name="title"
            value={details.title}
            onChange={handleChange}
            className="w-full p-2 border-none outline-none"
          />
        </fieldset>

        <fieldset className="border rounded-lg w-full text-black/50 border-gray-300">
          <legend className="px-2 ">Product Description*</legend>
          <textarea
            name="description"
            value={details.description}
            onChange={handleChange}
            className="w-full p-2 outline-none min-h-15 max-h-30 font-mono"
          />
        </fieldset>

        <fieldset className="border rounded-lg w-full text-black/50 border-gray-300">
          <legend>Expiry date (in days)*</legend>
          <input
            placeholder="7 days..."
            type="number"
            name="expiry_date"
            value={details.expiry_date}
            onChange={handleChange}
            className="w-full p-2 outline-none borer-none"
          />
        </fieldset>

        <fieldset className="border rounded-lg w-full text-black/50 border-gray-300">
          <legend>Level rate *</legend>
          <div className="flex flex-row items-center gap-5 p-2">
            <label htmlFor="less">
              <input
                type="radio"
                name="level"
                id="less"
                value="less"
                checked={details.level === 'less'}
                onChange={handleChange}
              />
              less
            </label>

            <label htmlFor="moderate">
              <input
                type="radio"
                name="level"
                id="moderate"
                value="moderate"
                checked={details.level === 'moderate'}
                onChange={handleChange}
              />
              Moderate
            </label>

            <label htmlFor="high">
              <input
                type="radio"
                name="level"
                id="high"
                value="high"
                checked={details.level === 'high'}
                onChange={handleChange}
              />
              High
            </label>
          </div>
        </fieldset>

        <div className="w-full flex flex-row items-center gap-4 pt-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full border rounded-lg border-gray-500 p-2 cursor-pointer"
          >
            Close
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full 500 bg-amber-400 rounded-lg p-2 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncement;