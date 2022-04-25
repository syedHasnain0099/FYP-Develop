import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userData } from '../../auth'
import quoteService from '../../services/QuoteService'
import moment from 'moment'
function PendingRequest() {
  const [pendingRequestsData, setPendingRequestsData] = useState([])
  const [acceptedRequestsData, setAcceptedRequestsData] = useState([])
  const { id, username, email } = userData()
  const getPendingRequests = () => {
    console.log('user id: ', id)
    quoteService
      .getRequestQuotes(id, 'pending')
      .then((data) => {
        console.log('user requests: ', data)
        setPendingRequestsData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const getAcceptedRequests = () => {
    console.log('user id: ', id)
    quoteService
      .getRequestQuotes(id, 'accepted')
      .then((data) => {
        console.log('user requests: ', data)
        setAcceptedRequestsData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const showAcceptedRequests = () => {
    console.log('supplier id: ', id)
    quoteService
      .getQuoteRequestResponse(id, 'accepted')
      .then((data) => {
        console.log('my accepted requests: ', data)
        // setAcceptedRequestsData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const showRejectedRequests = () => {
    console.log('supplier id: ', id)
    quoteService
      .getQuoteRequestResponse(id, 'rejected')
      .then((data) => {
        console.log('my rejected requests: ', data)
        // setAcceptedRequestsData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const AcceptHandleChange = (index) => {
    console.log(index)
    const {
      startDate,
      endDate,
      requestQuoteId = id,
    } = pendingRequestsData[index]
    const { rent } = pendingRequestsData[index].product
    const productId = pendingRequestsData[index].product.id
    const { supplierId = id } = pendingRequestsData[index].product.supplier
    const { requestingUserId = id } = pendingRequestsData[index].requestingUser

    var start = moment(startDate, 'YYYY-MM-DD')
    var end = moment(endDate, 'YYYY-MM-DD')
    // var current = moment().startOf('day')

    const duration = moment.duration(end.diff(start)).asDays()
    const price = rent

    const quote = price * duration
    console.log('quote', quote)
    console.log('supplier id: ', supplierId)
    console.log('product id: ', productId)
    console.log('requesting user id: ', requestingUserId)
    console.log('request Quote id: ', requestQuoteId)

    quoteService
      .updateQuote(quote, 'accepted', requestQuoteId)
      .then((res) => {
        console.log('accepted request: ', res)
      })
      .catch((err) => console.log(err))
    getPendingRequests()
  }
  const RejectHandleChange = (index) => {
    const { quote, requestQuoteId = id } = pendingRequestsData[index]
    quoteService
      .updateQuote(quote, 'rejected', requestQuoteId)
      .then((res) => {
        console.log('rejected requests: ', res)
      })
      .catch((err) => console.log(err))
    getPendingRequests()
    getAcceptedRequests()
  }

  useEffect(() => {
    getPendingRequests()
    getAcceptedRequests()
    // showAcceptedRequests()
    // showRejectedRequests()
  }, [])
  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User Links</h4>
        <ul class='list-group list-group-flush'>
          {/* <li class='list-group-item list-group-item-action active'>
            <Link className='nav-link' to='/myAds'>
              My Ads
            </Link>
          </li> */}
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
          {/* <li class='list-group-item'>
            <Link className='nav-link' to={`/profile/${id}`}>
              Update Profile
            </Link>
          </li> */}
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
          {/* <li class='list-group-item'>
            <Link className='nav-link' to='/create/product'>
              Post an ad
            </Link>
          </li> */}
          <li class='list-group-item'>
            <Link
              class='list-group-item list-group-item-action active'
              id='list-home-list'
              data-toggle='list'
              to='/pending/requests'
              role='tab'
              aria-controls='home'
            >
              Recieved Requests
            </Link>
          </li>
          {/* <li class='list-group-item'>
            <Link className='nav-link' to='/pending/requests'>
              Recieved Requests
            </Link>
          </li> */}
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
          {/* <li class='list-group-item'>
            <Link className='nav-link' to='/acceptedRequests'>
              Recieved Responses
            </Link>
          </li> */}
        </ul>
      </div>
    )
  }
  const requestedQuotes = () => {
    return (
      <>
        {pendingRequestsData.map((item, index) => {
          return (
            <>
              <div className='col-4 mb-3'>
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
                      className='btn btn-outline-primary mt-2 mb-2 mr-2'
                      onClick={(e) => {
                        AcceptHandleChange(index)
                      }}
                    >
                      Accept
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
  const AcceptedQuotes = () => {
    return (
      <>
        {acceptedRequestsData.map((item) => {
          return (
            <>
              <div className='col-4 mb-3'>
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
          <h3 className='card-header'>Pending Requests</h3>
          <div className='container my-2 py-2'>
            <div className='row justify-content-center'>
              {requestedQuotes()}
            </div>
          </div>
          <h3 className='card-header'>Accepted Requests</h3>
          <div className='container my-2 py-2'>
            <div className='row justify-content-center'>{AcceptedQuotes()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PendingRequest
