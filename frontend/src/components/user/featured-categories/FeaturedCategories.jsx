import { Link } from 'react-router-dom';
import { IMAGES } from '../../../assets/images-list';
// import motion from "motion";

const FeaturedCategories = () => {
  const categories = [
    {
      img: IMAGES.top,
      name: 'Tops',
    },
    {
      img: IMAGES.stylish,
      name: 'Cargo Pants',
    },
    {
      img: IMAGES.jacket3,
      name: 'Jackets',
    },
    {
      img: IMAGES.cargo_pants2,
      name: 'Sport Outfits',
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 ">
        <div>
          <div>
            <p className="uppercase tracking-[0.3em] text-orange-500 text-sm font-semibold mb-4">
              Featured Categories
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-5">
              Discover Signature Styles,
              <br />
              Crafted to Make a Statement.
            </h2>

            <p className="text-gray-500 leading-8 mb-10">
              Explore carefully curated collections designed for every
              occasion—from contemporary essentials to bold statement pieces.
              Every category reflects M&amp;K's commitment to exceptional
              craftsmanship, premium quality, and effortless sophistication.
            </p>
          </div>
        </div>

        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`group relative min-w-[320px] h-125 rounded-3xl overflow-hidden cursor-pointer shrink-0 shadow-2xs ${index % 2 !== 0 ? 'mt-8' : ''} `}
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 "
              />

              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition" />

              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-semibold mb-4">{category.name}</h3>

                <Link
                  to="/collections"
                  className=" border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-gray-500 leading-8 py-8 md:py-16">
          Every collection is thoughtfully designed to combine modern style with
          lasting quality. Whether you're dressing for everyday confidence or
          special occasions, M&amp;K delivers fashion that speaks through
          detail, comfort, and timeless elegance.
        </p>
      </div>
    </section>
  );
};

export default FeaturedCategories;
