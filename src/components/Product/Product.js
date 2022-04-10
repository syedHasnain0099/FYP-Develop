import React, { useEffect, useState } from 'react'
import productService from '../../services/ProductService'
import { useParams } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './Product.css'
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
        setLoading(false)
        //destructuringData()
      })
      .catch((err) => {
        console.log('inside else if catch')
        console.log(err)
      })
  }
  const destructuringData = () => {
    const {
      id,
      categoryType,
      createdAt,
      description,
      duration,
      image_urls,
      name,
      quantity,
      rent,
      supplier,
    } = data[0]
    console.log('name of product', name)
    console.log('id of product', id)
  }

  const approveHandleChange = () => {
    const {
      id,
      categoryType,
      createdAt,
      description,
      duration,
      image_urls,
      name,
      quantity,
      rent,
      supplier,
    } = data[0]
    //here you will run for APPROVE
    console.log('name of product', name)
  }
  const disapproveHandleChange = () => {
    const { id } = data[0]
    //here you will run for disAPPROVE
    console.log('id of product', id)
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
          className='btn btn-outline-dark mt-2 mb-2 mr-2'
          onClick={approveHandleChange}
        >
          Approve
        </button>

        <button
          className='btn btn-outline-dark mt-2 mb-2 mr-2'
          onClick={disapproveHandleChange}
        >
          Dis-Approve
        </button>
      </>
    )
  }
  const ShowProducts = () => {
    return (
      <>
        {data.map((product) => {
          return (
            <>
              <div className='col-5 mb-3' key={product.id}>
                <div className='card h-100 text-center p-4'>
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
                    <p class='black-10'>Rs {product.rent} / per day</p>
                    <p class='black-10'>
                      Rent Maximum Duration: {product.duration}
                    </p>
                    <p className='black-9'>Category: {product.categoryType}</p>
                    <p className='black-8'>
                      {console.log(product.createdAt)}
                      Added on {moment(product.createdAt).fromNow()}
                    </p>
                    <p class='card-text'>Supplier information</p>
                    <p class='card-text'>Name: {product.supplier.username}</p>
                    <p class='card-text'>Email: {product.supplier.email}</p>
                    <p class='card-text'>
                      Contact number: 0{product.supplier.contact_number}
                    </p>

                    {showStock(product.quantity)}
                    <br />

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
