import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import Placeholder from '../placeholder/Placeholder';
import EmptyState from '../empty-state/EmptyState';
import AnnouncementCard from '../announcement-card/AnnouncementCard';

const AnnouncementDisplay = ({
  loading,
  announcement,
  displaySearchResult,
  location,
  setClose,
  setSelectedAnnouncement,
}) => {
  if (loading) {
    return <Placeholder />;
  }

  if (!loading && announcement.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      {displaySearchResult.map((item) => (
        <AnnouncementCard
          key={item.id}
          item={item}
          location={location}
          setClose={setClose}
          setSelectedAnnouncement={setSelectedAnnouncement}
        />
      ))}
    </div>
  );
};

export default AnnouncementDisplay;
