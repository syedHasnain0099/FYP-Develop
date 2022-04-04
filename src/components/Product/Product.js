import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
function Product(props) {
  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)
  let { productId } = useParams()
  const loadSingleProduct = (productId) => {
    //api to fetch data of product
    //set response equals to setProduct(response)
  }
  useEffect(() => {
    console.log(productId)
    loadSingleProduct(productId)
  }, [])
  return (
    <div className='container my-5 py-5'>
      <div className='row'>
        <div className='col-12 mb-5'>
          <h1 className='display-6 fw-bolder text-center'>
            Product Description
          </h1>
          <hr />
        </div>
      </div>
      <div class='card h-100 text-center p-4' key={product.id}>
        <img
          class='card-img-top'
          src={product.image_urls[0]}
          alt={product.name}
          height='250px'
          //style={{ maxHeight: '100%', maxWidth: '100%' }}
        />
        <div class='card-body'>
          <h5 class='card-title mb-1 lead fw-bold'>{product.name}</h5>
          <p class='card-text'>{product.description}</p>
          <p class='card-text'>
            Rs {product.price} / {product.duration}
          </p>

          <Link to='/'>
            <button className='btn btn-outline-dark mt-2 mb-2 mr-2'>
              Add to cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Product
