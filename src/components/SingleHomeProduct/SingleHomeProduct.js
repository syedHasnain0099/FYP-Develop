import React, { useEffect, useState } from 'react'
import productService from '../../services/ProductService'
import { NavLink, useParams } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import { isAuthenticated, userData } from '../../auth'
import moment from 'moment'
import './SingleHomeProduct.css'
import ProductImagesSlider from './ProductImagesSlider'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import Rating from '../Rating/Rating'

function SingleHomeProduct() {
  let { productId } = useParams()
  const { id } = userData()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [subCategory, setSubCategory] = useState('')
  const [productName, setProductName] = useState('')
  const [relatedProducts, setRelatedProducts] = useState([])
  const [searched, setSearched] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
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

  const getAllReviews = () => {
    productService
      .getReviews(productId)
      .then((response) => {
        console.log('product reviews ', response)
      })
      .catch((err) => {
        console.log(err)
      })
  }
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
    getAllReviews()
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
  const submitRating = async (e) => {
    const userId=id;
    e.preventDefault()
    productService
      .uploadReview(comment,rating,productId,userId)
      .then((response) => {
        console.log('uploaded review: ', response)
      })
      .catch((err) => {
        console.log(err)
      })
    //rating
    //comment
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
  const ShowProduct3 = () => {
    return (
      <>
        {data.map((product) => {
          return (
            <>
              <div className='container single_product show'>
                {loading ? (
                  <Loading />
                ) : (
                  <div className='row'>
                    <div className='col-sm-6 '>
                      <div className='img_div'>
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
                            <ProductImagesSlider images={product.image_urls} />
                            <br />

                            <span className='description-form-input-login'>
                              <NavLink
                                to={{
                                  pathname: '/product/video',
                                  state: { video: product.image_urls },
                                }}
                                exact
                              >
                                Watch video of product
                              </NavLink>
                            </span>
                          </div>
                        </div>
                        {/* <img
                          className='img-fluid'
                          src={product.image_urls[0]}
                          alt=''
                        /> */}

                        <div className='review' style={{ paddingTop: '10px' }}>
                          <h4>REVIEWS</h4>

                          {product.reviews && product.reviews.length === 0 && (
                            <>
                              <div
                                class='alert alert-warning alert_warning_custom'
                                role='alert'
                                data-mdb-color='warning'
                              >
                                No review added yet
                              </div>
                            </>
                          )}

                          <div className='review_loop'>
                            {product.reviews &&
                              product.reviews.map((review) => (
                                <ul className='review_list'>
                                  <li>
                                    {/* <strong>{review.name}</strong> */}
                                    <strong>Syed Hasnain</strong>
                                  </li>
                                  <li>
                                    {Array(review.rating)
                                      .fill()
                                      .map((_, i) => (
                                        <span style={{ color: '#ffd700' }}>
                                          &#9733;
                                        </span>
                                      ))}
                                  </li>
                                  <li>
                                    {/* <strong>
                                      {new Date(
                                        review.createdAt
                                      ).toLocaleDateString()}
                                    </strong> */}
                                    <strong>Date:</strong>
                                  </li>
                                  <li>
                                    {console.log(review.content)}
                                    <p>{review.content}</p>
                                  </li>
                                </ul>
                              ))}
                            <hr />
                            <div className='review_comment'>
                              {isAuthenticated() ? (
                                <>
                                  <form
                                    className='col-sm-6  pt-5'
                                    onSubmit={submitRating}
                                  >
                                    <h4>Leave a review</h4>
                                    <div className='mb-2'>
                                      <select
                                        class='mdb-select'
                                        onChange={(e) =>
                                          setRating(e.target.value)
                                        }
                                        value={rating}
                                        required
                                      >
                                        <option value='' selected>
                                          Choose your rating
                                        </option>
                                        <option value='1'> 1 - Poor</option>
                                        <option value='2'> 2 - Fair</option>
                                        <option value='3'> 3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - Excellent</option>
                                      </select>
                                    </div>
                                    <div className='mb-4'>
                                      <label
                                        className='form-label'
                                        htmlFor='form4Example1'
                                      >
                                        Leave a comment
                                      </label>
                                      <textarea
                                        required
                                        value={comment}
                                        onChange={(e) =>
                                          setComment(e.target.value)
                                        }
                                        className='form-control'
                                        name=''
                                        id=''
                                        cols='100'
                                        rows='3'
                                        placeholder='Comment...'
                                      ></textarea>
                                    </div>
                                    <button
                                      type='submit'
                                      className='btn btn-primary btn-block mb-4'
                                    >
                                      Add review
                                    </button>
                                  </form>
                                </>
                              ) : (
                                <>
                                  Please <Link to='/login'>Sign In</Link> to
                                  leave a review
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-sm-6'>
                      <div className='product_desc_wrapper'>
                        <div className='product_title'>
                          <h1>{product.name}</h1>
                          <span>
                            <h6>Product # {product.id}</h6>
                          </span>
                          <hr />
                          <h1>Rs {product.rent} / day</h1>
                        </div>
                        <Link to={`/getQuote/${product.id}`}>
                          <button className='btn bg-cart mt-2 mb-2 mr-2'>
                            Get Quote
                          </button>
                        </Link>

                        <div className='stock'>
                          <hr />
                          <h6>
                            Status:
                            {product.quantity < 1 ? (
                              <span className='text-danger'>Out of Stock</span>
                            ) : (
                              <span className='text-success'>Available</span>
                            )}
                          </h6>
                        </div>

                        <hr />
                        <div className='desc'>
                          <h2>Description</h2>
                          <p>{product.description}</p>
                        </div>
                        <hr />
                        <div className='desc'>
                          <h2>Supplier Information</h2>
                          <p>Name: {product.supplier.username}</p>
                          <p>Email: {product.supplier.email}</p>
                          <p>
                            Contact number: +92{' '}
                            {product.supplier.contact_number}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )
        })}
      </>
    )
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
  const ShowProducts1 = () => {
    return (
      <>
        {relatedProducts.map((product) => {
          return (
            <>
              <div className='col-md-3 ' style={{ marginTop: '20px' }}>
                <div className='card-card'>
                  <div className='card-body'>
                    <div className='card-img-actions'>
                      <img
                        src={product.image_urls[0]}
                        className='card-img-top'
                        // width='96'
                        // height='350'
                        // alt=''
                        height='250px'
                      />
                    </div>
                  </div>
                  <div className='card-body bg-light text-center'>
                    <div className='mb-2'>
                      <h5 className='font-weight-bold mb-2'>
                        <Link
                          to={`/products/${product.id}`}
                          className='text-default mb-2'
                          data-abc='true'
                        >
                          {product.name}
                        </Link>
                      </h5>
                      <p class='text-muted'>
                        {product.description.substring(0, 20)}...
                      </p>
                    </div>
                    <h3 className='mb-0 font-weight-semibold'>
                      Rs {product.rent} / day
                    </h3>

                    {product.reviews.length > 0 &&
                      Array(product.reviews[0].rating)
                        .fill()
                        .map((_, i) => (
                          <span style={{ color: '#ffd700' }}>&#9733;</span>
                        ))}
                    <div className='text-muted mb-3'>
                      {product.reviews.length} reviews
                    </div>
                    <Link to={`/products/${product.id}`}>
                      <h6>Details</h6>
                    </Link>
                    <Link to={`/getQuote/${product.id}`}>
                      <button className='btn bg-cart mt-2 mb-2 mr-2'>
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
                    <p class='card-text'>Rs {product.rent} / day</p>
                    <Link to={`/products/${product.id}`}>
                      <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                        View Product
                      </button>
                    </Link>
                    <Link to={`/getQuote/${product.id}`}>
                      <button className='btn btn-outline-warning mt-2 mb-2 mr-2'>
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
          {loading ? <Loading /> : <ShowProduct3 />}
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
          {loading ? <Loading /> : <ShowProducts1 />}
        </div>
      </div>
    </div>
  )
}

export default SingleHomeProduct
