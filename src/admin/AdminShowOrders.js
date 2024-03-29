import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import { toast } from "react-toastify";
import orderService from "../services/OrderService";
const AdminShowOrders = () => {
  const [ord, setOrd] = useState([]);
  const [supplier, setSupplier] = useState("");
  const [renter, setRenter] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [singleOrder, setSingleOrder] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [shippingAddressload, setShippingAddressload] = useState({});
  //show orders
  const displayAdminOrders = async () => {
    orderService
      .getAllOrders("paid")
      .then((order) => {
        console.log("order data!", order);
        setOrd(order);

        // order.id,
        // order.request_quote.start_date,
        // order.request_quote.end_date,
        // order.total,
        // order.status,
        // order.delivered,
        // order.created_at,
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    displayAdminOrders();
  }, [pageNumber, totalItem]);

  //display single order for admin
  const singleOrderAdmin = async (id) => {
    console.log("order id", id);
    orderService
      .getOneOrder(id)
      .then((order) => {
        console.log("order data!", order);
        setSupplier(order.request_quote.product.supplier.id);
        setRenter(order.currentUser.id);
        setTotalAmount(order.totalAmount);
      })
      .catch((err) => console.log(err));
  };

  //Deleting an order
  const deleteOrder = (id) => {
    if (window.confirm(`Do you want to delete Order: ${id}`)) {
      //console.log(`current user ID: ${id} / ${name}`);
      orderService
        .deleteOrder(id)
        .then((order) => {
          console.log("order deleted!", order);
        })
        .catch((err) => console.log(err));
    }
  };
  //confirm delivered order
  const orderDeliveredHome = (orderId) => {
    console.log("orderId", orderId);
    if (window.confirm(`Do you want to confirm Order : ${orderId} delivery?`)) {
      console.log("inside if");
      orderService
        .updateDeliveryStatus("yes", orderId)
        .then((order) => {
          console.log("order status updateds!", order);
        })
        .catch((err) => console.log(err));
    }
  };
  const orderRecievedBack = (orderId, status) => {
    if (
      window.confirm(`Do you want to confirm Order : ${orderId} RecievedBack?`)
    ) {
      orderService
        .getOneOrder(orderId)
        .then((order) => {
          console.log("order data!", order);
          orderService
            .updateRecievedBackStatus(
              "yes",
              orderId,
              order.currentUser.id,
              order.request_quote.product.supplier.id,
              order.totalAmount
            )
            .then((order) => {
              console.log(
                `renter security deposit: ${order.total_amount.security_fee} is been set on process on sending back to id: ${ord.user.username}`
              );
              console.log(
                `supplier's amount: ${order.total_amount.item_price} is been set on process on sending back to id: ${ord.request_quote.product.users_permissions_user.username}`
              );
            })
            .catch((err) => console.log(err));
          // setSupplier(order.request_quote.product.supplier.id);
          // setRenter(order.currentUser.id);
          // setTotalAmount(order.totalAmount);
        })
        .catch((err) => console.log(err));
      //console.log(`current user ID: ${id} / ${name}`);
    }
  };

  return (
    <>
      <div
        className="order_user_history paddingTB container"
        style={{
          paddingLeft: "150px",
          paddingTop: "100px",
          minHeight: "550px",
        }}
      >
        <h2>Orders</h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">OrderID</th>
              <th scope="col">User</th>
              <th scope="col">Total</th>
              <th scope="col">Paid</th>
              <th scope="col">Delivered</th>
              {/* <th scope="col">Delivered At</th> */}
              <th scope="col">Recieved Back </th>
              <th scope="col">Actions </th>
            </tr>
          </thead>
          <tbody>
            {
              // orders && orders.length === 0 ? <><h2>Your don't have any purcharse</h2></> :

              ord.map((order) => (
                <tr key={order.id}>
                  <th scope="col">{order.id}</th>
                  <th scope="col">{order.currentUser.username}</th>
                  <th scope="col">{order.total}</th>
                  <th scope="col">
                    {order.status === "paid" ? (
                      <span style={{ color: "green" }}>Paid</span>
                    ) : (
                      <span style={{ color: "#ffc107" }}>Processing</span>
                    )}
                  </th>
                  <th scope="col">
                    {" "}
                    {order.delivered === "yes" ? (
                      <span style={{ color: "green" }}>Yes</span>
                    ) : (
                      <span style={{ color: "#ffc107" }}>No</span>
                    )}
                  </th>
                  {/* <th scope="col">
                    {order.isPaid && order.isDelivered ? order.deliveredAt : ""}
                  </th> */}
                  <th scope="col">
                    {" "}
                    {order.recievedBack === "yes" ? (
                      <span style={{ color: "green" }}>Yes</span>
                    ) : (
                      <span style={{ color: "#ffc107" }}>No</span>
                    )}
                  </th>
                  <th scope="col">
                    {/* <td>
                      {" "}
                      <i
                        data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal"
                        style={{ cursor: "pointer" }}
                        onClick={() => singleOrderAdmin(order.id)}
                        className="fa-regular fa-eye"
                      ></i>
                    </td> */}
                    <td>
                      <i
                        onClick={() => orderRecievedBack(order.id)}
                        class="fa-regular fa-eye"
                        style={{
                          cursor: "pointer",
                          paddingLeft: "20px",
                          color: "green",
                        }}
                      ></i>
                    </td>
                    <td>
                      <i
                        onClick={() => orderDeliveredHome(order.id)}
                        class="fa-solid fa-house-chimney"
                        style={{ cursor: "pointer", marginLeft: "20px" }}
                      ></i>
                    </td>
                    <td>
                      <i
                        onClick={() => deleteOrder(order.id)}
                        class="far fa-trash-alt btn-danger"
                        style={{ cursor: "pointer", marginLeft: "20px" }}
                      ></i>
                    </td>
                  </th>
                </tr>
              ))
            }
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  style={{ color: "white" }}
                  className="modal-title"
                  id="exampleModalLabel"
                >
                  Purchase Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-mdb-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Price </th>
                      <th scope="col">image</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="ordersdetailsBody">
                    {
                      //  orders && orders.length === 0 ? <><h2>Your don't have any purcharse</h2></> :

                      singleOrder &&
                        singleOrder.map((det) => (
                          <tr key={det._id}>
                            <th scope="col">{det.name}</th>
                            <th scope="col">${det.price}</th>
                            <th scope="col">
                              <img
                                style={{ maxWidth: "40%" }}
                                src={det.image}
                                alt={det.name}
                              />
                            </th>
                            <th scope="col">{det.quantity}</th>
                          </tr>
                        ))
                    }
                  </tbody>
                </table>
                <hr />

                <div className="shipping_details_info">
                  <h6>shipping info: </h6>
                  <ul>
                    <li>
                      <b>Complete name: </b> {shippingAddressload.fullName}{" "}
                    </li>
                    <li>
                      <b>Address: </b> {shippingAddressload.address},{" "}
                      {shippingAddressload.city}, {shippingAddressload.country},{" "}
                      {shippingAddressload.postalCode}
                    </li>
                    <li>
                      <b>cellphone: </b> {shippingAddressload.cellPhone}{" "}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-mdb-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <Pagination
          current={pageNumber}
          total={totalItem}
          onChange={(value) => setPageNumber(value)}
        /> */}
      </div>
    </>
  );
};

export default AdminShowOrders;
