import React from 'react'
import Header from '../Header/Header'
import Home from '../Home/Home'
import Footer from '../Footer/Footer'
import './Product_Listing.css'
// import './Product_Listing.scss'
function product_listing() {
  return (
    <div className='container'>
      <Header></Header>
      <Home></Home>
      <Footer></Footer>
    </div>
  )
}

export default product_listing
