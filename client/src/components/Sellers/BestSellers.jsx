import React from 'react'
import Productcard from '../Product/Productcard'
import { UseAppContext } from '../../context/context'

const BestSellers = () => {
  const { products } = UseAppContext()
  console.log("products", products)

  // Optional: handle loading
  if (!products || products.length === 0) {
    return <p className="mt-8">Loading best sellers...</p>
  }

  return (
    <div className='mt-8 mb-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      <div>
        <Productcard product={products[0]} key={products[0]._id} />
      </div>
    </div>
  )
}

export default BestSellers
