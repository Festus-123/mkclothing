import React from 'react';
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
} from 'react-icons/fi';
import Logo from '../logo/Logo';

const FooterMain = () => {
  return (
    <footer className=" border-t border-gray-300 bg-gray-50 pt-16 md:pt-24">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}

          <div className="lg:col-span-2">
            <Logo />

            <p className="mt-6 max-w-md leading-8 text-gray-600">
              M&amp;K is a premium fashion brand committed to creating elegant,
              eccentric, and timeless pieces for individuals who appreciate
              confidence, quality craftsmanship, and distinctive style. Every
              collection is thoughtfully designed to leave a lasting impression.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 transition hover:bg-orange-500 hover:text-white"
              >
                <FiInstagram />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 transition hover:bg-orange-500 hover:text-white"
              >
                <FiFacebook />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 transition hover:bg-orange-500 hover:text-white"
              >
                <FiTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="mb-5 text-lg font-semibold">Quick Links</h3>

            <ul className="space-y-3 text-gray-600">
              <li className="cursor-pointer transition hover:text-orange-500">
                Home
              </li>

              <li className="cursor-pointer transition hover:text-orange-500">
                Shop
              </li>

              <li className="cursor-pointer transition hover:text-orange-500">
                Collections
              </li>

              <li className="cursor-pointer transition hover:text-orange-500">
                Contact
              </li>
            </ul>
          </div>

          {/* Customer Care */}

          <div>
            <h3 className="mb-5 text-lg font-semibold">Customer Care</h3>

            <ul className="space-y-3 text-gray-600">
              <li className="cursor-pointer hover:text-orange-500 transition">
                Order Tracking
              </li>

              <li className="cursor-pointer hover:text-orange-500 transition">
                Returns & Exchanges
              </li>

              <li className="cursor-pointer hover:text-orange-500 transition">
                Shipping Information
              </li>

              <li className="cursor-pointer hover:text-orange-500 transition">
                Size Guide
              </li>

              <li className="cursor-pointer hover:text-orange-500 transition">
                FAQs
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-5 text-lg font-semibold">Contact</h3>

            <div className="space-y-5 text-gray-600">
              <div className="flex gap-3">
                <FiMail className="mt-1 text-orange-500" />

                <span>support@mkfashion.com</span>
              </div>

              <div className="flex gap-3">
                <FiPhone className="mt-1 text-orange-500" />

                <span>+234 814 080 8080</span>
              </div>

              <div className="flex gap-3">
                <FiMapPin className="mt-1 text-orange-500" />

                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}

        <div className="mt-20 rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h3 className="text-2xl font-semibold">Join Our Community</h3>

              <p className="mt-3 max-w-xl text-gray-600">
                Subscribe to receive updates on new collections, exclusive
                releases, seasonal offers, and style inspiration directly in
                your inbox.
              </p>
            </div>

            <form className="flex w-full max-w-lg overflow-hidden rounded-full border border-gray-300">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 outline-none"
              />

              <button className="flex items-center gap-2 bg-black px-8 text-white hover:bg-orange-500 duration-500 transition-all cursor-pointer">
                <FiSend />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} M&amp;K Fashion. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-orange-500 transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-orange-500 transition">
              Terms & Conditions
            </a>

            <a href="#" className="hover:text-orange-500 transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMain;
