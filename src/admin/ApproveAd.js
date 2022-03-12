import productService from '../services/ProductService'
import React from 'react'

function ApproveAd() {
  productService
  .getRequestedAds()
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
  return <div>ApproveAd</div>
}

export default ApproveAd
