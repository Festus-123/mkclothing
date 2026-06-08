import React from 'react';
import MiniCard from './MiniCard';

const MiniCardText = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      <MiniCard title="Premium Feature" />
      <MiniCard title="Latest Trend" />
      <MiniCard title="Trusted Brand" />
    </div>
  );
};

export default MiniCardText;
