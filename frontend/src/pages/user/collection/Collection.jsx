import React from 'react'
import CollectionItems from '../../../components/user/collection-items/CollectionItems'
import Navbar from '../../../components/user/Navbar/Navbar'
import FooterMain from '../../../components/user/Footer/FooterMain'

const Collection = () => {
  return (
    <div>
      <Navbar />

      <div>
        <CollectionItems />
      </div>

      <FooterMain />
    </div>
  )
}

export default Collection
