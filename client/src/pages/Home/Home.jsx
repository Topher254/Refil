import React from 'react'
import Banner from '../../components/MainBanner/Banner'
import Categories from '../../components/Categories/Categories'
import BestSellers from '../../components/Sellers/BestSellers'
import Subscribe from '../../components/Subscribe/Subscribe'
import TrustIndicators from '../../components/TrustIndicators/TrustIndicators'
import Testimonials from '../../components/Testimonials/Testimonials'
import UrgencySection from '../../components/UrgencySection/UrgencySection'
import SocialProof from '../../components/SocialProof/SocialProof'

const Home = () => {
  return (
    <div className='mt-10'>
        <Banner/>
        <TrustIndicators/>
        <Categories/>
        <BestSellers/>
        <UrgencySection/>
        <Testimonials/>
        <SocialProof/>
        <Subscribe/>
    </div>
  )
}

export default Home