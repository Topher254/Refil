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
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6'>
        {products.slice(0, 5).map((product) => (
          <Productcard product={product} key={product._id} />
        ))}
      </div>
    </div>
  )
}

export default BestSellers
