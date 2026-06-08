import React from 'react';

const AboutText = () => {
  return (
    <div className="flex flex-col justify-center text-white">
      <span className="mb-6 inline-flex items-center gap-2 self-start rounded-full bg-white/20 px-4 py-2 text-sm">
        <span className="h-2 w-2 rounded-full bg-white" />
        5+ Years Experience
      </span>

      <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
        Meet Our C.E.O
      </h2>

      <h3 className="text-2xl md:text-3xl font-bold mb-2">Adekunle Modupe</h3>

      <p className="font-medium mb-4 text-white/90">
        Chief Executive Officer & Creative Director
      </p>

      <p className="max-w-md text-sm leading-relaxed text-white/80">
        With 5+ years of Experience our Our Brand offers unique sales and
        spectacular styles making M&K among the leading cloth sales industry in
        the rising markets, with over 200 different styles made and over 6,000
        sales made.
      </p>
    </div>
  );
};

export default AboutText;
