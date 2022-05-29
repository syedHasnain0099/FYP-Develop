import React from "react";
import { useEffect, useState } from "react";
import orderService from "../../services/OrderService";

function PaymentSuccess() {
  // const [checkoutSession, setCheckoutSession] = useState("");

  const confirmPayment = async () => {
    const checkoutSession =
      "cs_test_a1FMOcnLEYKcZxy9F7w9FfFesKgZuyBvg9DrU8rftmgNsfDBB9a8fliCze";
    console.log("checkout_session: ", checkoutSession);
    orderService
      .confirmOrder(checkoutSession)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    confirmPayment();
  }, []);
  return <div>Payment Successful</div>;
}

export default PaymentSuccess;
