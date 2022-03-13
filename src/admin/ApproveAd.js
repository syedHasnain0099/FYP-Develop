import productService from '../services/ProductService'
import React from 'react'

const subcategoryName='';
const categoryId=1;
const searchKeyword='phone'

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
const searchByKeyword = (keyword,subcategoryName) => {
  productService.search(keyword,subcategoryName)
    .then(res => {
      console.log("search results: ",res)
    })
    .catch(err => console.log(err))
}
function ApproveAd() {
  getRequestedAds();
  searchByKeyword(searchKeyword,"Mobiles");
  return <div>ApproveAd</div>
}

export default ApproveAd
