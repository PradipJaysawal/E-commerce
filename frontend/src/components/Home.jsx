import React from 'react'
import LatestProducts from './common/LatestProducts';
import FeaturedProducts from './common/FeaturedProducts';
import Layout from './common/Layout';
import Hero from './common/Hero';


const Home = () => {
  return (
    <>
    
      <Layout>
        <Hero/>
        <LatestProducts/>
        <FeaturedProducts/>
      </Layout>
 
    </>
  )
}

export default Home
