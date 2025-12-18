import React from 'react'
import NavbarMain from './Navbar/NavbarMain'
import FooterMain from './Footer/FooterMain'
import CollectionHeroSection from './OurCollection/CollectionHeroSection'
import OurCollectionCards from './OurCollection/OurCollectionCards'
import OurCollectionPop from './OurCollection/OurCollectionPop'

const Collection = () => {
  return (
    <div>
        <NavbarMain/>
        <div>
          <CollectionHeroSection/>
          <OurCollectionCards/>
          <OurCollectionPop/>
        </div>
        <FooterMain/>
      
    </div>
  )
}

export default Collection
