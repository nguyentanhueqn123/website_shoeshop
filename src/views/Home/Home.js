import React from 'react'
import Product from './components/Product'
import TopProduct from './components/TopProduct'
import Banner from './components/Banner'
import Coupon from './components/Coupon'
import '../../styles/home.css';

export default function Home() {

  return (
    <div className="w-screen px-4 overflow-hidden relative">
      <Banner />
      <Product />
      <TopProduct />
      <Coupon />
    </div>
  )
}
