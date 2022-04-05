import React, { useEffect, useState } from 'react'
import productService from '../../services/ProductService'
import { useParams } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
function Product(props) {
  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  let { productId } = useParams()
  const loadSingleProduct = (productId) => {
    console.log('come on')
    setLoading(true)
    productService
      .findOne(productId)
      .then((response) => {
        console.log('product: ', response)
        setProduct(response)
        setLoading(false)
      })
      .catch((err) => {
        console.log('inside catch')
        console.log(err)
      })
  }

  const Loading = () => {
    return (
      <>
        <div className='col-md-3'>
          <Skeleton height={350} />
        </div>
        <div className='col-md-3'>
          <Skeleton height={350} />
        </div>
        <div className='col-md-3'>
          <Skeleton height={350} />
        </div>
        <div className='col-md-3'>
          <Skeleton height={350} />
        </div>
      </>
    )
  }
  const ShowProducts = () => {
    return (
      <div className='col-4 mb-3'>
        <div class='card h-100 text-center p-4' key={product.id}>
          <img
            class='card-img-top'
            src={product.image_urls[0]}
            alt={product.name}
            height='250px'
            //style={{ maxHeight: '100%', maxWidth: '100%' }}
          />
          <div class='card-body'>
            <h5
              class='card-title mb-1
                     lead fw-bold'
            >
              {product.name}
            </h5>
            <p class='card-text'>{product.description}...</p>
            <p class='card-text'>
              Rs {product.price} / {product.duration}
            </p>
            <Link to={`/product/${product.id}`}>
              <button className='btn btn-outline-dark mt-2 mb-2 mr-2'>
                View Product
              </button>
            </Link>
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
  useEffect(() => {
    loadSingleProduct(productId)
  }, [])
  return (
    <div>
      <div className='container my-5 py-5'>
        <div className='row'>
          <div className='col-12 mb-5'>
            <h1 className='display-6 fw-bolder text-center'>Products</h1>
            <hr />
          </div>
        </div>
        <div className='row justify-content-center'>
          {loading ? Loading() : ShowProducts()}
        </div>
      </div>
    </div>
  )
}

export default Product
