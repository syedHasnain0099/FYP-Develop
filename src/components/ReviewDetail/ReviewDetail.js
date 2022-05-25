import React from 'react'
import ProductImagesSlider from './ProductImagesSlider'
import { Skeleton } from '@mui/material'
import moment from 'moment'
import './Product.css'
import { useEffect, useState } from 'react'
import { NavLink, Redirect, useParams } from 'react-router-dom'
import productService from '../../services/ProductService'
function ReviewDetail() {
  let { productId } = useParams()
  console.log('productId ', productId)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const [createdProduct, setCreatedProduct] = useState(false)
  const [createdProduct1, setCreatedProduct1] = useState(false)
  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to='/review/reporting'></Redirect>
    }
  }
  const reportedAds = () => {
    productService
      .getReportedAds(productId)
      .then((resolve) => {
        console.log('reported Ads: ', resolve)
        setData(resolve)
      })
      .catch((err) => {
        console.log(err)
        // setValues({ ...values, error: err })
      })
  }
  useEffect(() => {
    reportedAds()
  }, [])
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
  const showApproveButton = () => {
    return (
      <>
        <button
          className='btn btn-outline-success mt-2 mb-2 mr-2'
          onClick={approveHandleChange}
        >
          Delete Request
        </button>

        <button
          className='btn btn-outline-danger mt-2 mb-2 mr-2'
          onClick={disapproveHandleChange}
        >
          Delete Product
        </button>
      </>
    )
  }
  const approveHandleChange = () => {
    // delete requests (reason for reporting)
    productService
      .deleteReasonOfReportingOfProducts(productId)
      .then((data) => {
        console.log('deleted reason: ', data)
        setCreatedProduct1(data.data.attributes.name)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const disapproveHandleChange = () => {
    // delete product that has been reported
    productService
      .deleteProduct(productId)
      .then((data) => {
        console.log('deleted product: ', data)
        setCreatedProduct(data.data.attributes.name)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const showSuccess = () => (
    <div
      className='alert alert-danger'
      style={
        { height: '100px', display: createdProduct ? '' : 'none' }
        // { height: '100px' }
      }
    >
      <h2>{`${createdProduct}`} ad is Deleted</h2>
    </div>
  )
  const showSuccess1 = () => (
    <div
      className='alert alert-danger'
      style={
        { height: '100px', display: createdProduct1 ? '' : 'none' }
        // { height: '100px' }
      }
    >
      <h2>Request by user is Deleted</h2>
    </div>
  )
  const showProduct3 = () =>
    data.map((product) => (
      <div className='container single_product show' style={{ margin: '0px' }}>
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
                      product.reviews.map((review, index) => (
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
                            <strong>
                              {new Date(review.createdAt).toLocaleDateString()}
                            </strong>
                            {/* <strong>Date:</strong> */}
                          </li>
                          <li>
                            {console.log(review.content)}
                            <p>{review.content}</p>
                          </li>
                        </ul>
                      ))}

                    <hr />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-6'>
              <div className='product_desc_wrapper'>
                <div className='product_title'>
                  <h1>{product.name}</h1>
                  <span>
                    <h6>Reason # {product.id}</h6>
                  </span>
                  <span>
                    <h6>Reporting Reason: {product.reportingReason}</h6>
                  </span>
                  <hr />
                  <h1>Rs {product.rent} / day</h1>
                </div>

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
                  <p>Contact number: +92 {product.supplier.contactNumber}</p>
                </div>
                <hr />

                {showApproveButton()}
              </div>
            </div>
          </div>
        )}
      </div>
    ))

  return (
    <div>
      <div className='container my-1 py-1'>
        <div className='row'>
          <div className='col-12'>
            <h1 className='display-6 fw-bolder text-center'>
              Product Description
            </h1>
            <hr />
          </div>
        </div>

        <div className='row justify-content-center'>
          {showSuccess()}
          {showSuccess1()}
          {loading ? <Loading /> : showProduct3()}
        </div>
      </div>
      {redirectUser()}
    </div>
  )
}

export default ReviewDetail
