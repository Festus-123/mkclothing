import React from 'react'
import NavbarMain from './Navbar/NavbarMain'
import Heromain from './HeroSection/Heromain'
import LitCollectionMain from './LitCollectionPage/LitCollectionMain'
import SubHeroMain from './SubHeroSection/SubHeroMain'
import FooterMain from './Footer/FooterMain'
import MiniCardMain from './MiniCards/MiniCardMain'

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <NavbarMain/>
      <Heromain/>
      <MiniCardMain/>
      <LitCollectionMain/>
      <SubHeroMain/>
      <FooterMain/>
    </div>
  )
}

export default Home
