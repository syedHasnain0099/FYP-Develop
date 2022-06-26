import {
  ADD_TO_CART,
  REMOVE_TO_CART,
  SAVE_SHIPPING_ADDRESS,
  CLEAR_SHIPPING_ADDRESS,
} from '../constants/cartConstants'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import quoteService from '../../src/services/QuoteService'
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  let quoteData = ''
  await quoteService
    .getProductOfQuote(id, 'accepted')
    .then((data) => {
      quoteData = data
      console.log('product details: ', quoteData)
    })
    .catch((err) => {
      console.log(err)
    })

  //const { data } = await axios.get(`/api/product/${id}`)
  //console.log("datacarAction", data)
  dispatch({
    type: ADD_TO_CART,
    payload: {
      quote_id: id,
      product: quoteData[0].id,
      name: quoteData[0].name,
      price: quoteData[0].quote,
      image: quoteData[0].image_urls[0],
      // countStock: data.product.countStock,
      // quantity,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  //toast.success("Added successfully");
}

//remove item in the cart
export const removeToCart = (id) => async (dispatch, getState) => {
  //console.log("datacarAction", data)
  dispatch({
    type: REMOVE_TO_CART,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  toast.success('Removed successfully from cart')
}

// save shipping
export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

// clear shipping address
export const clearShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CLEAR_SHIPPING_ADDRESS,
    payload: {},
  })

  localStorage.removeItem('shippingAddress')
}
