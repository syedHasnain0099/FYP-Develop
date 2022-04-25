import React, { useEffect, useState } from 'react'
import productService from '../../services/ProductService'
import { NavLink, useParams } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './SingleHomeProduct.css'
import ProductImagesSlider from './ProductImagesSlider'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

function SingleHomeProduct() {
  let { productId } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [subCategory, setSubCategory] = useState('')
  const [productName, setProductName] = useState('')
  const [relatedProducts, setRelatedProducts] = useState([])
  const [searched, setSearched] = useState(false)
  let mediaType = ''
  const getProducts = (productId) => {
    setLoading(true)
    productService
      .findOneProduct(productId)
      .then((response) => {
        console.log('product: ', response[0])
        setSubCategory(response[0].subCategory)
        setProductName(response[0].name)
        //  //chechking media file type by passing it's url
        //  response[0].image_urls.map((img) => {
        //    mediaType= productService.checkMediaType(img)
        //    if (mediaType == 'image') {
        //      console.log("it's an image")
        //    } else if (mediaType == 'video') {
        //      console.log("it's a video")
        //    }
        //  })
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
    console.log('subcategory', subCategory)
    console.log('productname', productName)
    productService
      .getRelatedProducts(subCategory, productName)
      .then((response) => {
        console.log('related products: ', response)
        setRelatedProducts(response)
        setSearched(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getRelatedProducts()
  }, [productName])
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

  const searchMessage = (searched, relatedProducts) => {
    if (searched && relatedProducts.length > 0) {
      return `Found ${relatedProducts.length} related product`
    }
    if (searched && relatedProducts.length < 1) {
      return `No related products found`
    }
  }

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='badge badge-primary badge-pill'>In Stock</span>
    ) : (
      <span className='badge badge-primary badge-pill'>Out of Stock</span>
    )
  }
  const showVideo = (video) => {
    video.map((img, index) => {
      mediaType = productService.checkMediaType(img)
      if (mediaType == 'image') {
        console.log("it's an image")
      } else if (mediaType == 'video') {
        console.log("it's a video")
        console.log(index)
      }
    })
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
  const ShowProduct = () => {
    return (
      <div className='show'>
        {data.map((item) => (
          <div className='details' key={item.id}>
            <div
              style={{
                // height: '100vh',
                display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '500px',
                  backgroundColor: '#fff',
                  padding: '20px',
                }}
              >
                <ProductImagesSlider images={item.image_urls} />
                <br />

                <span className='description-form-input-login'>
                  <NavLink
                    to={{
                      pathname: '/product/video',
                      state: { video: item.image_urls },
                    }}
                    exact
                  >
                    Watch video of product
                  </NavLink>
                </span>
              </div>
            </div>
            {/* <div className='big-img'>
              <ProductImagesSlider images={item.image_urls} />
              <img src={item.image_urls[0]} alt='' />
            </div> */}

            <div className='box'>
              <div className='row'>
                <h2>{item.name}</h2>
                <span>Rs{item.rent}/ per day</span>
              </div>
              <p>{item.description}</p>
              <p>Availability of Product for rent: {item.duration} days</p>
              <p>Product Category: {item.subCategory}</p>
              <br />
              <p class='lead mt-2'>Reviews and Ratings</p>
              {showReviews(item.reviews)}
              <div className='description-product__rating'>
                {item.reviews.length > 0 &&
                  Array(item.reviews[0].rating)
                    .fill()
                    .map((_, i) => <span>&#9733;</span>)}
              </div>
              <br />
              <p class='lead mt-2'>Supplier information</p>
              <p class='card-text'>Name: {item.supplier.username}</p>
              <p class='card-text'>Email: {item.supplier.email}</p>
              <p class='card-text'>
                Contact number: 0{item.supplier.contact_number}
              </p>
              {/* <Colors colors={item.colors} /> */}

              {/* <p>{item.content}</p> */}

              {/* <Details
              Thumb images={item.src} tab={this.handleTab} myRef={this.myRef} /> */}
              <br />
              <Link to={`/getQuote/${item.id}`}>
                <button className='btn btn-outline-warning mt-2 mb-2 mr-2'>
                  Get Quote
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    )
  }
  const ShowProducts = () => {
    return (
      <>
        {relatedProducts.map((product) => {
          return (
            <>
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
                    <p class='lead mt-2'>
                      {product.description.substring(0, 20)}...
                    </p>
                    <p class='card-text'>
                      Rs.{product.price} / {product.duration}
                    </p>
                    <Link to={`/products/${product.id}`}>
                      <button className='btn btn-outline-dark mt-2 mb-2 mr-2'>
                        View Product
                      </button>
                    </Link>
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
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
      <div className='container my-5 py-5'>
        <div className='row'>
          <div className='col-12 mb-5'>
            <h1 className='display-6 fw-bolder text-center'>
              Related Products
            </h1>
            <hr />
          </div>
        </div>
        <h2 className='mt-4 mb-4'>
          {searchMessage(searched, relatedProducts)}
        </h2>
        <div className='row justify-content-center'>
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  )
}

export default SingleHomeProduct
