import React from 'react';
import Navbar from '../../../components/user/Navbar/Navbar';
import FooterMain from '../../../components/user/Footer/FooterMain';
import Hero from '../../../components/user/hero/Hero';
import Details from '../../../components/user/details/Details';
import FeaturedCategories from '../../../components/user/featured-categories/FeaturedCategories';
import About from '../../../components/user/about/About';
import FeaturedCollections from '../../../components/user/featured-collections/FeaturedCollections';
import WhyUs from '../../../components/user/why-us/WhyUs';
import Visuals from '../../../components/user/visuals/Visuals';
import Procedure from '../../../components/user/procedure/Procedure';
import CustomerReviews from '../../../components/user/customer-reviews/CustomerReviews';

const Home = () => {
  // function convertTolowrase() {
  //   const leeter = 'HARRYPOTTER THE magician in the north';

  //   const uppercaseBank = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  //   const lowercaseBank = 'abcdefghijklmnopqrstuvwxyz';

  //   // 2. Use split("") to break "Arrow" into ["A", "r", "r", "o", "w"]
  //   let new_word = [];

  //   leeter.split('').map((item) => {
  //     let isUppercase = false;
  //     // let isLowercase = false;
  //     let matchwordIndex = -1;

  //     // 3. Loop through our uppercase bank letters one by one

  //     uppercaseBank.split('').map((char, index) => {
  //       if (item === char) {
  //         isUppercase = true;
  //         matchwordIndex = index;
  //       }
  //     });

  //     // 4. Print out the final verdict for this letter
  //     if (isUppercase) {
  //       let lowerCaseEqu = lowercaseBank.split('')[matchwordIndex];
  //       new_word.push(lowerCaseEqu);
  //       // console.log(`'${item}' is UPPERCASE`);
  //     } else {
  //       new_word.push(item);
  //       // console.log(`'${item}' is lowercase`);
  //     }
  //   });

  //   console.log('Final result', new_word.join(''));
  // }

  // convertTolowrase();

  return (
    <div className="bg-gray-100 min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <FeaturedCategories />
      <About />
      <FeaturedCollections />
      <WhyUs />
      <Visuals />
      <Procedure />
      <CustomerReviews />
      <FooterMain />
    </div>
  );
};

export default Home;
