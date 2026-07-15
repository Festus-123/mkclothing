import React from 'react';
import { IMAGES } from '../../../assets/images-list';
import { FiTruck, FiShield, FiMessageCircle } from 'react-icons/fi';
import { PiCrownSimpleBold } from "react-icons/pi"
import { Link } from 'react-router-dom';

const WhyUs = () => {
  const reasons = [
    {
      icon: <FiTruck size={28} />,
      title: 'Fast Nationwide Delivery',
      des: 'Your orders are processed quickly and delivered safely wherever you are.',
    },
    {
      icon: <PiCrownSimpleBold size={28} />,
      title: 'Premium Craftsmanship',
      des: 'Every piece is made with quality fabrics, attention to detail, and lasting comfort.',
    },
    {
      icon: <FiShield size={28} />,
      title: 'Trusted Quality',
      des: 'Designed to maintain its style, fit, and elegance even after repeated wear.',
    },
    {
      icon: <FiMessageCircle size={28} />,
      title: 'Dedicated Support',
      des: 'Our team is always available to assist you before and after your purchase.',
    },
  ];

  return (
    <div className="py-16 md:py-20 px-4 md:px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="">
          {/* Image Section */}


          <div>
            <p className="uppercase tracking-[0.3em] text-orange-500 text-sm font-semibold mb-4">
              Why Choose Us
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-5">
              More than fashion,
              <br />
              it's an experience.
            </h2>

            <p className="text-gray-500 leading-8 mb-10">
              At M&amp;K, every collection is created with a commitment to
              premium craftsmanship, exceptional comfort, and timeless elegance.
              We don't just sell clothing—we create confidence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 md:mb-8">
              {reasons.map((item, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-sm"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                    {item.icon}
                  </div>

                  <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>

                  <p className="text-sm leading-7 text-gray-500">{item.des}</p>
                </div>
              ))}
            </div>

            <Link 
                href="/collections"
                className="mt-10 bg-black px-8 py-4 text-white transition hover:scale-105 hover:bg-orange-500">
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
