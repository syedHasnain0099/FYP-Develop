import React from 'react'
import Header from '../Header/Header'
import Home from '../Home/Home'
import Footer from '../footer/Footer'
import './product_listing.css'
// import './Product_Listing.scss'
function Product_Listing() {
  return (
    <div className='container'>
      <Header></Header>
      <Home></Home>
      <Footer></Footer>
    </div>
  )
}

export default Product_Listing
