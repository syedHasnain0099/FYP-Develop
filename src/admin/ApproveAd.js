import productService from '../services/ProductService'
import React from 'react'

const subcategoryName='';
const categoryId=1;
const searchKeyword='phone'

const addSubCategory = (subcategoryName,categoryId) => {
  productService.addSubCategory(subcategoryName,categoryId)
    .then(data => {
      console.log(`${data} is added`)
    })
    .catch(err => console.log(err))
}
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
const searchByKeyword = (keyword) => {
  productService.search(keyword)
    .then(res => {
      console.log("search results: ",res)
    })
    .catch(err => console.log(err))
}
function ApproveAd() {
  getRequestedAds();
  searchByKeyword(searchKeyword);
  return <div>ApproveAd</div>
}

export default ApproveAd
