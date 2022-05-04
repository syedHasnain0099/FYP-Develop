import React, { useEffect, useState } from 'react'
import productService from '../../services/ProductService'
import { NavLink, useParams } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './Product.css'
import ProductImagesSlider from './ProductImagesSlider'
function Product() {
  let { productId } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const getProducts = (productId) => {
    setLoading(true)
    productService
      .findOneRequestedAd(productId)
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
    const {
      id,
      categoryTypeId,
      description,
      duration,
      image_ids,
      name,
      quantity,
      rent,
      supplier,
    } = data[0]
    console.log('supplier id: ', supplier.id)
    productService
      .uploadPost(
        name,
        description,
        rent,
        duration,
        categoryTypeId,
        quantity,
        data[0].supplier.id,
        image_ids
      )
      .then((data) => console.log('congratulations your post is added ', data))
      .catch((err) => console.log(err))
    //delete request from requested ads
    productService
      .deleteRequestedAd(id)
      .then((data) => console.log(`the requested ad: ${data} has been deleted`))
      .catch((err) => console.log(err))
  }
  const disapproveHandleChange = () => {
    const { id } = data[0]
    //send user notification
    productService
      .addRejectedAd(data[0], data[0].supplier.id)
      .then((data) => console.log(`the rejected ad: ${data}`))
      .catch((err) => console.log(err))
    //delete request from requested ads
    // productService
    //   .deleteRequestedAd(id)
    //   .then((data) => console.log(`the requested ad: ${data} has been deleted`))
    //   .catch((err) => console.log(err))
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

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='badge badge-primary badge-pill'>In Stock</span>
    ) : (
      <span className='badge badge-primary badge-pill'>Out of Stock</span>
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
                            Contact number: +92{' '}
                            {product.supplier.contact_number}
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
  const ShowProducts = () => {
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
              <p>Product Category: {item.categoryType}</p>
              <p>Added on {moment(item.createdAt).fromNow()}</p>
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
              {showApproveButton()}
            </div>
          </div>
        ))}
      </div>
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
          {loading ? <Loading /> : <ShowProduct3 />}
        </div>
      </div>
    </div>
  )
}

export default Product
