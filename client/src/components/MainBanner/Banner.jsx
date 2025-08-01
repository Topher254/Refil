import React from 'react';
import delivery_sm from '../../assets/delivery_sm.jpg';
import delivery_md from '../../assets/delivery_md.jpg';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Banner = () => {
  return (
    <div className='relative'>
      <img
        src={delivery_md}
        alt='banner'
        className='w-full hidden md:block rounded-lg'
      />
      <img
        src={delivery_sm}
        alt='banner_for_mobile'
        className='w-full md:hidden rounded-lg'
      />

      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-center text-white px-4 md:px-8'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>
          Refill your gas and water lazily, Quality You Can Trust
        </h1>

        <div className='flex items-center mt-6 gap-2 font-medium'>
          <Link
            to='/products'
            className='group flex items-center gap-2 px-7 py-2 md:px-9 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'
          >
            Order Now
            <ArrowRight className='md:hidden transition group-focus:translate-x-1' />
          </Link>
          <Link
            to='/products'
            className='group hidden md:flex items-center gap-2 px-7 py-2 md:px-9 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 transition rounded cursor-pointer'
          >
            Explore Deals
            <ArrowRight className='transition group-focus:translate-x-1' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
