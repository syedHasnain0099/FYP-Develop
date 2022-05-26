import qs from "qs";
import GenericService from "./GenericService";
import axios from "axios";
import productService from "./ProductService";
class ReportingService extends GenericService {
  constructor() {
    super();
    this.populate = [
      "review",
      "review.users_permissions_user",
      "review.product",
      "review.product.image",
      "review.product.users_permissions_user",
    ];
  }
  addReportingOfReviews = (reviewId, reason) => {
    console.log("review id: ", reviewId);
    console.log("reason: ", reason.value);
    return this.post(`reported-contents`, {
      data: {
        reason: reason.value,
        review: reviewId,
      },
    });
  };
  addReportingOfProducts = (productId, reason) => {
    console.log("product id: ", productId);
    console.log("reason: ", reason.value);
    return this.post(`reported-contents`, {
      data: {
        reason: reason.value,
        product: productId,
      },
    });
  };

  getReportedAds = (id = "") => {
    const reportedAds = [];
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        populate: this.populate,
      });
      this.get(
        `reported-contents/${id}?populate=product,product.users_permissions_user,product.image`,
        {}
      )
        .then((response) => {
          const { data } = response;
          console.log("response: ", data);
          if (Array.isArray(data)) {
            for (let repContent of data) {
              reportedAds.push(this.extractReportedProducts(repContent));
            }
          } else {
            reportedAds.push(this.extractReportedProducts(data));
          }
          resolve(reportedAds);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  getReportedReviews = (id = "") => {
    const reportedReviews = [];
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        populate: this.populate,
        // filters: {
        //   review: {
        //     $notNull: true,
        //   },
        // },
      });
      this.get(`reported-contents/${id}?${query}`, {})
        .then((response) => {
          const { data } = response;
          if (Array.isArray(data)) {
            for (let repContent of data) {
              reportedReviews.push(this.extractReportedReviews(repContent));
            }
          } else {
            reportedReviews.push(this.extractReportedReviews(data));
          }
          resolve(reportedReviews);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  deleteReportingOfProducts = (id) => {
    return this.delete(`reported-contents/${id}`);
  };
  deleteReportingOfReviews = (id) => {
    return this.delete(`reported-contents/${id}`);
  };

  extractReportedReviews = (data) => {
    let reviewData = {};
    const { id, attributes } = data;
    const { reason, review } = attributes;
    if (Object.keys(review).length !== 0) {
      const { data } = review;
      if (data) {
        reviewData = productService.extractReviews(data);
      }
    }
    return { id, reason, reviewData };
  };
  extractReportedProducts = (data) => {
    let productData = {};
    const { id, attributes } = data;
    const { reason, product } = attributes;
    if (product) {
      const { data } = product;
      if (data) {
        productData = productService.extractProducts(data);
      }
    }
    return { id, reason, productData };
  };

  extractCategory = (data) => {
    const { id, attributes } = data;
    const { name } = attributes;
    return { id, name };
  };
  extractCategoryList = (data) => {
    const { id, attributes } = data;
    const { name } = attributes;
    return { id, name };
  };
}
export default ReportingService;
