import React from 'react'
import { useEffect, useState } from 'react'
import orderService from '../../services/OrderService'

function PaymentSuccess() {
  // const [checkoutSession, setCheckoutSession] = useState("");
  const resetCode = window.location.href
  const myArray = resetCode.split(
    'http://localhost:3000/payment/success?session_id='
  )
  console.log(myArray[1])
  const confirmPayment = async () => {
    const checkoutSession =
      'cs_test_a1FMOcnLEYKcZxy9F7w9FfFesKgZuyBvg9DrU8rftmgNsfDBB9a8fliCze'
    console.log('checkout_session: ', checkoutSession)
    orderService
      .confirmOrder(checkoutSession)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    confirmPayment()
  }, [])
  return (
    <>
      <div className='container' style={{ padding: '100px 0' }}>
        <h1 className='text-center'>Order Confirmation</h1>
        <div className='bg'>
          <div className='card' style={{ paddingTop: '66px' }}>
            <span className='card__success'>
              <i className='fa fa-check'></i>
            </span>

            <h1 className='card__msg'>Payment Complete</h1>
            <h2 className='card__submsg'>Thank you for choosing us!</h2>

            <div className='card__body'></div>

            <div className='card__tags'>
              <span className='card__tag'>completed</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentSuccess
