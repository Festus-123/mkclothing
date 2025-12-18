import React from 'react';

const collections = [
  {
    title: 'Evening Wears',
    desc: 'Elegant and sleek for evening movements',
    img: '/assets/evening1.png',
  },
  {
    title: 'Evening Wears',
    desc: 'Elegant and sleek for evening movements',
    img: '/assets/evening2.png',
  },
];

const LitCollectionCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {collections.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
        >
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-80 object-cover"
          />
          <div className="p-4">
            <h4 className="text-sm font-semibold text-orange-700">
              {item.title}
            </h4>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LitCollectionCard;
