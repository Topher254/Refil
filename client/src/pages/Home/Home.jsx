import React from 'react'
import Banner from '../../components/MainBanner/Banner'
import Categories from '../../components/Categories/Categories'
import BestSellers from '../../components/Sellers/BestSellers'
import Subscribe from '../../components/Subscribe/Subscribe'

const Home = () => {
  return (
    <div className='mt-10'>
        <Banner/>
        <Categories/>
        <BestSellers/>
        <Subscribe/>

    </div>
  )
}

export default Home