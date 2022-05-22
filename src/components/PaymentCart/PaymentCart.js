import React, { useEffect, useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import CheckOutSteps from '../CheckOutSteps/CheckOutSteps'
import { userData } from '../../auth'
import quoteService from '../../services/QuoteService'
import orderService from '../../services/OrderService'
import productService from '../../services/ProductService'
import stripeCreditCard from '../images/stripe.png'
import shippingService from '../../services/ShippingService'
import { loadStripe } from '@stripe/stripe-js'

function PaymentCart() {
  const STRIPE_PK =
    'pk_test_51L21M9CkQckw00WvUtYFfgcAmm9NQzQ8pI4JlVRLlIoH8jrQV9bFOuN6XBJtNFvaXbMcUueCaU2IotdF1zabgWqy00xR8aRYtZ'
  const stripePromise = loadStripe(STRIPE_PK)

  const { id, username, email } = userData()
  let quote_Id
  let location1 = useLocation()
  quote_Id = location1.state.productId
  const [session, setSession] = useState('')
  const [orders, setOrders] = useState([])
  const [paymentProductData, setPaymentProductData] = useState([])
  const [paymentShippingData, setPaymentShippingData] = useState([])

  const handleBuy = async () => {
    // const stripe = await stripePromise
    const productId = paymentProductData[0].id
    console.log('product id: ', productId)
    orderService.postOrder(productId).then((data) => {
      console.log('posted order: ', data)
      setSession(data)
      stripePromise.redirectToCheckout({
        sessionId: session.id,
      })
    }).catch = (err) => {
      console.log(err)
    }
  }
  const getOrders = () => {
    orderService
      .getOrders(id, 'paid')
      .then((data) => {
        console.log('order details: ', data)
        setOrders(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const getDetails = () => {
    console.log('quote id: ', quote_Id)
    quoteService
      .getProductOfQuote(quote_Id, 'accepted')
      .then((data) => {
        console.log('product details: ', data)
        setPaymentProductData(data)
      })
      .catch((err) => {
        console.log(err)
      })

    console.log('quote id: ', quote_Id)

    shippingService
      .getShippingDetail(id)
      .then((data) => {
        console.log('shipping details: ', data)
        setPaymentShippingData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getDetails()
    getOrders()
    handleBuy()
  }, [])
  // useEffect(() => {
  //   showAcceptedRequests()
  // }, [])
  useEffect(() => {
    detailsOfQuote()
  }, [])
  const detailsOfQuote = () => {
    quoteService
      .getProductOfQuote(quote_Id, 'accepted')
      .then((data) => {
        console.log('product details: ', data)
        setPaymentProductData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <div className='container wrapper_add_to_Cart'>
        <CheckOutSteps step1 step2 step3></CheckOutSteps>

        <div className='container custom_class'>
          <h2 className='signup_title '> Details Summaries</h2>
          <div className='row'>
            <div className='col-sm-8'>
              {paymentProductData &&
                paymentProductData.map((item) => (
                  <div className='row_loop' key={item.id}>
                    <div className='colcart'>
                      <img src={item.image_urls[0]} className='small' />
                    </div>

                    <div className='colcart'>
                      <h6>{item.name}</h6>
                    </div>

                    <div className='colcart'>
                      <h6>Rs.{item.rent} / day</h6>
                    </div>
                  </div>
                ))}
            </div>
            <div className='col-sm-4'>
              <div className='shipping_details text-center pt-3'>
                <h4>Shipping</h4>
                <div className='te'>
                  <b>Name:</b>
                  {paymentShippingData.fullName}
                </div>
                <div className=''>
                  <b>Address:</b>
                  {paymentShippingData.address}
                </div>
                <div className=''>
                  <b>Cellphone:</b>
                  {paymentShippingData.cellno}
                </div>
                <div className=''>
                  <b>Country:</b>
                  {paymentShippingData.country}
                </div>
                <div className=''>
                  <b>City:</b>
                  {paymentShippingData.city}
                </div>
                <div className=''>
                  <b>Postal Code:</b>
                  {paymentShippingData.postalCode}
                </div>
              </div>

              <div className='shipping_details text-center pt-3 mt-3'>
                <h4>Order Summary</h4>
                <div className='te'>
                  <b>Items price:</b>
                  {/* Rs.{(paymentProductData[0].rent*paymentProductData[0].duration) * paymentProductData[0].quantity} */}
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
              {paymentProductData &&
                paymentProductData.map((item) => (
                  <div className='shipping_details text-center pt-3 mt-3'>
                    <h4>Order Summary</h4>
                    <div className='te'>
                      <b>Items price:</b>
                      Rs.
                      {/* {paymentProductData[0].rent *
                    paymentProductData[0].duration *
                    paymentProductData[0].quantity} */}
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
              {/* ))} */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentCart
