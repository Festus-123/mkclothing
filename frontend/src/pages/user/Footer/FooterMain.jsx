import React from 'react';

const FooterMain = () => {
  return (
    <footer className="bg-[#c96d25] mt-24 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-orange-600 font-bold text-sm">
              M&K
            </div>
            <h3 className="font-semibold">M&K</h3>
          </div>
          <p className="text-sm text-white/90 max-w-xs">
            Premium fashion for modern individuals. Quality, style and elegance
            in every place.
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-semibold mb-3">Customer Service</h4>
          <ul className="text-sm space-y-2 text-white/90">
            <li>Shopping Info</li>
            <li>Returns</li>
            <li>Size Guides</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact Us</h4>
          <p className="text-sm text-white/90">Email: smk@gmail.com</p>
          <p className="text-sm text-white/90">Phone: +234 8140808080</p>
        </div>
      </div>

      <div className="border-t border-white/30 py-4 text-center text-xs text-white/80">
        2025 M&K Fashion. All rights reserved
      </div>
    </footer>
  );
};

export default FooterMain;
