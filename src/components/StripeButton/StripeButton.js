import React from "react";
import { useEffect, useState } from "react";
import { userData } from "../../auth";
import { loadStripe } from "@stripe/stripe-js";
import productService from "../../services/ProductService";
import orderService from "../../services/OrderService";

function StripeButton() {
  const { id } = userData();
  const total = 1230;
  const productId = 6;
  const shippId = 1;
  const [clientSecretKey, setclientSecretKey] = useState("");
  const [productData, setProductData] = useState([]);
  const STRIPE_PK =
    "pk_test_51L21M9CkQckw00WvUtYFfgcAmm9NQzQ8pI4JlVRLlIoH8jrQV9bFOuN6XBJtNFvaXbMcUueCaU2IotdF1zabgWqy00xR8aRYtZ";
  const stripePromise = loadStripe(STRIPE_PK);

  const getProductData = () => {
    productService.findOneProduct(productId).then((data) => {
      console.log("products inside payment page: ", data);
      setProductData(data);
    });
  };
  const handleBuy = async () => {
    console.log("product id: ", productId);
    console.log("user id: ", id);
    console.log("total: ", total);
    console.log("shipp id: ", shippId);
    orderService.postOrder(productId, total, id, shippId).then((data) => {
      console.log("response: ", data);
      setclientSecretKey(data.paymentIntent.client_secret);
      console.log("client secret id: ", clientSecretKey);
    }).catch = (err) => {
      console.log(err);
    };
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
    confirmPayment();
  }, []);
  return <div>StripeButton</div>;
}

export default StripeButton;
