import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider/StateProvider";
import { userData } from "../../auth";
import biddingService from "../../services/BiddingService";
import categoryService from "../../services/CategoryService";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import Rating from "../Rating/Rating";
import moment from "moment";
function BiddingProducts() {
  const { id, username, email } = userData();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createdProduct, setcreatedProduct] = useState("");
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
  const getData = () => {
    console.log("running in getData");
    setLoading(true);
    var biddingDays = generateBiddingDays();
    console.log("bidding days upto next 3 months: ", biddingDays);
    let today = moment().format("DD-MM-YYYY");
    // let biddingDay = moment("07/07/2022").format("DD-MM-YYYY");
    console.log("today: ", today);

    console.log("bday: ", biddingDays[0]);
    var nextdate = moment(today, "DD-MM-YYYY").add(24, "h");
    console.log("next date: ", nextdate.format("DD-MM-YYYY"));
    if (moment(today).isSame(biddingDays[0])) {
      biddingService
        .getAllBiddingItems(id)
        .then((response) => {
          console.log("ads: ", response);
          setData(response);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setcreatedProduct(
        `Bidding has not started yet. It will start on ${biddingDays[0]}`
      );
      console.log(
        `Bidding has not started yet. It will start on ${biddingDays[0]}`
      );
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`}</h2>
    </div>
  );
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

  const ShowProducts1 = () => {
    return (
      <>
        {data.map((product) => {
          return (
            <>
              <div className="col-md-3 " style={{ marginTop: "20px" }}>
                <div className="card-card">
                  <div className="card-body">
                    <div className="card-img-actions">
                      <img
                        src={product.image_urls[0]}
                        className="card-img-top"
                        height="250px"
                      />
                    </div>
                  </div>
                  <div className="card-body bg-light text-center">
                    <div className="mb-2">
                      <h5 className="font-weight-bold mb-2">
                        <Link
                          to={`/bidProduct/${product.id}`}
                          className="text-default mb-2"
                          data-abc="true"
                        >
                          {product.name}
                        </Link>
                      </h5>
                      <p class="text-muted">
                        {product.description.substring(0, 20)}...
                      </p>
                    </div>
                    <h3 className="mb-0 font-weight-semibold">
                      Latest bid: Rs. {product.bid}
                    </h3>

                    <div className="text-muted mb-3">
                      {/* {product.reviews.length} reviews */}
                    </div>

                    <Link to={`/bidItem/${product.id}`}>
                      <button className="btn bg-cart mt-2 mb-2 mr-2">
                        Bid on an item
                      </button>
                    </Link>
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
    // <div className='container  justify-content-center mb-50'>
    //   <div className='row' style={{ paddingTop: '102px' }}>
    //     {<ShowProducts1 />}
    //   </div>
    // </div>
    <div>
      <div className="container my-1 py-1">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6 fw-bolder text-center">
              Bidding Products
            </h1>
            <hr />
          </div>
        </div>
        {showSuccess()}
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts1 />}
        </div>
      </div>
    </div>
  );
}

export default BiddingProducts;
