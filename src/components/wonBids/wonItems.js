import React, { useEffect, useState } from "react";
import { userData } from "../../auth";
import { Link, Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Skeleton } from "@mui/material";
import biddingService from "../../services/BiddingService";
import { addItem, updateItem, removeItem } from "../../auth/cartHelpers";
import moment from "moment";
function MyAds() {
  const [acceptedRequestsData, setAcceptedRequestsData] = useState([]);
  const [rejectedRequestsData, setRejectedRequestsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [rejectedLoading, setRejectedLoading] = useState(false);
  const { id, username, email } = userData();
  const [createdProduct, setCreatedProduct] = useState(false);
  const [createdProduct1, setCreatedProduct1] = useState(false);
  const generateBiddingDays = () => {
    var myDate,
      recurrence,
      biddingDates = [];

    // Create a date to start from
    var moment = require("moment");
    require("moment-recur");
    myDate = moment("07/07/2022");
    // recurrence = myDate.recur().every("Sunday").daysOfMonth();
    recurrence = myDate
      .recur()
      .every("Sunday")
      .daysOfWeek()
      .every([0])
      .weeksOfMonthByDay();

    //recurrence = myDate.recur().every([3, 5]).days();

    for (let i = 0; i < 100; i++) {
      var dt1 = moment(myDate).add(i, "days");
      var check = recurrence.matches(dt1);
      var currentdate;
      if (check) {
        currentdate = moment(dt1).format("DD-MM-YYYY");
        // console.log("date matching? ", moment(dt1).format("dddd, DD-MMM-YYYY"));
        biddingDates.push(currentdate);
      }
    }
    return biddingDates;
  };
  const showAcceptedRequests = () => {
    setLoading(true);
    var biddingDays = generateBiddingDays();
    console.log("bidding days upto next 3 months: ", biddingDays);
    let today = moment().format("DD-MM-YYYY");
    console.log("today: ", today);
    console.log("bday: ", biddingDays[0]);
    var nextdate = moment(today, "DD-MM-YYYY").add(24, "h");
    console.log("next date: ", nextdate.format("DD-MM-YYYY"));
    if (moment(today).isSame(biddingDays[0])) {
      console.log(
        "Bidding is in process now. Wait till midnight 12:00 a.m tonight."
      );
    } else if (moment(today).isSame(nextdate)) {
      biddingService.sendMail(email).then((msg) => {
        console.log("msg:", msg);
      }).catch = (err) => {
        console.log(err);
      };
    } else {
      biddingService
        .getUserWonItems(id)
        .then((data) => {
          console.log("user won items: ", data);
          setAcceptedRequestsData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    showAcceptedRequests();
  }, []);

  const showSuccess = () => (
    <div
      className="alert alert-danger"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>quote of price {`${createdProduct}`} is rejected</h2>
    </div>
  );
  const addToCardHome = (index) => {
    //instead of adding to cart, link this to shipping page
    //on this page you are getting complete details of won bidding item so we will need this info on shipping and paymentCart page
    //payment cart new bnana parre ga as isme security fee ni show krni
  };

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };
  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <Link
              class="list-group-item list-group-item-action "
              id="list-home-list"
              data-toggle="list"
              to="/myAds"
              role="tab"
              aria-controls="home"
            >
              My Ads
            </Link>
          </li>
          <li class="list-group-item">
            <Link
              class="list-group-item list-group-item-action "
              id="list-home-list"
              data-toggle="list"
              to={`/profile/${id}`}
              role="tab"
              aria-controls="home"
            >
              Update Profile
            </Link>
          </li>

          <li class="list-group-item">
            <Link
              class="list-group-item list-group-item-action "
              id="list-home-list"
              data-toggle="list"
              to="/create/product"
              role="tab"
              aria-controls="home"
            >
              Post an ad
            </Link>
          </li>
          <li class="list-group-item">
            <Link
              class="list-group-item list-group-item-action "
              id="list-home-list"
              data-toggle="list"
              to="/create/bidItem"
              role="tab"
              aria-controls="home"
            >
              Post an bidding item
            </Link>
          </li>

          <li class="list-group-item">
            <Link
              class="list-group-item list-group-item-action "
              id="list-home-list"
              data-toggle="list"
              to="/pending/requests"
              role="tab"
              aria-controls="home"
            >
              Recieved Requests
            </Link>
          </li>

          <li class="list-group-item">
            <Link
              class="list-group-item list-group-item-action"
              id="list-home-list"
              data-toggle="list"
              to="/acceptedRequests"
              role="tab"
              aria-controls="home"
            >
              Recieved Responses
            </Link>
          </li>
          <li class="list-group-item">
            <Link
              class="list-group-item list-group-item-action "
              id="list-home-list"
              data-toggle="list"
              to="/orderHistory"
              role="tab"
              aria-controls="home"
            >
              Order History
            </Link>
          </li>
          <li class="list-group-item">
            <Link
              class="list-group-item list-group-item-action active"
              id="list-home-list"
              data-toggle="list"
              to="/wonItems"
              role="tab"
              aria-controls="home"
            >
              Won Bidding Items
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const AcceptedRequests = () => {
    return (
      <>
        {acceptedRequestsData.map((item, index) => {
          return (
            <>
              <div className="col-md-5" style={{ marginTop: "20px" }}>
                <div class="card h-100 text-center p-4" key={item.id}>
                  <img
                    class="card-img-top"
                    src={item.image_urls[0]}
                    alt={item.name}
                    height="250px"
                  />
                  <div class="card-body">
                    <h5
                      class="card-title mb-1
                     lead fw-bold"
                    >
                      {item.name}
                    </h5>
                    <p class="lead mt-2">
                      {item.description.substring(0, 20)}...
                    </p>
                    <p class="lead mt-2">Highest bid: Rs.{item.bid}</p>
                    <NavLink
                      to={{
                        pathname: "/bidding/shipping",
                        state: {
                          bidding_item: item.id,
                          bidding_price: item.bid,
                          image: item.image_urls[0],
                          name: item.name,
                        },
                      }}
                      exact
                    >
                      <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                        Proceed To Payment
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          <h3 className="card-header">Won Bidding Items</h3>
          <div className="container my-2 py-2">
            <div className="row justify-content-center">
              {showSuccess()}
              {loading ? <Loading /> : <AcceptedRequests />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAds;
