import React, { useEffect, useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import CheckOutSteps from '../CheckOutSteps/CheckOutSteps'
import { userData } from '../../auth'
import quoteService from '../../services/QuoteService'
import stripeCreditCard from '../images/stripe.png'
function PaymentCart() {
  const { id, username, email } = userData()
  let location1 = useLocation()
  console.log(location1.state.productId)
  const [acceptedRequestsData, setAcceptedRequestsData] = useState([])
  const showAcceptedRequests = () => {
    console.log('supplier id: ', id)
    quoteService
      .getQuoteRequestResponse(id, 'accepted')
      .then((data) => {
        console.log('my accepted requests: ', data)
        setAcceptedRequestsData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    showAcceptedRequests()
  }, [])
  return (
    <>
      <div className='container wrapper_add_to_Cart'>
        <CheckOutSteps step1 step2 step3></CheckOutSteps>

        <div className='container custom_class'>
          <h2 className='signup_title '> Details Summaries</h2>
          <div className='row'>
            <div className='col-sm-8'>
              {acceptedRequestsData &&
                acceptedRequestsData.map((item) => (
                  <div className='row_loop' key={item.id}>
                    <div className='colcart'>
                      <img src={item.product.image_urls[0]} className='small' />
                    </div>

                    <div className='colcart'>
                      <h6>{item.product.name}</h6>
                    </div>

                    <div className='colcart'>
                      <h6>Rs.{item.product.rent} / day</h6>
                    </div>
                  </div>
                ))}
            </div>
            <div className='col-sm-4'>
              <div className='shipping_details text-center pt-3'>
                <h4>Shipping</h4>
                <div className='te'>
                  <b>Name:</b>
                  {/* {shippingAddress.fullName} */}
                </div>
                <div className=''>
                  <b>Address:</b>
                  {/* {shippingAddress.address} */}
                </div>
                <div className=''>
                  <b>Cellphone:</b>
                  {/* {shippingAddress.cellPhone} */}
                </div>
                <div className=''>
                  <b>Country:</b>
                  {/* {shippingAddress.country} */}
                </div>
                <div className=''>
                  <b>City:</b>
                  {/* {shippingAddress.city} */}
                </div>
                <div className=''>
                  <b>Postal Code:</b>
                  {/* {shippingAddress.postalCode} */}
                </div>
              </div>

              <div className='shipping_details text-center pt-3 mt-3'>
                <h4>Order Summary</h4>
                <div className='te'>
                  <b>Items price:</b>
                  {/* Rs.{item.product.rent} / day */}
                </div>
                <div className=''>
                  <b>Shipping Price:</b>
                  {/* ${cart.shippingPrice} */}
                </div>
                <div className=''>
                  <b>Tax price:</b>
                  {/* ${cart.taxPrice} */}
                </div>
                <div className=''>
                  <b>Total:</b>
                  {/* ${cart.totalPrice} */}
                </div>
                <div className=''>
                  <img
                    className='img-fluid imgstripe_style'
                    src={stripeCreditCard}
                    alt='stripe payment'
                  />
                </div>
                <div className='addbtnstrip'>
                  {/* <span className='addtocart '>
                    <StripeCheckoutButton price={cart.totalPrice} />
                  </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentCart
