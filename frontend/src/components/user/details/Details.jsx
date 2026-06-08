import React from 'react';
import { IMAGES } from '../../../assets/images';
import MiniCard from '../../../components/user/MiniCards/MiniCard';
import { CATEGORIES } from '../../../data/categories';
import Masonry from 'react-masonry-css';

const Details = () => {
  const cards = [
    {
      bg: '#07dc3c9f',
      img: IMAGES.hero_img,
      title: 'Coursette',
      des: 'A stylish and comfortable coursette perfect for casual outings and everyday wear.',
    },
    {
      bg: '#dc92078a',
      img: IMAGES.hero_img2,
      title: 'Jacket',
      des: 'A versatile jacket that combines fashion and functionality, ideal for layering and adding a touch of style to any outfit.',
    },
    {
      bg: '#c691d2b5',
      img: IMAGES.hero_img,
      title: 'Feminine',
      des: 'A feminine piece that adds a touch of elegance to any outfit.',
    },
    {
      bg: '#fbbf24b5',
      img: IMAGES.hero_img,
      title: 'Cargo Pants',
      des: 'A trendy and functional pair of cargo pants that combines style with practicality, perfect for those who want to make a fashion statement while staying comfortable.',
    },
  ];

  const breakpointColumnObj = {
    default: 5,
    1100: 3,
    700: 2,
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-16 gap-10">
      {/* title */}
      <h1 className="text-gray-700 italic text-3xl tracking-tight border-b-2 border-orange-700">
        Premium stocks
      </h1>

      {/* cards */}
      <div className="w-full flex flex-col md:flex-row items-centter justify-evenly">
        {cards.map((card, index) => (
          <MiniCard
            key={index}
            bg={card.bg}
            img={card.img}
            title={card.title}
            description={card.des}
          />
        ))}
      </div>

      {/* Categories */}
        {/* title */}
        <h1 className="text-gray-700 italic text-3xl tracking-tight border-b-2 border-orange-700 mt-20">
          Categories
        </h1>

        {/* nav */}
        <div></div>

        {/* category items */}
        <Masonry
          breakpointCols={breakpointColumnObj}
          className="flex gap-4 "
          columnClassName="flex flex-col gap-4 "
        >
            {CATEGORIES.map((item, index) => (
                <div
                    key={index}
                    className='relative flex flex-col gap-2 group  '>
                    <img src={item.img} alt={item.name} className="w-full h-auto object-cover rounded-lg shadow-md group-hover:-translate-y-2 transition-all duration-300" />
                    <h2 className="text-lg font-semibold mt-2 group-hover:-translate-y-3 transition-all duration-300">{item.name}</h2>
                    <p className="text-gray-500 text-xs md:text-sm group-hover:-translate-y-5 transition-all duration-300">{item.description}</p>
                    <button className="absolute top-2 right-2 bg-white/80 group-hover:bg-white text-sm py-2 px-4 rounded-md group-hover:-translate-y-2 transition-all duration-300">
                      Order
                    </button>
                </div>
            ))}
        </Masonry>
    </div>
  );
};

export default Details;
