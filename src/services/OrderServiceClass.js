import qs from "qs";
import GenericService from "./GenericService";
import productService from "./ProductService";
import quoteService from "./QuoteService";
class OrderService extends GenericService {
  constructor() {
    super();
    this.populate = [
      "user",
      "request_quote.product.image",
      "request_quote.product.users_permissions_user",
    ];
  }
  updateDeliveryStatus = (status, orderId) => {
    console.log("order id: ", orderId);
    return this.put(`orders/${orderId}`, {
      data: {
        delivered: status,
      },
    });
  };
  sendAmountBack = (renter, supplier, totalAmount) => {
    console.log("ok");
  };
  updateRecievedBackStatus = (
    status,
    orderId,
    renter,
    supplier,
    totalAmount
  ) => {
    console.log("data: ", status, orderId, renter, supplier, totalAmount);
    console.log("other data: ", renter, supplier, totalAmount);
    if (status === "yes") {
      this.sendAmountBack(renter, supplier, totalAmount);
    }
    return this.put(`orders/${orderId}`, {
      data: {
        recieved_back: status,
      },
    });
  };
  deleteOrder = (orderId) => {
    return new Promise((resolve, reject) => {
      this.delete(`orders/${orderId}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  };
  subtractQuantity = (productId, quoteQuantity, prodQuantity) => {
    const updatedQuantity = prodQuantity - quoteQuantity;
    return this.put(`products/${productId}`, {
      data: {
        quantity: updatedQuantity,
      },
    });
  };
  confirmOrder = (checkout_session) => {
    return this.post(`orders/confirm`, {
      data: {
        checkout_session,
      },
    });
  };
  postOrder = (
    request_quote,
    itemPrice,
    user,
    shipping_detail,
    shippingPrice,
    taxFee,
    securityFee,
    total
  ) => {
    return this.post(`orders`, {
      data: {
        request_quote,
        itemPrice,
        user,
        shipping_detail,
        shippingPrice,
        taxFee,
        securityFee,
        total,
      },
    });
  };
  getOneOrder = (id) => {
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        populate: this.populate,
      });
      this.get(`orders/${id}?${query}`, {})
        .then((response) => {
          const { data } = response;
          resolve(this.extractOrders(data));
        })
        .catch((err) => reject(err));
    });
  };
  getOrders = (currentUserId, status) => {
    const orders = [];
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        populate: this.populate,
        filters: {
          user: {
            id: {
              $eq: currentUserId,
            },
          },
          status: {
            $eq: status,
          },
        },
      });
      this.get(`orders?${query}`, {})
        .then((response) => {
          const { data } = response;
          for (let ord of data) {
            orders.push(this.extractOrders(ord));
          }
          resolve(orders);
        })
        .catch((err) => reject(err));
    });
  };
  getAllOrders = (status) => {
    const orders = [];
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        populate: this.populate,
        filters: {
          status: {
            $eq: status,
          },
        },
      });
      this.get(`orders?${query}`, {})
        .then((response) => {
          const { data } = response;
          for (let ord of data) {
            orders.push(this.extractOrders(ord));
          }
          resolve(orders);
        })
        .catch((err) => reject(err));
    });
  };

  extractOrders = (req) => {
    const { id, attributes } = req;
    const {
      status,
      total,
      total_amount,
      checkout_session,
      request_quote,
      user,
      createdAt,
      delivered,
      updatedAt,
      recieved_back,
      delivered_at,
    } = attributes;
    var order = {
      id: "",
      status: "",
      total: "",
      totalAmount: {},
      checkout_session: "",
      requestQuote: {},
      currentUser: {},
      createdAt: "",
      delivered: "",
      deliveredAt: "",
      updatedAt: "",
      recievedBack: "",
    };
    order.id = id;
    order.status = status;
    order.total = total;
    order.checkout_session = checkout_session;
    order.createdAt = new Date(createdAt).toLocaleDateString("en-EN");
    order.updatedAt = new Date(updatedAt).toLocaleDateString("en-EN");
    order.delivered = delivered;
    order.deliveredAt = delivered_at;
    order.totalAmount = total_amount;
    order.recievedBack = recieved_back;
    if (request_quote) {
      const { data } = request_quote;
      if (data) order.requestQuote = quoteService.extractRequests(data);
    }
    if (user) {
      const { data } = user;
      order.currentUser = productService.extractUser(data);
    }

    return order;
  };
}
export default OrderService;
