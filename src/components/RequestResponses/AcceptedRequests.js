import React, { useEffect, useState } from 'react'
import { userData } from '../../auth'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import productService from '../../services/ProductService'
import quoteService from '../../services/QuoteService'
function MyAds() {
  const [acceptedRequestsData, setAcceptedRequestsData] = useState([])
  const [rejectedRequestsData, setRejectedRequestsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [rejectedLoading, setRejectedLoading] = useState(false)
  const { id, username, email } = userData()

  const showAcceptedRequests = () => {
    setLoading(true)
    console.log('supplier id: ', id)
    quoteService
      .getQuoteRequestResponse(id, 'accepted')
      .then((data) => {
        console.log('my accepted requests: ', data)
        setAcceptedRequestsData(data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const showRejectedRequests = () => {
    setRejectedLoading(true)
    quoteService
      .getQuoteRequestResponse(id, 'rejected')
      .then((data) => {
        console.log('my rejected requests: ', data)
        setRejectedRequestsData(data)
        setRejectedLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    showAcceptedRequests()
  }, [])
  useEffect(() => {
    showRejectedRequests()
  }, [])
  const RejectHandleChange = (index) => {
    const { id } = acceptedRequestsData[index]
    console.log(id, 'product id that user clicked to delete')
  }
  const DeleteHandleChange = (index) => {
    const { id } = rejectedRequestsData[index]
    console.log(id, 'product id that user clicked to delete')
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
  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User Links</h4>
        <ul class='list-group list-group-flush'>
          <li class='list-group-item'>
            <Link
              class='list-group-item list-group-item-action '
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
              class='list-group-item list-group-item-action active'
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
  const AcceptedRequests = () => {
    return (
      <>
        {acceptedRequestsData.map((item, index) => {
          return (
            <>
              <div className='col-md-5' style={{ marginTop: '20px' }}>
                <div class='card h-100 text-center p-4' key={item.id}>
                  <img
                    class='card-img-top'
                    src={item.product.image_urls[0]}
                    alt={item.product.name}
                    height='250px'
                    //style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                  <div class='card-body'>
                    <h5
                      class='card-title mb-1
                     lead fw-bold'
                    >
                      {item.product.name}
                    </h5>
                    <p class='lead mt-2'>
                      {item.product.description.substring(0, 20)}...
                    </p>
                    <p class='lead mt-2'>Quote: Rs.{item.quote}</p>
                    <p class='lead mt-2'>City: {item.city}</p>
                    <p class='lead mt-2'>Quantity: {item.quantity}</p>
                    <p class='lead mt-2'>Duration</p>
                    <p class='card-text'>Start Date:{item.startDate}</p>
                    <p class='card-text'>End Date:{item.endDate}</p>
                    <NavLink
                      to={{
                        pathname: '/shipping',
                        state: { productId: item.id },
                      }}
                      exact
                    >
                      <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                        Proceed to Payment
                      </button>
                    </NavLink>
                    <button
                      className='btn btn-outline-danger mt-2 mb-2 mr-2'
                      onClick={(e) => {
                        RejectHandleChange(index)
                      }}
                    >
                      Reject
                    </button>
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
        {rejectedRequestsData.map((item, index) => {
          return (
            <>
              <div className='col-md-5' style={{ marginTop: '20px' }}>
                <div class='card h-100 text-center p-4' key={item.id}>
                  <img
                    class='card-img-top'
                    src={item.product.image_urls[0]}
                    alt={item.product.name}
                    height='250px'
                    //style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                  <div class='card-body'>
                    <h5
                      class='card-title mb-1
                     lead fw-bold'
                    >
                      {item.product.name}
                    </h5>
                    <p class='lead mt-2'>
                      {item.product.description.substring(0, 20)}...
                    </p>
                    <p class='card-text'>Rs.{item.product.rent} / day</p>
                    <p class='lead mt-2'>City: {item.city}</p>
                    <p class='lead mt-2'>Quantity: {item.quantity}</p>
                    <p class='lead mt-2'>Duration</p>
                    <p class='card-text'>Start Date:{item.startDate}</p>
                    <p class='card-text'>End Date:{item.endDate}</p>
                    <button
                      className='btn btn-outline-danger mt-2 mb-2 mr-2'
                      onClick={(e) => {
                        DeleteHandleChange(index)
                      }}
                    >
                      Delete
                    </button>
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
          <h3 className='card-header'>Accepted Requests</h3>
          <div className='container my-2 py-2'>
            <div className='row justify-content-center'>
              {loading ? <Loading /> : <AcceptedRequests />}
            </div>
          </div>
          <h3 className='card-header'>Rejected Requests</h3>
          <div className='container my-2 py-2'>
            <div className='row justify-content-center'>
              {rejectedLoading ? <Loading /> : <DisApproveAds />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAds
