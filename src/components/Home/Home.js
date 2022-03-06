import React, { useState } from 'react'
import { useStateValue } from '../StateProvider/StateProvider'
import product_card from '../data/product_data'
import productService from '../../services/ProductService'
import categoryService from '../../services/CategoryService'
function Home() {
  const [{ basket }, dispatch] = useStateValue()
  const addToGetQuote = (event) => {
    console.log(event.target.value)
    dispatch({
      type: 'ADD_TO_GETQUOTE',
      item: {
        id: product_card.id,
        title: product_card.title,
        image: product_card.image,
        price: product_card.price,
        rating: product_card.rating,
      },
    })
  }

  //testing service class methods
  productService.getAllAds()
    .then((response) => {
        console.log(response);
      })
    .catch((err) => {
      console.log(err)
    })

  categoryService.getCategories()
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })

  categoryService.getCategoryList('Home Appliances')
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })

  productService.getProductsByCategory('Air Purifiers')
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })

    let name = 'iphone 8 plus'
  productService.find(name)
    .then((res) => {
      console.log(res)
      return res;
    })
    .catch((err) => console.log(err))
     
  console.log(product_card)
  const listItems = product_card.map((item) => (
    <div className='card' key={item.id}>
      <div className='card_img'>
        <img src={item.thumb} />
      </div>
      <div className='card_header'>
        <h2>{item.product_name}</h2>
        <p>{item.description}</p>
        <p className='price'>
          {item.price}
          <span>{item.currency}</span>
        </p>
        <div className='btn' onClick={addToGetQuote}>
          Add to cart
        </div>
      </div>
    </div>
  ))
  return (
    <div className='main_content'>
      <h3>RenToday</h3>
      {listItems}
    </div>
  )
}

export default Home
