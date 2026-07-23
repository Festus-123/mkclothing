import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FiInfo } from 'react-icons/fi';

import { supabase } from '../../../../supabse/supabaseClient';
import Dropdown from '../../../../components/admin/announcements/dropdown/Dropdown';

const AddAnnouncement = () => {
  const navigate = useNavigate();

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

  /* ------------------------------ Form Utils ------------------------------ */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setDetails({
      title: 'Website Maintenance',
      description: '',
      expiry_date: 3,
      expires_at: '',
      level: 'Urgent',
    });
  };

  /* ----------------------------- Form Submit ----------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const toastId = toast.loading('Publishing announcement...');

    try {
      if (
        !details.title.trim() ||
        !details.description.trim() ||
        !details.expiry_date ||
        !details.level
      ) {
        toast.error('Please complete all required fields.', {
          id: toastId,
        });
        return;
      }

      const expiryDays = Number(details.expiry_date);

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + expiryDays);

      const { data: existingAnnouncement } = await supabase
        .from('announcements')
        .select('id')
        .ilike('title', details.title.trim())
        .limit(1)
        .maybeSingle();

      if (existingAnnouncement) {
        toast.error('An announcement with this title already exists.', {
          id: toastId,
        });
        return;
      }

      const { data, error } = await supabase
        .from('announcements')
        .insert({
          ...details,
          expiry_date: expiryDays,
          expires_at: expiresAt.toISOString(),
        })
        .select()
        .single();

      if (error) {
        toast.error('Failed to publish announcement.', {
          id: toastId,
        });
        return;
      }

      const { error: logError } = await supabase.from('products_logs').insert({
        action: 'created',
        product_id: data.id,
        details: `Created announcement "${details.title}" with ${expiryDays} day(s) expiry.`,
      });

      if (logError) {
        throw new Error(logError.message);
      }

      toast.success('Announcement published successfully.', {
        id: toastId,
      });

      clearForm();
    } catch (err) {
      console.error(err.message);

      toast.error('Something went wrong.', {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <FiInfo size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Create Announcement
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Notify customers about promotions, maintenance, delivery updates
                and other important information.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="space-y-6 p-8 overflow-y-auto">
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
              className="min-h-36 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
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

          {/* Footer */}

          <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnnouncement;
