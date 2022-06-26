import qs from "qs";
import GenericService from "./GenericService";
import productService from "./ProductService";
import quoteService from "./QuoteService";
class OrderService extends GenericService {
  constructor() {
    super();
    this.populate = ["user", "request_quote.product.image"];
  }
  updateOrderStatus = (status, orderId) => {
    return this.put(`orders/${orderId}`, {
      data: {
        delivery_status: status,
      },
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
  postOrder = (request_quote, total, user, shipping_detail) => {
    return this.post(`orders`, {
      data: {
        request_quote,
        total,
        user,
        shipping_detail,
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

  extractOrders = (req) => {
    const { id, attributes } = req;
    const {
      status,
      total,
      checkout_session,
      request_quote,
      user,
      createdAt,
      delivered,
      updatedAt,
    } = attributes;
    var order = {
      id: "",
      status: "",
      total: "",
      checkout_session: "",
      request_quote: {},
      currentUser: {},
      created_at: "",
      delivered: "",
      updated_at: "",
    };
    order.id = id;
    order.status = status;
    order.total = total;
    order.checkout_session = checkout_session;
    order.created_at = new Date(createdAt).toLocaleDateString("en-EN");
    order.updated_at = new Date(updatedAt).toLocaleDateString("en-EN");
    order.delivered = delivered;
    if (request_quote) {
      const { data } = request_quote;
      order.request_quote = quoteService.extractRequests(data);
    }
    if (user) {
      const { data } = user;
      order.currentUser = productService.extractUser(data);
    }

    return order;
  };
}
export default OrderService;
