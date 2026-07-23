import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiEdit2, FiTrash2 } from 'react-icons/fi';

const AnnouncementCard = ({
  item,
  location,
  setClose,
  setSelectedAnnouncement,
}) => {
    

  const badgeStyle = {
    less: {
      text: 'Information',
      className: 'bg-green-100 text-green-700',
    },
    moderate: {
      text: 'Moderate',
      className: 'bg-blue-100 text-blue-700',
    },
    high: {
      text: 'Urgent',
      className: 'bg-red-100 text-red-700',
    },
  };

  const currentBadge =
    badgeStyle[item.level] || badgeStyle.high;

  return (
    <article className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 ">
      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
        {/* Left */}
        <div className="flex-1">
          {/* Badge */}
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${currentBadge.className}`}
          >
            {currentBadge.text}
          </span>

          {/* Title */}
          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            {item.title}
          </h2>

          {/* Description */}
          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600">
            {item.description}
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-row items-end justify-between lg:flex-col lg:items-end">
          {/* Expiry */}
          <div className="flex items-center gap-2 text-gray-500 bg-orange-50 border border-orange-300/50 rounded-full p-1">
            <FiClock size={15} />

            <span className="text-sm">
              {item.expires_at}
              {/* {Number(item.expiry_date) > 1 && 's'} */}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-2">
            <Link
              to={`/dashboard/edit-announcement/${item.id}`}
              state={{ backgroundLocation: location }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition hover:bg-gray-100"
            >
              <FiEdit2 size={17} />
            </Link>

            <button
              onClick={() => {
                setClose(true);
                setSelectedAnnouncement(item);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50"
            >
              <FiTrash2 size={17} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AnnouncementCard;