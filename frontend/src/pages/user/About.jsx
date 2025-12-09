import React from 'react'
import NavbarMain from './Navbar/NavbarMain'
import FooterMain from './Footer/FooterMain'
import AboutHeroMain from './AboutHeroSection/AboutHeroMain'
import JourneyMain from './The JourneySection/JourneyMain'
import MiniCardMain from './MiniCards/MiniCardMain'
import SubHeroMain from './SubHeroSection/SubHeroMain'
import ConnectMain from './Connect/ConnectMain'


const About = () => {
  return (
    <div>
      <NavbarMain/>
      <div>
        <AboutHeroMain/>
        <JourneyMain/>
        <MiniCardMain/>
        <SubHeroMain/>
        <ConnectMain/>
      </div>
      <FooterMain/>
    </div>
  )
}

export default About
