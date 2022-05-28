import React, { useEffect, useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import CheckOutSteps from '../CheckOutSteps/CheckOutSteps'
import { userData } from '../../auth'
import quoteService from '../../services/QuoteService'
import orderService from '../../services/OrderService'
import productService from '../../services/ProductService'
import stripeCreditCard from '../images/stripe.png'
import shippingService from '../../services/ShippingService'
import StripeCheckoutButton from '../StripeCheckoutButton/StripeCheckoutButton'
function PaymentCart() {
  const { id, username, email } = userData()
  let quote_Id
  let location1 = useLocation()
  quote_Id = location1.state.productId
  const [orders, setOrders] = useState([])
  const [paymentProductData, setPaymentProductData] = useState([])
  const [paymentShippingData, setPaymentShippingData] = useState([])
  let quote = ''
  let total = ''
  // const [quote, setQuote] = useState('')

  // const handleBuy = async () => {
  //   const stripe = await stripePromise;
  //   // const productId = paymentProductData[0].id;
  //   console.log("product id: ", paymentProductData[0].id);
  //   orderService.postOrder(paymentProductData[0].id).then((data) => {
  //     console.log("client secret id: ", data.id.client_secret);
  //     // setSession(data)
  //     setclientSecretKey(data.id.client_secret);
  //     stripe
  //       .confirmCardPayment(clientSecretKey, {
  //         return_url: "http://localhost:3000",
  //       })
  //       .then(function (result) {
  //         console.log("payment result: ", result.paymentIntent);
  //       });
  //     // .then((result) => {
  //     //   console.log("payment result: ", result.paymentIntent);
  //     //   // setOrders(data);
  //     // })
  //     // .catch((err) => {
  //     //   console.log(err);
  //     // });
  //     // stripePromise.redirectToCheckout({
  //     //   sessionId: session.id,
  //     // })
  //   }).catch = (err) => {
  //     console.log(err);
  //   };
  // };
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
  }, [])
  useEffect(() => {
    getOrders()
  }, [])
  useEffect(() => {
    detailsOfQuote()
  }, [])

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
                      <h6>Rs. {(quote = item.quote)}</h6>
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
                  <b>Items price: Rs.{quote}</b>
                </div>
                <div className=''>
                  <b>Shipping Price: Rs.1000</b>
                  {/* ${cart.shippingPrice} */}
                </div>
                <div className=''>
                  <b>Tax price: Rs.500</b>
                  {/* ${cart.taxPrice} */}
                </div>
                <div className=''>
                  <b>Total: Rs.{(total = quote + 500 + 1000)}</b>
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
                  <span className='addtocart '>
                    {/* <StripeCheckoutButton price={(0 + 200).slice(-2)} /> */}
                    <StripeCheckoutButton price={total} />
                  </span>
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
