import React, { useEffect, useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import CheckOutSteps from '../CheckOutSteps/CheckOutSteps'
import { userData } from '../../auth'
import PaymentIcon from '@mui/icons-material/Payment'
import quoteService from '../../services/QuoteService'
import orderService from '../../services/OrderService'
import biddingService from '../../services/BiddingService'
import stripeCreditCard from '../images/stripe.png'
import shippingService from '../../services/ShippingService'
import { loadStripe } from '@stripe/stripe-js'
import { orderCreate } from '../../action/orderAction'
import Footer from '../Footer/footer'
import { useSelector } from 'react-redux'
import StripeCheckoutButton from '../StripeCheckoutButton/StripeCheckoutButton'
function BiddingPaymentCart() {
  const { id } = userData()
  let location1 = useLocation()
  let bidding_item = location1.state.bidding_item
  let bidding_price = location1.state.bidding_price
  let name = location1.state.name
  console.log('name', name)
  let image = location1.state.image
  let shippingPrice = 1000
  let taxFee = 10 * (bidding_price / 100)
  let totalPrice = bidding_price + shippingPrice + taxFee
  const [paymentShippingData, setPaymentShippingData] = useState([])
  const publishablekey =
    'pk_test_51L21M9CkQckw00WvUtYFfgcAmm9NQzQ8pI4JlVRLlIoH8jrQV9bFOuN6XBJtNFvaXbMcUueCaU2IotdF1zabgWqy00xR8aRYtZ'
  const stripePromise = loadStripe(publishablekey)
  const handleBuy = async () => {
    let total = totalPrice
    const stripe = await stripePromise
    const priceForStripe = totalPrice
    const shipping_detail = paymentShippingData.shippingId
    console.log('shipp id: ', shipping_detail)
    biddingService
      .postOrder(
        bidding_item,
        bidding_price,
        id,
        shipping_detail,
        shippingPrice,
        taxFee,
        total
      )
      .then((data) => {
        console.log('data:', data.id)
        stripe.redirectToCheckout({
          sessionId: data.id,
        })
      }).catch = (err) => {
      console.log(err)
    }
  }

  const getDetails = () => {
    console.log(id)
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
  }, [])

  return (
    <>
      <div className='container wrapper_add_to_Cart'>
        <CheckOutSteps step1 step2 step3></CheckOutSteps>

        <div className='container custom_class'>
          <h2 className='signup_title '> Details Summaries</h2>
          <div className='row'>
            <div className='col-sm-8'>
              <div className='row_loop' key={name}>
                <div className='colcart'>
                  <img src={image} className='small' />
                </div>

                <div className='colcart'>
                  <h6>{name}</h6>
                </div>

                <div className='colcart'>
                  <h6>Rs. {bidding_price}</h6>
                </div>
              </div>
            </div>
            <div className='col-sm-4'>
              <div className='shipping_details text-center pt-3'>
                <h4>Shipping</h4>
                <div className='te'>
                  <b>Name:</b> {paymentShippingData.fullName}
                </div>
                <div className=''>
                  <b>Address:</b> {paymentShippingData.address}
                </div>
                <div className=''>
                  <b>Cellphone:</b> {paymentShippingData.cellPhone}
                </div>
                <div className=''>
                  <b>Country:</b> {paymentShippingData.country}
                </div>
                <div className=''>
                  <b>City:</b> {paymentShippingData.city}
                </div>
                <div className=''>
                  <b>Postal Code:</b> {paymentShippingData.postalCode}
                </div>
              </div>

              <div className='shipping_details text-center pt-3 mt-3'>
                <h4>Order Summary</h4>
                <div className='te'>
                  <b>Items price:</b> Rs.{bidding_price}
                </div>
                <div className=''>
                  <b>Shipping Price:</b>Rs.{shippingPrice}
                </div>
                <div className=''>
                  <b>Tax price:</b>Rs.{taxFee}
                </div>
                <div className=''>
                  <b>Total: </b>Rs.{totalPrice}
                  {/* {(total = ('0' + total).slice(-2))} */}
                </div>
                <div className=''>
                  <img
                    className='img-fluid imgstripe_style'
                    src={stripeCreditCard}
                    alt='stripe payment'
                  />
                </div>
                <div className='addbtnstrip'>
                  <span className='addtocart ' onClick={handleBuy()}>
                    Pay
                    <PaymentIcon></PaymentIcon>
                    {/* <StripeCheckoutButton price={(0 + 200).slice(-2)} /> */}
                    {/* <StripeCheckoutButton price={total} /> */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BiddingPaymentCart
