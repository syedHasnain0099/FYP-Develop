import React, { useEffect, useState } from 'react'
import { userData } from '../../auth'
import { Link } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import productService from '../../services/ProductService'
function MyAds() {
  const [approvedData, setApprovedData] = useState([])
  const [disapprovedData, setDisApprovedData] = useState([])
  const [loading, setLoading] = useState(false)
  const { id, username, email } = userData()
  const showUserApprovedAds = () => {
    productService
      .getUserAds(id)
      .then((data) => {
        console.log('user accepted ads: ', data)
        setApprovedData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    showUserApprovedAds()
  }, [])
  const showUserDisApprovedAds = () => {
    productService
      .getRejectedAds(id)
      .then((data) => {
        console.log('user rejected ads: ', data)
        setDisApprovedData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    showUserDisApprovedAds()
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

  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User Links</h4>
        <ul class='list-group list-group-flush'>
          <li class='list-group-item'>
            <Link
              class='list-group-item list-group-item-action active'
              id='list-home-list'
              data-toggle='list'
              to='/myAds'
              role='tab'
              aria-controls='home'
            >
              My Ads
            </Link>
          </li>
          <li class='list-group-item'>
            <Link
              class='list-group-item list-group-item-action '
              id='list-home-list'
              data-toggle='list'
              to={`/profile/${id}`}
              role='tab'
              aria-controls='home'
            >
              Update Profile
            </Link>
          </li>

          <li class='list-group-item'>
            <Link
              class='list-group-item list-group-item-action '
              id='list-home-list'
              data-toggle='list'
              to='/create/product'
              role='tab'
              aria-controls='home'
            >
              Post an ad
            </Link>
          </li>

          <li class='list-group-item'>
            <Link
              class='list-group-item list-group-item-action '
              id='list-home-list'
              data-toggle='list'
              to='/pending/requests'
              role='tab'
              aria-controls='home'
            >
              Recieved Requests
            </Link>
          </li>

          <li class='list-group-item'>
            <Link
              class='list-group-item list-group-item-action '
              id='list-home-list'
              data-toggle='list'
              to='/acceptedRequests'
              role='tab'
              aria-controls='home'
            >
              Recieved Responses
            </Link>
          </li>
        </ul>
      </div>
    )
  }
  const ApproveAds = () => {
    return (
      <>
        {approvedData.map((product) => {
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
                    <p class='lead mt-2'>{product.description}...</p>
                    <p class='card-text'>Rs {product.rent} / per day</p>
                    <Link to={`/products/${product.id}`}>
                      <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                        View Product
                      </button>
                    </Link>
                    <Link to={`/productEdit/${product.id}`}>
                      <button className='btn btn-outline-warning mt-2 mb-2 mr-2'>
                        Edit Product
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
  const DisApproveAds = () => {
    return (
      <>
        {disapprovedData.map((product) => {
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
                    <p class='card-text'>Rs {product.rent} / per day</p>
                    <Link to={`/products/${product.id}`}>
                      <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                        View Product
                      </button>
                    </Link>
                    <Link to={`/getQuote/${product.id}`}>
                      <button className='btn btn-outline-danger mt-2 mb-2 mr-2'>
                        Delete Product
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
  const DisApproveAds1 = () => {
    return (
      <>
        {disapprovedData.map((product) => {
          return (
            <>
              <div className='col-md-4 ' style={{ marginTop: '20px' }}>
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
                    <br />
                    <Link to={`/products/${product.id}`}>
                      <h6>Details</h6>
                    </Link>
                    <Link to={`/getQuote/${product.id}`}>
                      <button className='btn btn-outline-danger mt-2 mb-2 mr-2'>
                        Delete Product
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
  const ApproveAds1 = () => {
    return (
      <>
        {approvedData.map((product) => {
          return (
            <>
              <div className='col-md-4 ' style={{ marginTop: '20px' }}>
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
                    <br />
                    <Link to={`/products/${product.id}`}>
                      <h6>Details</h6>
                    </Link>
                    <Link to={`/productEdit/${product.id}`}>
                      <button className='btn btn-outline-warning mt-2 mb-2 mr-2'>
                        Edit Product
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
    <div className='container-fluid mt-4'>
      <div className='row'>
        <div className='col-3'>{userLinks()}</div>
        <div className='col-9'>
          <h3 className='card-header'>Approved Ads</h3>
          <div className='container my-2 py-2'>
            <div className='row justify-content-center'>
              {loading ? <Loading /> : <ApproveAds1 />}
            </div>
          </div>
          <h3 className='card-header'>Disapproved Ads</h3>
          <div className='container my-2 py-2'>
            <div className='row justify-content-center'>
              {loading ? <Loading /> : <DisApproveAds1 />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAds
