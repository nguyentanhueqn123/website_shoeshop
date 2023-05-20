import React from 'react'
import { Link } from 'react-router-dom';

// import News from './components/News'
// import Collect from './components/Collect'
// import Product from './components/Product'
import TopProduct from './components/TopProduct'
import Banner from './components/Banner'
import Coupon from './components/Coupon'
import '../../styles/home.css';

export default function Home() {

  return (
    <div className="w-screen overflow-hidden relative">
      <Banner />
      {/* <Collect /> */}
      {/* <Product /> */}
      <TopProduct />
      <Coupon />
      {/* <News /> */}
      {/* <h1 className="h1 items-center text-center">Huenguyenpichu1</h1>
      <div className="text-center">
        <Link to="/login" className="underline">Đăng nhập ở đây này</Link>
      </div> */}
    </div>
  )
}
