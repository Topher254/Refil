import React from 'react'
import { categories } from '../../assets/assets'
import { UseAppContext } from '../../context/context';

const Categories = () => {
  const { navigate, selectCategory } = UseAppContext()
  
  const handleCategoryClick = (category) => {
    selectCategory(category.path.toLowerCase());
    // Navigate to products page with category filter
    navigate(`/products?category=${category.path.toLowerCase()}`);
    scrollTo(0, 0);
  }

  return (
    <div className='mt-16 mb-10'>
      <p className='text-2xl md:text-3xl font-medium'>Categories</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 mt-6 gap-6'>

        {categories.map((category, index) => (
          <div
            key={index}
            className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center shadow shadow-gray-300 hover:shadow-lg transition-shadow'
            onClick={() => handleCategoryClick(category)}
          >
            <img src={category.image} alt={category.name} className='group-hover:scale-108 transition max-w-28' />
            <p className='text-sm font-medium'>{category.name}</p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Categories