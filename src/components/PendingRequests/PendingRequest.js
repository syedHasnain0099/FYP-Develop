import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userData } from '../../auth'
import quoteService from '../../services/QuoteService'
import moment from 'moment'
function PendingRequest() {
  const [pendingRequestsData, setPendingRequestsData] = useState([])
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

  const AcceptHandleChange = () => {
    const { startDate, endDate, requestQuoteId = id } = pendingRequestsData[0]
    const { rent } = pendingRequestsData[0].product
    const productId = pendingRequestsData[0].product.id
    const { supplierId = id } = pendingRequestsData[0].product.supplier
    const { requestingUserId = id } = pendingRequestsData[0].requestingUser

    var start = moment(startDate, 'YYYY-MM-DD')
    var end = moment(endDate, 'YYYY-MM-DD')
    var current = moment().startOf('day')

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
  const RejectHandleChange = () => {
    const { quote, requestQuoteId = id } = pendingRequestsData[0]
    quoteService
      .updateQuote(quote, 'rejected', requestQuoteId)
      .then((res) => {
        console.log('accepted request: ', res)
      })
      .catch((err) => console.log(err))
    getPendingRequests()
  }

  const acceptedRequests = () => {
    quoteService
      .getRequestQuotes(id, 'accepted')
      .then((data) => {
        console.log('user requests: ', data)
        setPendingRequestsData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getPendingRequests()
    // acceptedRequests()
    // onAccept()
  }, [])
  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User Links</h4>
        <ul class='list-group list-group-flush'>
          <li class='list-group-item'>
            <Link className='nav-link' to='/myAds'>
              My Ads
            </Link>
          </li>
          <li class='list-group-item'>
            <Link className='nav-link' to={`/profile/${id}`}>
              Update Profile
            </Link>
          </li>
          <li class='list-group-item'>
            <Link className='nav-link' to='/create/product'>
              Post an ad
            </Link>
          </li>
          <li class='list-group-item'>
            <Link className='nav-link' to='/pending/requests'>
              Pending Requests
            </Link>
          </li>
        </ul>
      </div>
    )
  }
  const requestedQuotes = () => {
    return (
      <div className='card mb-5 mu-5'>
        <h3 className='card-header'> Pending Requests</h3>
        <div class='card-body'>
          {pendingRequestsData.map((item) => {
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
                        onClick={AcceptHandleChange}
                      >
                        Accept
                      </button>

                      <button
                        className='btn btn-outline-danger mt-2 mb-2 mr-2'
                        onClick={RejectHandleChange}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    )
  }
  return (
    <div className='container-fluid mt-4'>
      <div className='row'>
        <div className='col-3'>{userLinks()}</div>
        <div className='col-9'>{requestedQuotes()}</div>
      </div>
    </div>
  )
}

export default PendingRequest
