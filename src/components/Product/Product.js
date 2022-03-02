import React from 'react'
import './Product.css'
import { useStateValue } from '../StateProvider/StateProvider'
function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue()
  const addToGetQuote = () => {
    dispatch({
      type: 'ADD_TO_GETQUOTE',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    })
  }
  return (
    <div className='product'>
      <div className='prouct__info'>
        <p>{title}</p>
        <p className='product__price'>
          <small>Rs</small>
          <strong>{price}</strong>
        </p>
        <div className='product__rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span>&#9733;</span>
            ))}
        </div>
      </div>
      <img src={image} alt='' />
      <button onClick={addToGetQuote}>Get Quote</button>
    </div>
  )
}

export default Product
