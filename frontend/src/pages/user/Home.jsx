import React from 'react'
import NavbarMain from './Navbar/NavbarMain'
import Heromain from './HeroMain/Heromain'
import LitCollectionMain from './LitCollectionPage/LitCollectionMain'
import SubHeroMain from './SubHeroSection/SubHeroMain'
import FooterMain from './Footer/FooterMain'

const Home = () => {
  return (
    <div>
      <NavbarMain/>
      <Heromain/>
      <LitCollectionMain/>
      <SubHeroMain/>
      <FooterMain/>
    </div>
  )
}

export default Home
