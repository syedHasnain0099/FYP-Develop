import productService from '../services/ProductService'
import React, { useEffect } from 'react'

function ApproveAd() {
  const getRequestedAds = () => {
    productService
      .getRequestedAds()
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getRequestedAds()
  }, [])
  return <div>ApproveAd</div>
}

export default ApproveAd
