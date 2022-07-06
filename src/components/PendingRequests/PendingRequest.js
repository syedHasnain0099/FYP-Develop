import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userData } from "../../auth";
import quoteService from "../../services/QuoteService";
import moment from "moment";
function PendingRequest() {
  const [pendingRequestsData, setPendingRequestsData] = useState([]);
  const [acceptedRequestsData, setAcceptedRequestsData] = useState([]);
  const { id, username, email } = userData();
  const getPendingRequests = () => {
    console.log("user id: ", id);
    quoteService
      .getRequestQuotes(id, "pending")
      .then((data) => {
        console.log("pending requests: ", data);
        setPendingRequestsData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAcceptedRequests = () => {
    console.log("user id: ", id);
    quoteService
      .getRequestQuotes(id, "accepted")
      .then((data) => {
        console.log("accepted requests: ", data);

        setAcceptedRequestsData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AcceptHandleChange = (index) => {
    console.log(index);
    const { startDate, endDate, id, quantity } = pendingRequestsData[index];
    let reqId = id;
    console.log("reqId:", id);
    // const { rent } = pendingRequestsData[index].product;
    // const productId = pendingRequestsData[index].product.id
    // var supplierId;
    // if(pendingRequestsData[index].product.supplier)
    // {
    //   const { id } = pendingRequestsData[index].product.supplier
    //   supplierId=id;
    // }
    // var requestingUserId
    // if(pendingRequestsData[index].requestingUser)
    // {
    //   const { id } = pendingRequestsData[index].requestingUser
    //   requestingUserId=id;
    // }

    // var start = moment(startDate, "YYYY-MM-DD");
    // var end = moment(endDate, "YYYY-MM-DD");
    // var current = moment().startOf('day')

    // setDuration(moment.duration(end.diff(start)).asDays());
    // console.log(duration);
    // const price = rent;

    // const quote = price * duration * quantity;
    // console.log("price", price);
    // console.log("quanity", quantity);
    // console.log("duration", duration);
    // console.log("quote", quote);
    // console.log('supplier id: ', supplierId)
    // console.log('product id: ', productId)
    // console.log('requesting user id: ', requestingUserId)
    console.log("request Quote id: ", reqId);

    quoteService
      .updateQuote("accepted", reqId)
      .then((res) => {
        console.log("accepted request: ", res);
      })
      .catch((err) => console.log(err));
    getPendingRequests();
  };
  const RejectHandleChange = (index) => {
    const { quote, id } = pendingRequestsData[index];
    let requestQuoteId = id;
    console.log("req id inside rejected ads: ", requestQuoteId);
    console.log("quote val: ", quote);
    quoteService
      .updateQuote("rejected", requestQuoteId)
      .then((res) => {
        console.log("rejected requests: ", res);
      })
      .catch((err) => console.log(err));
    getPendingRequests();
    getAcceptedRequests();
  };

  useEffect(() => {
    getPendingRequests();
    getAcceptedRequests();
  }, []);
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
              class="list-group-item list-group-item-action active"
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
              class="list-group-item list-group-item-action "
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
              class="list-group-item list-group-item-action "
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
  const ShowProducts1 = () => {
    return (
      <>
        {pendingRequestsData.map((item, index) => {
          return (
            <>
              <div className="col-md-5 " style={{ marginTop: "20px" }}>
                <div className="card-card">
                  <div className="card-body">
                    <div className="card-img-actions">
                      <img
                        src={item.product.image_urls[0]}
                        className="card-img-top"
                        // width='96'
                        // height='350'
                        // alt=''
                        height="250px"
                      />
                    </div>
                  </div>
                  <div className="card-body bg-light text-center">
                    <div className="mb-2">
                      <h5 className="font-weight-bold mb-2">
                        {item.product.name}
                      </h5>
                      <p class="text-muted">
                        {item.product.description.substring(0, 20)}...
                      </p>
                    </div>
                    <h3 className="mb-0 font-weight-semibold">
                      Total {item.quote} Rs.
                    </h3>
                    <p class="lead mt-2">City: {item.city}</p>
                    <p class="lead mt-2">Quantity: {item.quantity}</p>
                    <p class="lead mt-2">Duration: {item.duration} days</p>
                    <p class="card-text">Start Date:{item.startDate}</p>
                    <p class="card-text">End Date:{item.endDate}</p>

                    <button
                      className="btn btn-outline-primary mt-2 mb-2 mr-2"
                      onClick={(e) => {
                        AcceptHandleChange(index);
                      }}
                    >
                      Accept
                    </button>

                    <button
                      className="btn btn-outline-danger mt-2 mb-2 mr-2"
                      onClick={(e) => {
                        RejectHandleChange(index);
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  const ShowProducts2 = () => {
    return (
      <>
        {acceptedRequestsData.map((item, index) => {
          return (
            <>
              <div className="col-md-5 " style={{ marginTop: "20px" }}>
                <div className="card-card">
                  <div className="card-body">
                    <div className="card-img-actions">
                      <img
                        src={item.product.image_urls[0]}
                        className="card-img-top"
                        // width='96'
                        // height='350'
                        // alt=''
                        height="250px"
                      />
                    </div>
                  </div>
                  <div className="card-body bg-light text-center">
                    <div className="mb-2">
                      <h5 className="font-weight-bold mb-2">
                        {item.product.name}
                      </h5>
                      <p class="text-muted">
                        {item.product.description.substring(0, 20)}...
                      </p>
                    </div>
                    <h3 className="mb-0 font-weight-semibold">
                      Total {item.quote} Rs.
                    </h3>
                    <p class="lead mt-2">City: {item.city}</p>
                    <p class="lead mt-2">Quantity: {item.quantity}</p>
                    <p class="lead mt-2">Duration: {item.duration} days</p>
                    <p class="card-text">Start Date:{item.startDate}</p>
                    <p class="card-text">End Date:{item.endDate}</p>
                    <p class="lead mt-2 text-danger">
                      Status: {item.order.status}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  const requestedQuotes = () => {
    return (
      <>
        {pendingRequestsData.map((item, index) => {
          return (
            <>
              <div className="col-4 mb-3">
                <div class="card h-100 text-center p-4" key={item.id}>
                  <img
                    class="card-img-top"
                    src={item.product.image_urls[0]}
                    alt={item.product.name}
                    height="250px"
                    //style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                  <div class="card-body">
                    <h5
                      class="card-title mb-1
                     lead fw-bold"
                    >
                      {item.product.name}
                    </h5>
                    <p class="lead mt-2">
                      {item.product.description.substring(0, 20)}...
                    </p>
                    <p class="card-text">Rs.{item.product.rent} / day</p>
                    <p class="lead mt-2">City: {item.city}</p>
                    <p class="lead mt-2">Quantity: {item.quantity}</p>
                    <p class="lead mt-2">Duration</p>
                    <p class="card-text">Start Date:{item.startDate}</p>
                    <p class="card-text">End Date:{item.endDate}</p>

                    <button
                      className="btn btn-outline-primary mt-2 mb-2 mr-2"
                      onClick={(e) => {
                        AcceptHandleChange(index);
                      }}
                    >
                      Accept
                    </button>

                    <button
                      className="btn btn-outline-danger mt-2 mb-2 mr-2"
                      onClick={(e) => {
                        RejectHandleChange(index);
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  const AcceptedQuotes = () => {
    return (
      <>
        {acceptedRequestsData.map((item) => {
          return (
            <>
              <div className="col-4 mb-3">
                <div class="card h-100 text-center p-4" key={item.id}>
                  <img
                    class="card-img-top"
                    src={item.product.image_urls[0]}
                    alt={item.product.name}
                    height="250px"
                    //style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                  <div class="card-body">
                    <h5
                      class="card-title mb-1
                     lead fw-bold"
                    >
                      {item.product.name}
                    </h5>
                    <p class="lead mt-2">
                      {item.product.description.substring(0, 20)}...
                    </p>
                    <p class="card-text">Rs.{item.product.rent} / day</p>
                    <p class="lead mt-2">City: {item.city}</p>
                    <p class="lead mt-2">Quantity: {item.quantity}</p>
                    <p class="lead mt-2">Duration</p>
                    <p class="card-text">Start Date:{item.startDate}</p>
                    <p class="card-text">End Date:{item.endDate}</p>
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
          <h3 className="card-header">Pending Requests</h3>
          <div className="container my-2 py-2">
            <div className="row justify-content-center">
              <ShowProducts1 />
            </div>
          </div>
          <h3 className="card-header">Accepted Requests</h3>
          <div className="container my-2 py-2">
            <div className="row justify-content-center">
              <ShowProducts2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingRequest;
