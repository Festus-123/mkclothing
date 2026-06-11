import React from 'react';
import { IMAGES } from '../../../assets/images-list';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from 'react-icons/fa';

const Hero = () => {
  const links = [
    { link: 'https://www.facebook.com/mkclothing', icon: FaFacebookF },
    { link: 'https://www.instagram.com/mkclothing', icon: FaInstagram },
    { link: 'https://www.twitter.com/mkclothing', icon: FaTwitter },
    { link: 'https://www.linkedin.com/company/mkclothing', icon: FaLinkedinIn },
    { link: 'wa.me/mkclothing', icon: FaWhatsapp },
  ];
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.hero})`,
      }}
      className="relative bg-cover bg-no-repeat bg-center w-full h-screen "
    >
      <div className="relative bg-linear-to-t from-black/80 via-black/70 to-black/10 w-full h-full flex flex-col items-center justify-center p-4 md:p-16">
        <h1 className="text-[2em] sm:text-[3em] md:text-[4em] lg:text-[5em]  uppercase text-center text-white font-bold mt-10 md:mt-20">
          Welcome to M&K Clothing
        </h1>
        <p className="text-lg md:text-xl text-center text-white mt-4">
          Discover the latest trends in fashion and elevate your style with our
          exclusive collection.
        </p>
        <button className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
          Shop Now
        </button>
      </div>

      {/* social medias */}
      <div className="absolute right-5 md:right-0 bottom-5 bg-[#331818] flex items-center gap-2">
        {links.map((item, index) => {
          let Icon = item.icon;
          return (
            <a key={index} href={item.link} className="text-white text-lg mx-2">
              <Icon />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
