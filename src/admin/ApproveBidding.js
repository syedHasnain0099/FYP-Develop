import biddingService from "../services/BiddingService";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

function ApproveBidding() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getRequestedAds = () => {
    setLoading(true);
    biddingService
      .getRequestedBiddingItems()
      .then((response) => {
        console.log("requested items", response);
        setData(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
                        <Link
                          to={`/approveAds/${product.id}`}
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
                      Rs {product.rent} / day
                    </h3>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    getRequestedAds();
  }, []);
  return (
    <div>
      <div className="container my-1 py-1">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6 fw-bolder text-center">
              Approve Bidding of an item
            </h1>
            <hr />
          </div>
        </div>

        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts1 />}
        </div>
      </div>
    </div>
  );
}

export default ApproveBidding;
