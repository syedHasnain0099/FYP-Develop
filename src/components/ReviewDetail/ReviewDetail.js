import React from "react";
import ProductImagesSlider from "./ProductImagesSlider";
import { Skeleton } from "@mui/material";
import moment from "moment";
import "./Product.css";
import { useEffect, useState } from "react";
import { NavLink, Redirect, useParams } from "react-router-dom";
import productService from "../../services/ProductService";
function ReviewDetail() {
  let { productId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/review/reporting"></Redirect>;
    }
  };
  // const getProduct = (productId) => {
  //   setLoading(true)
  //   productService
  //     .findOneRequestedAd(productId)
  //     .then((response) => {
  //       setData(response)
  //       console.log(response)
  //       setLoading(false)
  //     })
  //     .catch((err) => {
  //       console.log('inside else if catch')
  //       console.log(err)
  //     })
  // }
  // useEffect(() => {
  //   getProducts(productId)
  // }, [])
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
  const showApproveButton = () => {
    return (
      <>
        <button
          className="btn btn-outline-success mt-2 mb-2 mr-2"
          onClick={approveHandleChange}
        >
          Delete Request
        </button>

        <button
          className="btn btn-outline-danger mt-2 mb-2 mr-2"
          onClick={disapproveHandleChange}
        >
          Delete Product
        </button>
      </>
    );
  };
  const approveHandleChange = () => {
    // delete requests (reason for reporting)
    // productService
    //   .deleteReasonOfReportingOfProducts(prodId)
    //   .then((data) => {
    //     console.log("deleted reason: ", data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const disapproveHandleChange = () => {
    // delete product that has been reported
    // productService
    //   .deleteProduct(prodId)
    //   .then((data) => {
    //     console.log("deleted product: ", data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const ShowProduct3 = () => {
    return (
      <>
        <div className="container single_product show">
          {loading ? (
            <Loading />
          ) : (
            <div className="row">
              <div className="col-sm-6 ">
                <div className="img_div">
                  <div
                    style={{
                      // height: '100vh',
                      display: "flex",
                      // alignItems: 'center',
                      // justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: "500px",
                        backgroundColor: "#fff",
                        padding: "20px",
                      }}
                    >
                      {/* <ProductImagesSlider images={product.image_urls} /> */}
                      <br />

                      <span className="description-form-input-login">
                        <NavLink
                          to={{
                            pathname: "/product/video",
                            // state: { video: product.image_urls },
                          }}
                          exact
                        >
                          Watch video of product
                        </NavLink>
                      </span>
                    </div>
                  </div>
                  {/* <img
                          className='img-fluid'
                          src={product.image_urls[0]}
                          alt=''
                        /> */}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="product_desc_wrapper">
                  <div className="product_title">
                    <h1>
                      Product Name
                      {/* {product.name} */}
                    </h1>
                    <span>
                      <h6>Product #{/* {product.id} */}</h6>
                    </span>
                    <hr />
                    <h1>
                      Rs
                      {/* {product.rent} */}/ day
                    </h1>
                  </div>

                  <p>
                    Availability of Product for rent:
                    {/* {product.duration} days */}
                  </p>
                  <p>
                    Product Category:
                    {/* {product.categoryType} */}
                  </p>
                  <p>
                    Added on
                    {/* {moment(product.createdAt).fromNow()} */}
                  </p>

                  <hr />
                  <div className="desc">
                    <h2>Description</h2>
                    {/* <p>{product.description}</p> */}
                  </div>
                  <hr />
                  <div className="desc">
                    <h2>Supplier Information</h2>
                    <p>
                      Name:
                      {/* {product.supplier.username} */}
                    </p>
                    <p>
                      Email:
                      {/* {product.supplier.email} */}
                    </p>
                    <p>
                      Contact number: +92
                      {/* {product.supplier.contact_number} */}
                    </p>
                  </div>
                </div>
                {showApproveButton()}
              </div>
            </div>
          )}
        </div>
      </>
    );
  };
  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">
              Product Description
            </h1>
            <hr />
          </div>
        </div>

        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProduct3 />}
        </div>
      </div>
      {redirectUser()}
    </div>
  );
}

export default ReviewDetail;
