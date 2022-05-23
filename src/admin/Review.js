import React, { useEffect, useState } from 'react'
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import productService from '../services/ProductService'
function Review() {
  const [loading, setLoading] = useState(false)
  const [reportedReviewsData, setReportedReviewsData] = useState([])
  const [reportedAdsData, setReportedAdsData] = useState([])
  const reportedAds = () => {
    productService
      .getReportedAds()
      .then((resolve) => {
        console.log('reported Ads: ', resolve)
        setReportedAdsData(resolve)
      })
      .catch((err) => {
        console.log(err)
        // setValues({ ...values, error: err })
      })
  }
  useEffect(() => {
    reportedAds()
  }, [])
  const reportedReviews = () => {
    productService
      .getReportedReviews()
      .then((resolve) => {
        console.log('reported reviews: ', resolve)
        setReportedReviewsData(resolve)
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
  const ShowReviews = () => {
    return (
      <>
        {reportedReviewsData.map((product) => {
          return (
            <>
              <div className='col-md-3 ' style={{ marginTop: '20px' }}>
                <div className='card-card'>
                  <div className='card-body'>
                    <div className='card-img-actions'>
                      <img
                        src={product.productDetails.image_urls[0]}
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
                          to={`/reportReviews/${product.id}`}
                          className='text-default mb-2'
                          data-abc='true'
                        >
                          {product.productDetails.name}
                        </Link>
                      </h5>
                      <p class='text-muted'>
                        {product.productDetails.description.substring(0, 20)}...
                      </p>
                    </div>
                    <h3 className='mb-0 font-weight-semibold'>
                      {product.reporting_reason}
                    </h3>

                    <Link to={`/reportReviews/${product.id}`}>
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
  const ShowReportedAds = () => {
    return (
      <>
        {reportedAdsData.map((product) => {
          return (
            <>
              <div className='col-md-3 ' style={{ marginTop: '20px' }}>
                <div className='card-card'>
                  <div className='card-body'>
                    <div className='card-img-actions'>
                      <img
                        src={product.image_urls[0]}
                        className='card-img-top'
                        // width="96"
                        // height="350"
                        // alt=""
                        height='250px'
                      />
                    </div>
                  </div>
                  <div className='card-body bg-light text-center'>
                    <div className='mb-2'>
                      <h5 className='font-weight-bold mb-2'>
                        <Link
                          to={`/reviewAds/${product.id}`}
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
                      {product.reportingReason}
                    </h3>

                    <Link to={`/reviewAds/${product.id}`}>
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
  return (
    <div>
      <div className='container my-5 py-5'>
        <div className='row'>
          <div className='col-12 mb-5'>
            <h1 className='display-6 fw-bolder text-center'>
              Review Reporting Ads
            </h1>
            <hr />
          </div>
        </div>

        <div className='row justify-content-center'>
          {loading ? <Loading /> : <ShowReportedAds />}
        </div>
        <br />
        <div className='row'>
          <div className='col-12 mb-5'>
            <h1 className='display-6 fw-bolder text-center'>
              Review Reporting Reviews
            </h1>
            <hr />
          </div>
        </div>
        <div className='row justify-content-center'>
          {loading ? <Loading /> : <ShowReviews />}
        </div>
      </div>
    </div>
  )
}

export default Review
