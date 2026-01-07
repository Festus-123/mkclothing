import React from 'react'
import NavbarMain from './Navbar/NavbarMain'
import FooterMain from './Footer/FooterMain'
import AboutHeroMain from './AboutHeroSection/AboutHeroMain'
import JourneyMain from './The JourneySection/JourneyMain'
import OurvisionMain from './Our vision/OurvisionMain'


const About = () => {
  return (
    <div className='flex flex-col items-center justify-center' >
      <NavbarMain/>
      <div className='w-full flex flex-col items-center justify-center'>
        <AboutHeroMain/>
        <JourneyMain/>
        <OurvisionMain/>
      </div>
      <FooterMain/>
    </div>
  )
}

export default About
