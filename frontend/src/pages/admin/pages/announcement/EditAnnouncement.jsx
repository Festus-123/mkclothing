import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { FiInfo } from 'react-icons/fi';
import Dropdown from '../../../../components/admin/dropdown/Dropdown';

const EditAnnouncement = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({
    title: 'Website Maintenance',
    description: '',
    expiry_date: 3,
    expires_at: '',
    level: 'Urgent',
  });

  /* ----------------------------- Dropdown Data ---------------------------- */

  const announcementTitles = [
    'Website Maintenance',
    'Delivery Delay',
    'New Collection',
    'Flash Sale',
    'Holiday Notice',
    'Store Update',
    'Limited Offer',
    'System Upgrade',
  ];

  const priorityLevels = ['Information', 'Warning', 'Urgent'];

  const expiryOptions = [
    {
      label: '1 Day',
      value: 1,
    },
    {
      label: '3 Days',
      value: 3,
    },
    {
      label: '5 Days',
      value: 5,
    },
    {
      label: '7 Days',
      value: 7,
    },
  ];

  const fetchAnnouncement = async () => {
    // setLoading(true);

    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast.error('Failed loading announcement');
        return;
      }

      setDetails({
        title: data.title || 'Website Maintenance',
        description: data.description || '',
        expiry_date: data.expiry_date || 3,
        expires_at: data.expires_at || '',
        level: data.level || 'Urgent',
      });
    } catch (err) {
      console.log('error fetching announcement', err.message);
    }
    // setLoading(false);
  };

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading('Updating announcement...');

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

      const { error } = await supabase
        .from('announcements')
        .update(details)
        .eq('id', id);

      if (error) {
        toast.error('Failed updating announcement', { id: toastId });
        return;
      }

      const { error: logError } = await supabase.from('products_logs').insert({
        action: 'updated',
        product_id: id,
        details: `updated ${details.title} described ${details.description}, expiry date at ${details.expiry_date}`,
      });

      if (logError) {
        console.log('log error', logError.message);
      }

      toast.success('Announcement updated successfully', { id: toastId });
      setLoading(false);
      navigate('/dashboard/announcements', { state: { refresh: true } });
    } catch (err) {
      console.log('error updating announcement', err.message);
      setLoading(false);
      toast.error('Something went wrong', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-2 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden">
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <FiInfo size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Edit Announcement {details.id}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Notify customers about promotions, maintenance, delivery updates
                and other important information.
              </p>
            </div>
          </div>
        </div>

        <form className="space-y-6 p-8 overflow-y-auto">
          {/* Announcement Type */}

          <Dropdown
            label="Announcement Type"
            value={details.title}
            options={announcementTitles}
            onChange={(value) =>
              setDetails((prev) => ({
                ...prev,
                title: value,
              }))
            }
          />

          {/* Description */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={details.description}
              onChange={handleChange}
              placeholder="Write a short announcement that customers will see..."
              className="min-h-36 w-full rounded-xl border border-gray-300 resize-none px-4 py-3 text-sm outline-none transition focus:border-amber-500"
            />
          </div>

          {/* Row */}

          <div className="grid gap-6 md:grid-cols-2">
            <Dropdown
              label="Expires After"
              value={`${details.expiry_date} Day${
                details.expiry_date > 1 ? 's' : ''
              }`}
              options={expiryOptions}
              onChange={(value) =>
                setDetails((prev) => ({
                  ...prev,
                  expiry_date: value,
                }))
              }
            />

            <Dropdown
              label="Priority"
              value={details.level}
              options={priorityLevels}
              onChange={(value) =>
                setDetails((prev) => ({
                  ...prev,
                  level: value,
                }))
              }
            />
          </div>

          {/* <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-amber-500 px-6 py-3 font-medium text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Publishing...' : 'Publish Announcement'}
            </button>
          </div> */}
        </form>

        <div className="flex gap-3 border-t border-gray-200 p-6 flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Close
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`rounded-xl bg-amber-500 px-6 py-3 font-medium text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70`}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAnnouncement;
