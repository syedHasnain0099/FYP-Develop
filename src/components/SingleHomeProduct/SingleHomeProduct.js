import React, { useEffect, useState } from 'react'
import productService from '../../services/ProductService'
import { useParams } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './SingleHomeProduct.css'

function SingleHomeProduct() {
  let { productId } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [subCategory, setSubCategory] = useState('')
  const [relatedProducts, setRelatedProducts] = useState([])
  const getProducts = (productId) => {
    setLoading(true)
    productService
      .findOneProduct(productId)
      .then((response) => {
        console.log('product: ', response[0].subCategory)
        setSubCategory(response[0].subCategory)
        setData(response)
        setLoading(false)
      })
      .catch((err) => {
        console.log('inside catch')
        console.log(err)
      })
  }
  useEffect(() => {
    getProducts(productId)
  }, [])
  const getRelatedProducts = () => {
    console.log(subCategory)
    //here to get related products
    //set response equal to setRelatedProducts(response)
    const {
      name
    } = data[0]
    console.log("name: ",name)
    productService
      .getRelatedProducts(subCategory,name)
      .then((response) => {
        console.log("related products: ",response)
        setRelatedProducts(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getRelatedProducts()
  }, [data])
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

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='badge badge-primary badge-pill'>In Stock</span>
    ) : (
      <span className='badge badge-primary badge-pill'>Out of Stock</span>
    )
  }
  const showReviews = (reviews) => {
    if (reviews.length > 0) {
      for (let i = 0; i < reviews.length; i++) {
        return <p class='card-text'>{reviews[i].content}</p>
      }
    } else {
      return <p class='card-text'>No reviews and rating on this product</p>
    }
  }
  const ShowProducts = () => {
    return (
      <>
        {data.map((product) => {
          return (
            <>
              <div className='col-5 mb-3' key={product.id}>
                <div class='card h-100 text-center p-4'>
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
                     lead fw-bold name'
                    >
                      {product.name}
                    </h5>
                    <p class='lead mt-2'>{product.description}...</p>
                    <p class='black-10'>Rs {product.price} / per day</p>
                    <p class='black-10'>
                      Rent Maximum Duration: {product.duration}
                    </p>
                    <p className='black-9'>Category: {product.subCategory}</p>
                    <p className='black-8'>
                      {console.log(product.createdAt)}
                      Added on {moment(product.createdAt).fromNow()}
                    </p>

                    {/* <p class='card-text'>{product.reviews[0].content}</p> */}
                    <p class='lead mt-2'>Reviews and Ratings</p>
                    {showReviews(product.reviews)}
                    <p class='lead mt-2'>Supplier information</p>
                    <p class='card-text'>Name: {product.supplier.username}</p>
                    <p class='card-text'>Email: {product.supplier.email}</p>
                    <p class='card-text'>
                      Contact number: 0{product.supplier.contact_number}
                    </p>

                    {showStock(product.quantity)}
                    <br />
                    <Link to={`/getQuote/${product.id}`}>
                      <button className='btn btn-outline-dark mt-2 mb-2 mr-2'>
                        Get Quote
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </>
    )
  }

  return (
    <div>
      <div className='container my-5 py-5'>
        <div className='row'>
          <div className='col-12 mb-5'>
            <h1 className='display-6 fw-bolder text-center'>
              Product Description
            </h1>
            <hr />
          </div>
        </div>

        <div className='row justify-content-center'>
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  )
}

export default SingleHomeProduct
