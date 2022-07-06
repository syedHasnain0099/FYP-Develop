import React from "react";
import { useEffect, useState } from "react";
import orderService from "../../services/OrderService";
import { useDispatch, useSelector } from "react-redux";
import { orderCreate } from "../../action/orderAction";
import biddingService from "../../services/BiddingService";
function PaymentSuccess() {
  // const [checkoutSession, setCheckoutSession] = useState("");
  const [prodId, setProdId] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [prodQuantity, setProdQuantity] = useState("");
  const [checkoutSession, setCheckoutSession] = useState("");
  const resetCode = window.location.href;
  const myArray = resetCode.split(
    "http://localhost:3000/biddingpayment/success?session_id="
  );
  console.log(myArray[1]);
  const confirmPayment = async () => {
    //setCheckoutSession(myArray[1]);
    console.log(myArray[1]);
    biddingService
      .confirmOrder(myArray[1])
      .then((res) => {
        console.log("inside response", res);
        if (res.data.attributes.status === "paid") {
          console.log("inside if");
          biddingService
            .getOneBiddingItem(res.data.id)
            .then((orderData) => {
              console.log(orderData);
              setProdId(orderData.id);
              console.log("product id: ", prodId);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    confirmPayment();
  }, []);
  return (
    <>
      <div className="container" style={{ padding: "100px 0" }}>
        <h1 className="text-center">Order Confirmation</h1>
        <div className="bg">
          <div className="card" style={{ paddingTop: "66px" }}>
            <span className="card__success">
              <i className="fa fa-check"></i>
            </span>

            <h1 className="card__msg">Payment Complete</h1>
            <h2 className="card__submsg">Thank you for choosing us!</h2>

            <div className="card__body"></div>

            <div className="card__tags">
              <span className="card__tag">completed</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;
