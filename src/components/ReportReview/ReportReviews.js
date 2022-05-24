import React from 'react'
import ProductImagesSlider from './ProductImagesSlider'
import { Skeleton } from '@mui/material'
import moment from 'moment'
import './Product.css'
import { useEffect, useState } from 'react'
import { NavLink, Redirect, useParams } from 'react-router-dom'
import productService from '../../services/ProductService'
function ReportReviews() {
  let { productId } = useParams()
  console.log('reportid ', productId)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to='/review/reporting'></Redirect>
    }
  }
  const reportedReviews = () => {
    productService
      .getReportedReviews(productId)
      .then((resolve) => {
        console.log('reported reviews: ', resolve)
        setData(resolve)
      })
      .catch((err) => {
        console.log(err)
        // setValues({ ...values, error: err })
      })
  }
  useEffect(() => {
    reportedReviews()
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
          Delete Review
        </button>
      </>
    )
  }
  const approveHandleChange = () => {
    //delete requests (reason for reporting)
    productService
      .deleteReasonOfReportingOfReviews(productId)
      .then((data) => {
        console.log('deleted reason: ', data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const disapproveHandleChange = () => {
    //delete review (delete review that has been reported)
    productService
      .deleteReview(productId)
      .then((data) => {
        console.log('deleted review: ', data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const showProduct3 = () =>
    data.map((product) => (
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
                    <ProductImagesSlider
                      images={product.productDetails.image_urls}
                    />
                    <br />

                    <span className='description-form-input-login'>
                      <NavLink
                        to={{
                          pathname: '/product/video',
                          state: { video: product.productDetails.image_urls },
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
              </div>
            </div>
            <div className='col-sm-6'>
              <div className='product_desc_wrapper'>
                <div className='product_title'>
                  <h1>{product.productDetails.name}</h1>
                  <span>
                    <h6>Reason # {product.id}</h6>
                  </span>
                  <span>
                    <h6>Reported Review: {product.content}</h6>
                  </span>
                  <span>
                    <h6>
                      Reporting Reason: {product.productDetails.reportingReason}
                    </h6>
                  </span>
                  <hr />
                  <h1>Rs {product.productDetails.rent} / day</h1>
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
                  <p>{product.productDetails.description}</p>
                </div>
                <hr />
                <div className='desc'>
                  <h2>Supplier Information</h2>
                  <p>Name: {product.productDetails.supplier.username}</p>
                  <p>Email: {product.productDetails.supplier.email}</p>
                  <p>
                    Contact number: +92{' '}
                    {product.productDetails.supplier.contactNumber}
                  </p>
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
          {loading ? <Loading /> : showProduct3()}
        </div>
      </div>
      {redirectUser()}
    </div>
  )
}

export default ReportReviews
