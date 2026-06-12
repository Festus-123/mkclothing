import { IMAGES } from '../../../assets/images-list';
import MiniCard from '../../../components/user/MiniCards/MiniCard';
import { FaArrowRight, } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import FooterMain from '../Footer/FooterMain';
import CollectionItems from '../../collection-items/CollectionItems';

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


  return (
    <div className="overflow-hidden">
      {/* Category and featuring stocks sections */}
      <section className="flex flex-col items-center gap-10">
        {/* cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center place-items-center gap-4 mt-20">
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
        <div>
          <CollectionItems 
            mapLenght={5}/>
        </div>

        <div className="w-full flex justify-end px-4 md:px-16">
          <Link 
            to={"/collections"}
            className="border p-3 rounded-lg uppercase text-sm flex items-center gap-2">
            <span>Go to Collections</span>
            <span>
              <FaArrowRight />
            </span>
          </Link>
        </div>
      </section>

      {/* A different Section */}
      {/* A little taste of fashion */}
      <section className="flex flex-col gap-10 mt-20 md:mt-40">
        {/* What fashion says  */}
        <div className="flex flex-col md:flex-row items-left md:items-end justify-between gap-4">
          <img
            src={IMAGES.hero2}
            alt="display image"
            className="w-auto md:w-[50%] h-auto"
          />
          <div className="w-auto md:w-[50%] flex flex-col gap-10 p-4 md:p-8">
            <h1 className="text-3xl sm:text-5xl md:text-7xl italic text-[#8b4a1f]">
              <span>A little </span> <mark>History</mark>{' '}
              <span>of Our Fashion</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl tracking-wide leading-relaxed text-amber-950/80 line-clamp-14 max-w-4xl">
              Clothing originally dated back to the beginning of time—it is as
              much a part of man as man is a part of it. What started as a
              primal necessity to shield against elements and disease gradually
              evolved into a profound medium for storytelling, tradition, and
              cultural identity. The evolution of these unique styles birthed
              what we celebrate as fashion today: a continuous iteration of
              identity that will never leave humanity. <br /> <br />
              Driven by this deep connection, our own journey began in{' '}
              <span className="font-bold text-[#8b4a1f]">2023</span>. We set out
              to create more than just garments; we wanted to capture moments
              through combinations of unique textures, sharp alignments, and
              vibrant colors. What began as a vision for premium, purposeful
              apparel quickly grew into a digital-first movement, establishing a
              commanding online presence that brought our designs directly to
              fashion lovers looking for structural distinction. <br /> <br />
              By <span className="font-bold text-[#8b4a1f]">2025</span>, we
              expanded our design horizons to bridge the gap between utility and
              luxury. Through rigorous testing, precision tailoring, and an
              uncompromising commitment to immaculate quality, we perfected our
              signatures—delivering everything from flawlessly structured
              corporate wear engineered for impact, to street-certified cargo
              pants designed for seamless everyday movement. <br /> <br />
              Today, in <span className="font-bold text-[#8b4a1f]">2026</span>,
              we continue to shape your style for every moment and every
              milestone occasion. Every fabric we source, every seam we sew, and
              every order we fulfill is driven by the same foundational promise
              we made on day one: to bring absolute elegance, premium beauty,
              and undeniable confidence to your wardrobe.
            </p>
            <div className="w-full flex justify-end p-4">
              <Link className="border p-3 rounded-lg uppercase text-sm flex items-center gap-2">
                <span>Read More</span>
                <span>
                  <FaArrowRight />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Why choose M and K */}
        <div className="p-4 md:p-16 flex flex-col mt-10">
          <h2 className="flex items-center justify-center gap-2 ">
            <span className="w-16 h-0.5 bg-[#8b4a1f]"></span>
            <span className="text-xl italic tracking-tight text-[#8b4a1f]">
              Why choose us
            </span>
          </h2>

          <div>
            <div className="w-full">
              {/* Visions & Values */}
              <div className="px-6 md:px-20 py-24 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-[#8b4a1f] mb-3">
                  Our Visions and Values
                </h2>
                <p className="text-sm text-[#8b4a1f]/80 mb-16">
                  Built on Principles that guide everything we do
                </p>

                <div className="grid gap-14 md:grid-cols-3 max-w-6xl mx-auto">
                  {/* Excellence */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 mb-6 rounded-2xl bg-white shadow-xl flex items-center justify-center transition-transform duration-350 hover:scale-105">
                      <span className="text-3xl text-red-600">🌐</span>
                    </div>
                    <h3 className="font-semibold text-[#8b4a1f] mb-2 text-base md:text-lg">
                      Excellence
                    </h3>
                    <p className="text-xs text-[#8b4a1f]/70 max-w-xs leading-relaxed">
                      We strive for perfection in every single stitch, sourcing
                      premium fabrics to deliver timeless wardrobe staples that
                      stand the test of time.
                    </p>
                  </div>

                  {/* Passion */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 mb-6 rounded-2xl bg-white shadow-xl flex items-center justify-center transition-transform duration-350 hover:scale-105">
                      <span className="text-3xl text-red-600">❤️</span>
                    </div>
                    <h3 className="font-semibold text-[#8b4a1f] mb-2 text-base md:text-lg">
                      Passion
                    </h3>
                    <p className="text-xs text-[#8b4a1f]/70 max-w-xs leading-relaxed">
                      Driven by contemporary design and creative expression, we
                      pour heart and soul into crafting pieces that make you
                      stand out with confidence.
                    </p>
                  </div>

                  {/* Community */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 mb-6 rounded-2xl bg-white shadow-xl flex items-center justify-center transition-transform duration-350 hover:scale-105">
                      <span className="text-3xl text-red-600">👥</span>
                    </div>
                    <h3 className="font-semibold text-[#8b4a1f] mb-2 text-base md:text-lg">
                      Community
                    </h3>
                    <p className="text-xs text-[#8b4a1f]/70 max-w-xs leading-relaxed">
                      More than just a label, we build spaces that connect
                      fashion lovers, celebrating individuality while keeping
                      customer care at our core.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Our mission */}
            <div className="w-full flex flex-col md:flex-row items-center justify-beyween gap-4 md:p-4">
              {/* Image for prospect */}
              <img
                src={IMAGES.mission}
                alt="Our mission image"
                className="w-full md:w-[50%] md:rounded-xl"
              />

              {/* Text content */}
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl sm:text-4xl md:text-6xl italic text-[#8b4a1f] font-serif font-medium tracking-tight">
                  Our <mark>Mission</mark> and <mark>Goals</mark> Highlights
                </h1>
                <p className="text-base sm:text-lg md:text-xl tracking-wide leading-relaxed text-amber-950/80 max-w-4xl font-normal">
                  Our mission is to bridge the gap between sharp professionalism
                  and modern utility. We design premium apparel engineered for
                  the dynamic lifestyle—crafting everything from meticulously
                  tailored corporate wear that commands the boardroom, to
                  rugged, high-street cargo pants built for weekend expression.{' '}
                  <br /> <br />
                  We operate with an unyielding commitment to uncompromising
                  quality. Every fabric is intentionally selected, and every
                  silhouette is rigorously tested to ensure that when you invest
                  in our pieces, you are investing in durability, immaculate
                  structure, and effortless confidence. Our ultimate goal is
                  simple: to deliver world-class garments that redefine how you
                  dress, work, and move.
                </p>
              </div>
            </div>

            {/* Quote Banner */}
            <div className="w-full flex flex-col items-center gap-5 bg-linear-to-r from-orange-600 via-orange-500 to-red-500 rounded-xl py-20 text-center text-white mt-40">
              <div className="max-w-4xl mx-auto px-6">
                <span className="block text-4xl mb-6">❝</span>
                <h3 className="text-2xl md:text-3xl font-medium leading-relaxed mb-4">
                  Fashion is the amor to survive the reality of everyday life
                </h3>
                <p className="text-sm opacity-90">— Mrs BABATUNDE</p>
              </div>
            </div>

            {/* Connect Section */}
            <div className="px-6 md:px-20 py-24 w-full group tansition-all duration-300">
              <div className="max-w-8xl mx-auto rounded-3xl border bg-[#faf7f5] p-10 md:p-14 flex flex-col items-center gap-5">
                <h3 className="text-2xl md:text-3xl font-semibold text-[#8b4a1f] mb-2">
                  Let’s Connect
                </h3>
                <p className="text-sm text-[#8b4a1f]/80 mb-8">
                  Want to know more about our brand or make sales contact us
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center ">
                  <button className="px-8 py-3 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 cursor-pointer transition-all duration-300">
                    Send an Email
                  </button>
                  <button className="px-8 py-3 rounded-full border border-red-600 text-red-600 text-sm font-medium hover:bg-white/50 cursor-pointer transition-all duration-300">
                    Schedule a meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterMain />
    </div>
  );
};

export default Details;
