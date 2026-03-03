import React from 'react';

const Placeholder = () => {
  return (
    <div className='flex flex-col gap-5 p-2 md:p-4 mt-4 md:mt-0 w-full'>
      <div className="w-full h-60 rounded-xl bg-black/5 animate-pulse"></div>
      <div className="w-full h-15 md:h-20 rounded-xl bg-black/5 animate-pulse mt-2"></div>
    </div>
  );
};

export default Placeholder;