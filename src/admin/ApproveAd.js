import productService from '../services/ProductService'
import React, { useEffect, useState } from 'react'
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'

function ApproveAd() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const getRequestedAds = () => {
    setLoading(true)
    productService
      .getRequestedAds()
      .then((response) => {
        console.log('requested ads', response)
        setData(response)
        setLoading(false)
      })
      .catch((err) => {
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
      <>
        {data.map((product) => {
          return (
            <>
              <div className='col-4 mb-3' key={product.id}>
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
                     lead fw-bold'
                    >
                      {product.name}
                    </h5>
                    <p class='lead mt-2'>{product.description}...</p>
                    <p class='card-text'>Rs {product.rent} / per day</p>
                    <Link to={`/approveAds/${product.id}`}>
                      <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                        View Product
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

  useEffect(() => {
    getRequestedAds()
  }, [])
  return (
    <div>
      <div className='container my-5 py-5'>
        <div className='row'>
          <div className='col-12 mb-5'>
            <h1 className='display-6 fw-bolder text-center'>Approve Ads</h1>
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

export default ApproveAd
