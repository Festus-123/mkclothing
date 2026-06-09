import React from 'react';
import { IMAGES } from '../../../assets/images';
import { useState } from 'react';
import MiniCard from '../../../components/user/MiniCards/MiniCard';
import { CATEGORIES } from '../../../data/categories';
import Masonry from 'react-masonry-css';
import { FaTshirt, FaShoePrints, FaArrowRight } from 'react-icons/fa';
import { GiClothes, GiArmorVest } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import OurvisionMain from '../Our vision/OurvisionMain';
import FooterMain from '../Footer/FooterMain';

const Details = () => {
  const [showCategory, setShowCategory] = useState(true);

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

  const categories = [
    { name: 'Jackets', icon: GiClothes },
    { name: 'cargo pants', icon: GiArmorVest },
    { name: 'Tops', icon: FaTshirt },
    { name: 'sport wears', icon: FaShoePrints },
  ];

  const breakpointColumnObj = {
    default: 5,
    1100: 3,
    700: 2,
  };

  return (
    <div className="overflow-hidden">
      {/* Category and featuring stocks sections */}
      <section className="flex flex-col items-center p-4 md:p-16 gap-10">
        {/* title */}
        <h1 className="text-[#8b4a1f] italic text-3xl tracking-tight border-b-2 border-orange-700">
          Premium stocks
        </h1>

        {/* cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center place-items-center gap-4">
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
        <h1 className="text-[#8b4a1f] italic text-3xl tracking-tight border-b-2 border-orange-700 mt-20">
          Collections
        </h1>

        {/* nav */}
        <div className="relative w-full flex items-center justify-between gap-10 group text-[#8b4a1f]">
          {/* button to hde and show categories filter */}
          <button
            onClick={() => setShowCategory(!showCategory)}
            className="text-xs border border-[#8b4a1f] p-3 rounded-lg hover:scale-105 cursor-pointer"
          >
            {showCategory ? 'Hide' : 'Show'} Categories
          </button>

          {/* categories navigation*/}
          {showCategory && (
            <div className="flex flex-col absolute top-full z-10 rounded-lg bg-white/80 backdrop-blur-xs md:bg-transparent p-4 md:p-0 md:flex-row md:relative items-left md:items-center justify-between gap-4 mt-4 group-hover:-trnalate-y-5 transition-all duration-300">
              {categories.map((category, index) => {
                let Icon = category.icon;
                return (
                  <div
                    key={index}
                    className="border p-3 rounded-lg hover:scale-105 cursor-pointer text-xs flex items-center gap-1 grow group-hover:translate-y-1 transition-all duration-300"
                  >
                    <Icon />
                    {category.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* category items */}
        <Masonry
          breakpointCols={breakpointColumnObj}
          className="flex gap-4 "
          columnClassName="flex flex-col gap-6 mt-4"
        >
          {CATEGORIES.map((item, index) => (
            <div key={index} className="relative flex flex-col gap-2 group  ">
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                className="w-full h-auto object-cover rounded-lg shadow-md group-hover:-translate-y-2 transition-all duration-300"
              />
              <h2 className="text-lg font-semibold mt-2 group-hover:-translate-y-3 transition-all duration-300">
                {item.name}
              </h2>
              <p className="text-gray-500 text-xs md:text-sm group-hover:-translate-y-5 transition-all duration-300">
                {item.description}
              </p>
              <p className="w-full flex items-center justify-between group-hover:-translate-y-5 transition-all duration-300">
                <span className=" italic text-xs">
                  {/* Main price */}
                  <span className="font-bold">${item.price.toFixed(2)}USD</span>
                  {/* Discounted price */}
                  {item.discount > 0 && (
                    <span className="line-through text-gray-400 ml-2">
                      ${(item.price * (1 + item.discount)).toFixed(2)}USD
                    </span>
                  )}
                </span>
                <span className="italic text-xs">{item.rating}⭐</span>
              </p>
              <button className="absolute top-2 right-2 bg-white/80 group-hover:bg-white text-sm py-2 px-4 rounded-md group-hover:-translate-y-2 transition-all duration-300">
                Order
              </button>
            </div>
          ))}
        </Masonry>

        <div className="w-full flex justify-end">
          <Link className="border p-3 rounded-lg uppercase text-sm flex items-center gap-2">
            <span>Go to Collections</span>
            <span>
              <FaArrowRight />
            </span>
          </Link>
        </div>
      </section>

      {/* A different Section */}
      {/* A little taste of fashion */}
      <section
        className='flex flex-col gap-10 mt-10'>
        {/* What fashion says  */}
        <div className="flex flex-col md:flex-row items-left md:items-end justify-between gap-4">
          <img
            src={IMAGES.hero2}
            alt="display image"
            className="w-auto md:w-[50%] h-auto"
          />
          <div className="w-auto md:w-[50%] flex flex-col gap-10 p-4 md:p-8">
            <h1 className="text-3xl sm:text-5xl md:text-7xl italic text-[#8b4a1f]">
              <span>A little </span> <mark>History</mark> <span>of Fashion</span>
            </h1>
            <p className="text-xl md:text-2xl tracking-wide">
              Fashion Originally dataed back to the begining of time, it is a part of man as man is a part of it.
              Clothes started out as a means to cover nackedness and prevent diseases but it evolved into 
              something better, use for {' '} <mark> stories, sales, business, symbol, tradition and culture identifiers</mark>              the styles of clothes birthed what we call fashion today. <br /> <br />
              now a combo of different material, a flash or different color, a capture of differnet
              moments now make up the attire for a suitable pleasing appearnce all commaded by FASHION
              an iteration that can never leave man. <br /> <br /> 
              from nice coursettes to beautiful cargo pants and traditional dresses we shape your styes
              to meet every moments and every occasion bringing elegance and beauty to the...
            </p>
          </div>
        </div>

        {/* Why choose M and K */}
        <div
            className='p-4 md:p-16 flex flex-col mt-10'>
            <h2 className='flex items-center justify-center gap-2 '>
                <span className='w-16 h-0.5 bg-black'></span>
                <span className='text-xl italic tracking-tight text-[#8b4a1f]'>Why choose us</span>
            </h2>

            <div>
                <OurvisionMain />
            </div>

        </div>
      </section>
      <FooterMain />
    </div>
  );
};

export default Details;
