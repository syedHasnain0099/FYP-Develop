import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
// import axios from 'axios'
// import { useDispatch, useSelector } from 'react-redux'
// import { orderCreate } from '../action/orderAction'
import { loadStripe } from "@stripe/stripe-js";
import { userData } from "../../auth";
import productService from "../../services/ProductService";
import orderService from "../../services/OrderService";
import { useHistory } from "react-router-dom";

const StripeCheckoutButton = ({ price }) => {
  const { id } = userData();
  const productId = "29";
  const shippId = 1;
  const priceForStripe = price * 100;
  console.log("price: ", priceForStripe);
  const publishablekey =
    "pk_test_51L21M9CkQckw00WvUtYFfgcAmm9NQzQ8pI4JlVRLlIoH8jrQV9bFOuN6XBJtNFvaXbMcUueCaU2IotdF1zabgWqy00xR8aRYtZ";

  // const publishablekey =
  //   "pk_test_51L21M9CkQckw00WvUtYFfgcAmm9NQzQ8pI4JlVRLlIoH8jrQV9bFOuN6XBJtNFvaXbMcUueCaU2IotdF1zabgWqy00xR8aRYtZ";
  const [sessionId, setSessionId] = useState("");
  const [productData, setProductData] = useState([]);
  const [clientSecretKey, setclientSecretKey] = useState("");
  const stripePromise = loadStripe(publishablekey);
  // const stripe = {};

  const getProductData = () => {
    productService.findOneProduct(productId).then((data) => {
      console.log("products inside payment page: ", data);
      setProductData(data);
    });
  };
  const handleBuy = async () => {
    const stripe = await stripePromise;
    console.log("product id: ", productId);
    console.log("user id: ", id);
    console.log("total: ", priceForStripe);
    console.log("shipp id: ", shippId);
    orderService
      .postOrder(productId, priceForStripe, id, shippId)
      .then((data) => {
        console.log("data:", data.id);
        setSessionId(data.id);
        stripe.redirectToCheckout({
          sessionId: data.id,
        });

        // setclientSecretKey(data.paymentIntent.client_secret);
        // console.log("client secret id: ", clientSecretKey);
      }).catch = (err) => {
      console.log(err);
    };
  };

  const collectAccountDetails = async () => {
    const stripe = await stripePromise;

    stripe
      .collectBankAccountForPayment({
        clientSecret: clientSecretKey,
        params: {
          payment_method_type: "us_bank_account",
          payment_method_data: {
            billing_details: {
              name: "Jenny Rosen",
              email: "jenny@example.com",
            },
          },
        },
      })
      .then(function (result) {
        // Handle result.error or result.paymentIntent
      });
  };
  const confirmPayment = async () => {
    console.log("client secret key: ", clientSecretKey);
    const stripe = await stripePromise;
    stripe
      .confirmCardPayment(clientSecretKey, {
        return_url: "http://localhost:3000",
      })
      .then(function (result) {
        console.log("payment result: ", result.paymentIntent);
      });
  };
  useEffect(() => {
    getProductData();
    handleBuy();
    // collectAccountDetails();
    // confirmPayment();
  }, []);
  // const onToken = (token) => {
  //   setToken('token');
  //   console.log(token);
  //   // alert("payment success");
  // };

  // const cart = useSelector((state) => state.cart)
  // const { cartItems } = cart
  // const dispatch = useDispatch()

  // const history = useHistory()

  //  const generateOrder = () =>{
  //      dispatch(orderCreate({...cart, orderItems: cart.cartItems}))
  //  }

  // useEffect(() => {
  //   const stripeRequest = async () => {
  //     try {
  //       const { data } = await axios.post('/api/payment', {
  //         tokenId: token.id,
  //         amount: priceForStripe,
  //       })
  //       //console.log(data);
  //       if (data.success === true) {
  //         dispatch(orderCreate({ ...cart, orderItems: cart.cartItems }))
  //         history.push('/success')
  //       }
  //       //alert("payment success");
  //     } catch (error) {
  //       console.log(error)
  //       // alert("payment failed");
  //     }
  //   }

  //   token && stripeRequest()
  // }, [token])
  return (
    <StripeCheckout
      label="Pay Now"
      name="LBWF Electronic Ltd."
      currency="USD"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={"onToken"}
      stripeKey={publishablekey}
    />
  );
};

export default StripeCheckoutButton;
