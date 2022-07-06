import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import CheckOutSteps from "../CheckOutSteps/CheckOutSteps";
import { userData } from "../../auth";
import PaymentIcon from "@mui/icons-material/Payment";
import quoteService from "../../services/QuoteService";
import orderService from "../../services/OrderService";
import productService from "../../services/ProductService";
import stripeCreditCard from "../images/stripe.png";
import shippingService from "../../services/ShippingService";
import { loadStripe } from "@stripe/stripe-js";
import { orderCreate } from "../../action/orderAction";
import Footer from "../Footer/footer";
import { useSelector } from "react-redux";
import StripeCheckoutButton from "../StripeCheckoutButton/StripeCheckoutButton";
function PaymentCart() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;
  const twoDecimalsNumber = (num) =>
    Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = twoDecimalsNumber(
    cart.cartItems.reduce((a, c) => a + c.price, 0)
  );
  cart.securityFee = twoDecimalsNumber(
    cart.itemsPrice > 200 ? 0 : (25 / 100) * cart.itemsPrice
  );
  console.log("security fee", cart.securityFee);
  cart.shippingPrice = twoDecimalsNumber(cart.itemsPrice > 200 ? 0 : 500);
  cart.taxPrice = twoDecimalsNumber(cart.itemsPrice * 0.05);
  cart.totalPrice = twoDecimalsNumber(
    cart.itemsPrice + cart.shippingPrice + cart.taxPrice + cart.securityFee
  );

  const { id } = userData();
  // let quote_Id
  // let location1 = useLocation()
  // quote_Id = location1.state.productId
  // const [orders, setOrders] = useState([])
  // const [paymentProductData, setPaymentProductData] = useState([])
  const [paymentShippingData, setPaymentShippingData] = useState([]);
  // let quote = ''
  // let total = ''
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
  const publishablekey =
    "pk_test_51L21M9CkQckw00WvUtYFfgcAmm9NQzQ8pI4JlVRLlIoH8jrQV9bFOuN6XBJtNFvaXbMcUueCaU2IotdF1zabgWqy00xR8aRYtZ";
  const stripePromise = loadStripe(publishablekey);
  const handleBuy = async () => {
    const stripe = await stripePromise;
    const priceForStripe = cart.totalPrice;
    const productId = cartItems[0].product;
    const quoteId = cartItems[0].quote_id;
    console.log("product id: ", productId);
    console.log("user id: ", id);
    console.log("total: ", priceForStripe);
    console.log("quote id: ", quoteId);
    const shippId = paymentShippingData.shippingId;
    console.log("shipp id: ", shippId);
    orderService
      .postOrder(
        quoteId,
        cart.itemsPrice,
        id,
        shippId,
        cart.shippingPrice,
        cart.taxPrice,
        cart.securityFee,
        priceForStripe
      )
      .then((data) => {
        console.log("data:", data.id);
        stripe.redirectToCheckout({
          sessionId: data.id,
        });
      }).catch = (err) => {
      console.log(err);
    };
  };
  // const detailsOfQuote = () => {
  //   quoteService
  //     .getProductOfQuote(quote_Id, 'accepted')
  //     .then((data) => {
  //       console.log('product details: ', data)
  //       setPaymentProductData(data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }
  // const getOrders = () => {
  //   orderService
  //     .getOrders(id, 'paid')
  //     .then((data) => {
  //       console.log('order details: ', data)
  //       setOrders(data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }
  const getDetails = () => {
    console.log(id);
    //   console.log('quote id: ', quote_Id)
    //   quoteService
    //     .getProductOfQuote(quote_Id, 'accepted')
    //     .then((data) => {
    //       console.log('product details: ', data)
    //       setPaymentProductData(data)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })

    //   console.log('quote id: ', quote_Id)

    shippingService
      .getShippingDetail(id)
      .then((data) => {
        console.log("shipping details: ", data);
        setPaymentShippingData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getDetails();
  }, []);
  // useEffect(() => {
  //   getOrders()
  // }, [])
  // useEffect(() => {
  //   detailsOfQuote()
  // }, [])

  return (
    <>
      <div className="container wrapper_add_to_Cart">
        <CheckOutSteps step1 step2 step3></CheckOutSteps>

        <div className="container custom_class">
          <h2 className="signup_title "> Details Summaries</h2>
          <div className="row">
            <div className="col-sm-8">
              {cartItems &&
                cartItems.map((item) => (
                  <div className="row_loop" key={item.id}>
                    <div className="colcart">
                      <img src={item.image} className="small" />
                    </div>

                    <div className="colcart">
                      <h6>{item.name}</h6>
                    </div>

                    <div className="colcart">
                      <h6>Rs. {item.price}</h6>
                    </div>
                  </div>
                ))}
            </div>
            <div className="col-sm-4">
              <div className="shipping_details text-center pt-3">
                <h4>Shipping</h4>
                <div className="te">
                  <b>Name:</b> {shippingAddress.fullName}
                </div>
                <div className="">
                  <b>Address:</b> {shippingAddress.address}
                </div>
                <div className="">
                  <b>Cellphone:</b> {shippingAddress.cellPhone}
                </div>
                <div className="">
                  <b>Country:</b> {shippingAddress.country}
                </div>
                <div className="">
                  <b>City:</b> {shippingAddress.city}
                </div>
                <div className="">
                  <b>Postal Code:</b> {shippingAddress.postalCode}
                </div>
              </div>

              <div className="shipping_details text-center pt-3 mt-3">
                <h4>Order Summary</h4>
                <div className="te">
                  <b>Items price:</b> ${cart.itemsPrice}
                </div>
                <div className="">
                  <b>Security Fee:</b>${cart.securityFee}
                </div>
                <div className="">
                  <b>Shipping Price:</b>${cart.shippingPrice}
                </div>
                <div className="">
                  <b>Tax price:</b>${cart.taxPrice}
                </div>
                <div className="">
                  <b>Total: </b>${cart.totalPrice}
                  {/* {(total = ('0' + total).slice(-2))} */}
                </div>
                <div className="">
                  <img
                    className="img-fluid imgstripe_style"
                    src={stripeCreditCard}
                    alt="stripe payment"
                  />
                </div>
                <div className="addbtnstrip">
                  <span className="addtocart " onClick={handleBuy}>
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
  );
}

export default PaymentCart;
