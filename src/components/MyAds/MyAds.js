import React, { useEffect, useState } from 'react'
import { userData } from '../../auth'
import { Link } from 'react-router-dom'
function MyAds() {
  const [approvedData, setApprovedData] = useState([])
  const [disapprovedData, setDisApprovedData] = useState([])

  const { id, username, email } = userData()
  const showUserApprovedAds = () => {
    //get approved ads
  }
  useEffect(() => {
    showUserApprovedAds()
  }, [])
  const showUserDisApprovedAds = () => {
    //get disApproved ads
  }
  useEffect(() => {
    showUserDisApprovedAds()
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
        </ul>
      </div>
    )
  }
  const approveAds = () => {
    return (
      <div className='card mb-5 mu-5'>
        <h3 className='card-header'> Approved ads</h3>
        <div class='card-body'>
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
                        <button className='btn btn-outline-warning mt-2 mb-2 mr-2'>
                          Get Quote
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
  const rentedHistory = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Dis-Approved Ads</h3>
        <div class='card-body'>
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
                        <button className='btn btn-outline-warning mt-2 mb-2 mr-2'>
                          Get Quote
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
        <div className='col-9'>
          {approveAds()}
          {rentedHistory()}
        </div>
      </div>
    </div>
  )
}

export default MyAds
