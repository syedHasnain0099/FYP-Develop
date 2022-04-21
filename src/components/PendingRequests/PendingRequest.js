import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userData } from '../../auth'
import quoteService from '../../services/QuoteService'
import moment from 'moment'
function PendingRequest() {
  const [pendingRequestsData, setPendingRequestsData] = useState([])
  const { id, username, email } = userData()
  const PendingRequests = () => {
    console.log('user id: ', id)
    quoteService
      .getRequestQuotes(id)
      .then((data) => {
        console.log('user requests: ', data)
        setPendingRequestsData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const onAccept = (prodId, requestingUserId) => {
    //as mentioned by ma'am we will not show issue quote form
    //calculating price
    // console.log("the date: ",pendingRequestsData)
    var start = moment(pendingRequestsData[0].startDate, "YYYY-MM-DD");
    var end = moment(pendingRequestsData[0].endDate, "YYYY-MM-DD");
    var current = moment().startOf('day');

    // Duration in days
    const duration= moment.duration(end.diff(start)).asDays()
    const price = pendingRequestsData[0].product.rent

    // calculating price per duration
    const quote = price*duration
    console.log("quote", quote);

    console.log('supplier id: ', id)
    console.log('product id: ',prodId)
    console.log('requesting user id: ',pendingRequestsData[0].requestingUser.id)
    // delete from request quotes table
    // show the requesting user on accepted requests table
    
    // quoteService
    //   .addAcceptedRequest(id)
    //   .then((data) => {
    //     console.log('user requests: ', data)
    //     setPendingRequestsData(data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }
  useEffect(() => {
    PendingRequests()
    onAccept()
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
                      <Link to={`/products/${item.id}`}>
                        <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                          Accept
                        </button>
                      </Link>
                      <Link to={`/getQuote/${item.id}`}>
                        <button className='btn btn-outline-danger mt-2 mb-2 mr-2'>
                          Reject
                        </button>
                      </Link>
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
