import React from 'react';
import LitCollectionText from './LitCollectionText';
import LitCollectionCard from './LitCollectionCard';
import LitCollectionButton from './LitCollectionButton';
import MiniCardMain from '../MiniCards/MiniCardMain';

const LitCollectionMain = () => {
  return (
    <section className="py-20 bg-[#fafafa]">
      <MiniCardMain />

      <div className="max-w-7xl mx-auto px-4 mt-20">
        <LitCollectionText />
        <LitCollectionCard />
        <LitCollectionButton />
      </div>
    </section>
  );
};

export default LitCollectionMain;
