import React, { useEffect, useState } from 'react'
import productService from '../../services/ProductService'
import { useParams } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './Product.css'
function Product() {
  let pName = window.location.pathname
  let pageName = pName.split('/')
  // console.log(pageName[1])
  let { productId } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const getProducts = (productId) => {
    setLoading(true)
    if (pageName[1] === 'products') {
      productService
        .findOneProduct(productId)
        .then((response) => {
          console.log('product: ', response)

          setData(response)
          setLoading(false)
        })
        .catch((err) => {
          console.log('inside catch')
          console.log(err)
        })
    } 
    else if (pageName[1] === 'approveAds') {
      console.log("isnide else condition of approve ads")
      productService
        .findOneRequestedAd(productId)
        .then((response) => {
          console.log("requested ad details: ",response)
          setData(response)
          setLoading(false)
        })
        .catch((err) => {
          console.log('inside else if catch')
          console.log(err)
        })
    }
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
  const showGetQuoteButton = () => {
    if (pageName[1] === 'products') {
      return (
        <Link to='/'>
          <button className='btn btn-outline-dark mt-2 mb-2 mr-2'>
            Get Quote
          </button>
        </Link>
      )
    }
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
      ;<p class='lead mt-2'>Reviews and Ratings</p>
      for (let i = 0; i < reviews.length; i++) {
        ;<p class='card-text'>{reviews[i].content}</p>
      }
    }
  }
  const showApproveButton = () => {
    if (pageName[1] === 'approveAds') {
      return (
        <>
          <Link to='/'>
            <button className='btn btn-outline-dark mt-2 mb-2 mr-2'>
              Approve
            </button>
          </Link>
          <Link to='/'>
            <button className='btn btn-outline-dark mt-2 mb-2 mr-2'>
              Dis-Approve
            </button>
          </Link>
        </>
      )
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
                    <p class='black-10'>
                      Rs {product.price} / {product.duration}
                    </p>
                    <p className='black-9'>Category: {product.subCategory}</p>
                    <p className='black-8'>
                      {console.log(product.createdAt)}
                      Added on {moment(product.createdAt).fromNow()}
                    </p>

                    {/* <p class='card-text'>{product.reviews[0].content}</p> */}
                    {showReviews(product.reviews)}
                    <p class='card-text'>
                      Supplier information: {product.supplier.username}
                    </p>
                    {showStock(product.quantity)}
                    <br />
                    {showGetQuoteButton()}
                    {showApproveButton()}
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </>
    )
  }

  useEffect(() => {
    getProducts(productId)
  }, [])
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

export default Product
