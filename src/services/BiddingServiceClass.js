import qs from "qs";
import GenericService from "./GenericService";
import productService from "./ProductService";
// import productService from './ProductService'
import axios from "axios";
class BiddingService extends GenericService {
  constructor() {
    super();
    this.populate = ["image", "users_permissions_user", "category_list"];
  }
  getAllBiddingItems = (userId, status) => {
    const allBiddingProducts = [];
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        populate: this.populate,
        filters: {
          users_permissions_user: {
            id: {
              $ne: userId,
            },
          },
          status: status,
        },
      });
      this.get(`bidding-items?${query}`, {})
        .then((response) => {
          const { data } = response;
          for (let ad of data) {
            allBiddingProducts.push(this.extractBiddingProducts(ad));
          }
          resolve(allBiddingProducts);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}
export default BiddingService;
