import qs from "qs";
import GenericService from "./GenericService";
import productService from "./ProductService";
class OrderService extends GenericService {
  constructor() {
    super();
    this.populate = ["user", "product"];
  }
  confirmOrder = (checkout_session) => {
    return this.post(`orders/confirm`, {
      data: {
        checkout_session,
      },
    });
  };
  postOrder = (product, total, user, shipping_detail) => {
    return this.post(`orders`, {
      data: {
        product,
        total,
        user,
        shipping_detail,
      },
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
    const { status, total, checkout_session, product, user, createdAt } =
      attributes;

    var order = {
      id: "",
      status: "",
      total: "",
      checkout_session: "",
      product: {},
      currentUser: {},
      created_at: "",
    };
    order.id = id;
    order.status = status;
    order.total = total;
    order.checkout_session = checkout_session;
    order.created_at = new Date(createdAt).toLocaleDateString("en-EN");

    if (product) {
      const { data } = product;
      order.product = productService.extractProducts(data);
    }
    if (user) {
      const { data } = user;
      order.currentUser = productService.extractUser(data);
    }

    return order;
  };
}
export default OrderService;
