import React, { useEffect, useState } from 'react'
import { userData } from '../../auth'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import productService from '../../services/ProductService'
import quoteService from '../../services/QuoteService'
import { addItemToCart } from '../../action/cartAction'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addItem, updateItem, removeItem } from '../../auth/cartHelpers'
function MyAds() {
  const dispatch = useDispatch()
  console.log('accpeted requests.js')
  const [acceptedRequestsData, setAcceptedRequestsData] = useState([])
  const [rejectedRequestsData, setRejectedRequestsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [rejectedLoading, setRejectedLoading] = useState(false)
  const { id, username, email } = userData()
  const [createdProduct, setCreatedProduct] = useState(false)
  const [createdProduct1, setCreatedProduct1] = useState(false)
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
    console.log(id, 'request quote id that user clicked to delete')
    quoteService
      .deleteRequestQuote(id)
      .then((data) => {
        console.log('deleted request: ', data)
        setCreatedProduct(data.data.attributes.quote)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const DeleteHandleChange = (index) => {
    const { id } = rejectedRequestsData[index]
    console.log(id, 'product id that user clicked to delete')
    //delete this requestQuote
    quoteService
      .deleteRequestQuote(id)
      .then((data) => {
        setCreatedProduct1(data.data.attributes)
        console.log('deleted request: ', data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const showSuccess = () => (
    <div
      className='alert alert-danger'
      style={{ display: createdProduct ? '' : 'none' }}
    >
      <h2>quote of price {`${createdProduct}`} is rejected</h2>
    </div>
  )
  const showSuccess1 = () => (
    <div
      className='alert alert-danger'
      style={{ display: createdProduct1 ? '' : 'none' }}
    >
      <h2>Rejected Request of quote is Deleted</h2>
    </div>
  )
  // const shouldRedirect = redirect => {
  //   if (redirect) {
  //     return <Redirect to="/cart" />;
  //   }
  // };
  // const addToCart = (index) => {
  //   console.log('added', index)
  //   const product = acceptedRequestsData[index]
  //   console.log('product', product)
  //   // addItem(product, setRedirect(true))
  // }
  const addToCardHome = (index) => {
    console.log('added', index)
    const { id } = acceptedRequestsData[index]
    console.log('product', id)
    dispatch(addItemToCart(id, 1))
    toast.success('Added to shopping cart')
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
              to='/myBiddingAds'
              role='tab'
              aria-controls='home'
            >
              My Bidding Ads
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
              to='/create/bidItem'
              role='tab'
              aria-controls='home'
            >
              Post an bidding item
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
          <li class='list-group-item'>
            <Link
              class='list-group-item list-group-item-action '
              id='list-home-list'
              data-toggle='list'
              to='/orderHistory'
              role='tab'
              aria-controls='home'
            >
              Order History
            </Link>
          </li>
          <li class='list-group-item'>
            <Link
              class='list-group-item list-group-item-action '
              id='list-home-list'
              data-toggle='list'
              to='/wonItems'
              role='tab'
              aria-controls='home'
            >
              Won Bidding Items
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
                    <p class='lead mt-2'>Duration: {item.duration}</p>
                    <p class='card-text'>Start Date:{item.startDate}</p>
                    <p class='card-text'>End Date:{item.endDate}</p>
                    {/* <NavLink
                      to={{
                        pathname: '/shipping',
                        state: { productId: item.id },
                      }}
                      exact
                    >
                      <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                        Proceed to Payment
                      </button>
                    </NavLink> */}
                    <button
                      // onClick={(e) => {
                      //   addToCart(index)
                      // }}
                      onClick={(e) => addToCardHome(index)}
                      className='btn btn-outline-primary mt-2 mb-2 mr-2'
                    >
                      Add to cart
                    </button>
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
              {showSuccess()}
              {loading ? <Loading /> : <AcceptedRequests />}
            </div>
          </div>
          <h3 className='card-header'>Rejected Requests</h3>
          <div className='container my-2 py-2'>
            <div className='row justify-content-center'>
              {showSuccess1()}
              {rejectedLoading ? <Loading /> : <DisApproveAds />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAds
