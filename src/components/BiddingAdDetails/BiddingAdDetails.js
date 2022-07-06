import React, { useEffect, useState } from 'react'
import biddingService from '../../services/BiddingService'
import { NavLink, Redirect, useParams } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './BiddingAdDetails.css'
import ProductImagesSlider from './ProductImagesSlider'
function BiddingAdDetails() {
  let { productId } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const [createdProduct, setCreatedProduct] = useState(false)
  const [createdProduct1, setCreatedProduct1] = useState(false)
  const getProducts = (productId) => {
    setLoading(true)
    biddingService
      .getOneRequestedBiddingItem(productId)
      .then((response) => {
        setData(response)
        console.log(response)
        setLoading(false)
      })
      .catch((err) => {
        console.log('inside else if catch')
        console.log(err)
      })
  }
  const approveHandleChange = () => {
    biddingService
      .acceptBiddingItem(productId)
      .then((data) => {
        setCreatedProduct(data.data.attributes.name)
        console.log('congratulations your post is added ', data)
      })
      .catch((err) => console.log(err))
  }
  const disapproveHandleChange = () => {
    biddingService
      .rejectBiddingItem(productId)
      .then((data) => {
        console.log(`the requested ad: ${data} has been deleted`)
        setRedirectToReferrer(true)
      })
      .catch((err) => console.log(err))
  }
  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to='/approve/ad'></Redirect>
    }
  }
  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={
        { height: '100px', display: createdProduct ? '' : 'none' }
        // { height: '100px' }
      }
    >
      <h2>{`${createdProduct}`} ad has been Approved</h2>
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
      <h2>Request by user to post ad is Disapproved</h2>
    </div>
  )
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
          Approve
        </button>

        <button
          className='btn btn-outline-danger mt-2 mb-2 mr-2'
          onClick={disapproveHandleChange}
        >
          Dis-Approve
        </button>
      </>
    )
  }
  const ShowProduct3 = () => {
    return (
      <>
        {data.map((product) => {
          return (
            <>
              <div
                className='container single_product show'
                style={{ margin: '0px' }}
              >
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

                        <p>
                          Availability of Product for rent: {product.duration}{' '}
                          days
                        </p>
                        <p>Product Category: {product.categoryType}</p>
                        <p>Added on {moment(product.createdAt).fromNow()}</p>

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
                            Contact number:
                            {product.supplier.contactNumber}
                          </p>
                        </div>
                      </div>
                      {showApproveButton()}
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

  useEffect(() => {
    getProducts(productId)
  }, [])
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
          {showSuccess1()}
          {showSuccess()}
          {loading ? <Loading /> : <ShowProduct3 />}
        </div>
      </div>
    </div>
  )
}

export default BiddingAdDetails
