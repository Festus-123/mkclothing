import React from 'react';
import SubHeroText from './SubHeroText';
import SubHeroButton from './SubHeroButton';

const SubHeroMain = () => {
  return (
    <section className="max-w-8xl px-4 w-full lg:w-[90%] mg:w-[90%]">
      <div className="bg-linear-to-r from-orange-500 to-red-500 rounded-2xl py-10 flex flex-col items-center">
        <SubHeroText />
        <SubHeroButton />
      </div>
    </section>
  );
};

export default SubHeroMain;
