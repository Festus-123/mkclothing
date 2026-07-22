import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSearch } from 'react-icons/fi';

const AnnouncementHeader = ({
  searching,
  setSearching,
  location,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Announcements
          </h1>

          <p className="mt-1 text-sm md:text-base text-gray-500">
            Create, manage and publish announcements, updates and important
            notices for your customers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Add Announcement */}
          <Link
            to="/dashboard/add-announcement"
            state={{ backgroundLocation: location }}
            className="flex items-center gap-2 rounded-xl bg-amber-800 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-amber-900"
          >
            <FiPlus size={18} />
            <span className="hidden sm:block">
              New Announcement
            </span>
          </Link>

          {/* Search */}
          {!searching && (
            <button
              onClick={() => setSearching(true)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50"
            >
              <FiSearch
                size={18}
                className="text-gray-600"
              />
            </button>
          )}
        </div>
      </div>

      <div className="border-b border-gray-200" />
    </div>
  );
};

export default AnnouncementHeader;