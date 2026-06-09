import React from 'react';
import Navbar from '../../../components/user/Navbar/Navbar';
import Hero from '../../../components/user/Hero/Hero';
import Details from '../../../components/user/details/Details';

const Home = () => {
  function convertTolowrase() {
    const leeter = 'HARRYPOTTER THE magician in the north';

    const uppercaseBank = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseBank = 'abcdefghijklmnopqrstuvwxyz';

    // 2. Use split("") to break "Arrow" into ["A", "r", "r", "o", "w"]
    let new_word = [];

    leeter.split('').map((item) => {
      // let isUppercase = false;
      let isLowercase = false;
      let matchwordIndex = -1;

      // 3. Loop through our uppercase bank letters one by one

      lowercaseBank.split('').map((char, index) => {
        if (item === char) {
          isLowercase = true;
          matchwordIndex = index;
        }
      });

      // 4. Print out the final verdict for this letter
      if (isLowercase) {
        let upperCaseEqu = uppercaseBank.split('')[matchwordIndex];
        new_word.push(upperCaseEqu);
        // console.log(`'${item}' is UPPERCASE`);
      } else {
        new_word.push(item);
        // console.log(`'${item}' is lowercase`);
      }
    });

    console.log('Final result', new_word.join(''));
  }

  convertTolowrase();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Hero />
      <Details />
    </div>
  );
};

export default Home;
