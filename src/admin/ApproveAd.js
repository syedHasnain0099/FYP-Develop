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
  const ShowProducts1 = () => {
    return (
      <>
        {data.map((product) => {
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

                    <Link to={`/approveAds/${product.id}`}>
                      <h6>Details</h6>
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
                    <p class='card-text'>Rs {product.rent} / day</p>
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
      <div className='container my-1 py-1'>
        <div className='row'>
          <div className='col-12'>
            <h1 className='display-6 fw-bolder text-center'>Approve Ads</h1>
            <hr />
          </div>
        </div>

        <div className='row justify-content-center'>
          {loading ? <Loading /> : <ShowProducts1 />}
        </div>
      </div>
    </div>
  )
}

export default ApproveAd
