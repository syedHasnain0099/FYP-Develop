import React, { useState } from 'react'
import './GetQuote.css'
import GetQuote from './GetQuote'
import { useStateValue } from '../StateProvider/StateProvider'
function GetQuoteForm() {
  const [{ basket }] = useStateValue()
  const [isSubmitted, setIsSubmitted] = useState(false)

  function submitForm() {
    setIsSubmitted(true)
  }
  return (
    <>
      {basket.map((item) => (
        <GetQuote
          item={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
        />
      ))}
      {/* {!isSubmitted ? <GetQuote submitForm={submitForm} /> : <GetQuote />} */}
    </>
  )
}

export default GetQuoteForm
