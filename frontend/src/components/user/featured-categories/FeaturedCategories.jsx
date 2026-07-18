import { Link } from "react-router-dom";
import { IMAGES } from "../../../assets/images-list";
// import motion from "motion";

const FeaturedCategories = () => {
  const categories = [
    {
      img: IMAGES.top,
      name: "Tops",
    },
    {
      img: IMAGES.stylish,
      name: "Cargo Pants",
    },
    {
      img: IMAGES.jacket3,
      name: "Jackets",
    },
    {
      img: IMAGES.cargo_pants2,
      name: "Sport Outfits",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 ">

        <h2 className="text-3xl md:text-5xl font-light mb-14 ">
          Featured Categories
        </h2>

        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6">

          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`group relative min-w-[320px] h-125 rounded-3xl overflow-hidden cursor-pointer shrink-0 shadow-2xs ${index % 2 !== 0 ? "mt-8" : ""} `}
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 "
              />

              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition" />

              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-semibold mb-4">
                  {category.name}
                </h3>

                <Link 
                    href="/collections"
                    className=" border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition">
                  Shop Now
                </Link>
              </div>
            </div>
          ))}

        </div>

        {/* <h1
            className="font-medium text-2xl md:text-3xl text-center text-gray-500 italic py-8 mt-4">
           " With Every Thread We Make a Difference!"
        </h1> */}

      </div>
    </section>
  );
};

export default FeaturedCategories;