import React, { useState } from "react";
import CheckOutSteps from "../CheckOutSteps/CheckOutSteps";
import shippingService from "../../services/ShippingService";
import { Redirect, useLocation } from "react-router-dom";
import { userData } from "../../auth";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../action/cartAction";
import Footer from "../Footer/footer";
import { useEffect } from "react";
function ShippingCard() {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [shippingData, useShippingData] = {};
  const dispatch = useDispatch();
  //product id
  const { id } = userData();
  // let location = useLocation()
  // console.log(location.state)

  // const [fullName, setFullName] = useState('')
  // const [address, setAddress] = useState('')
  // const [cellPhone, setCellPhone] = useState('')
  // const [country, setCountry] = useState('')
  // const [city, setCity] = useState('')
  // const [postalCode, setPostalCode] = useState('')
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [values, setValues] = useState({
    fullName: "",
    address: "",
    cellPhone: "",
    country: "",
    city: "",
    postalCode: "",
  });
  const getShippingAddress = () => {
    console.log("user id", id);
    //execute here
    shippingService
      .getShippingDetail(id)
      .then((data) => {
        setValues(data);
        console.log("shipping details: ", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getShippingAddress();
  }, []);
  const handleChange = (names) => async (event) => {
    setValues({ ...values, [names]: event.target.value });
  };
  const { fullName, address, cellPhone, country, city, postalCode } = values;
  const handleSubmitShipping = (e) => {
    e.preventDefault();
    console.log("clicked");
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        cellPhone,
        country,
        city,
        postalCode,
      })
    );
    if (Object.keys(shippingData).length === 0) {
      shippingService
        .addShippingDetail(
          fullName,
          address,
          cellPhone,
          country,
          city,
          postalCode,
          id
        )
        .then((data) => {
          console.log("congratulations your shipping detail is added ", data);
          setRedirectToReferrer(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      shippingService
        .updateShippingDetail(
          { fullName, address, cellPhone, country, city, postalCode },
          shippingData.id
        )
        .then((data) => {
          console.log("congratulations your shipping detail is updated ", data);
          setRedirectToReferrer(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //setRedirectToReferrer(true)
    //props.history.push('/payment');
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      return (
        <Redirect
          to={{
            pathname: "/payment",
            // state: { productId: location.state.productId },
          }}
          exact
        ></Redirect>
      );
    }
  };

  return (
    <>
      <div className="container wrapper_add_to_Cart">
        <CheckOutSteps step1 step2></CheckOutSteps>

        <div className="container custom_class">
          <h2 className="signup_title "> Shipping Address</h2>
          <form
            onSubmit={handleSubmitShipping}
            className=" col-sm-6 offset-3 pt-5 signup_form "
            // enctype='multipart/form-data'
          >
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="fullname">
                Fullname
              </label>
              <input
                onChange={handleChange("fullName")}
                type="text"
                id="form4Example1"
                className="form-control"
                value={fullName}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="address">
                Address
              </label>
              <input
                onChange={handleChange("address")}
                type="text"
                id="form4Example2"
                className="form-control"
                value={address}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="address">
                Cellphone
              </label>
              <input
                onChange={handleChange("cellPhone")}
                type="tel"
                id="form4Example2"
                className="form-control"
                value={cellPhone}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="country">
                Country
              </label>
              <input
                onChange={handleChange("country")}
                type="text"
                id="form4Example3"
                className="form-control"
                value={country}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="country">
                City
              </label>
              <input
                onChange={handleChange("city")}
                type="text"
                id="form4Example3"
                className="form-control"
                value={city}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="country">
                Postal Code
              </label>
              <input
                onChange={handleChange("postalCode")}
                type="text"
                id="form4Example3"
                className="form-control"
                value={postalCode}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Continue
            </button>
          </form>
        </div>
        {redirectUser()}
      </div>
      <Footer />
    </>
  );
}

export default ShippingCard;
