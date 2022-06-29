import qs from "qs";
import GenericService from "./GenericService";
import productService from "./ProductService";
// import productService from './ProductService'
import axios from "axios";
class BiddingService extends GenericService {
  constructor() {
    super();
    this.populate = [
      "image",
      "users_permissions_user",
      "category_list",
      "highest_bidder",
    ];
  }

  postBiddingItem = (
    name,
    description,
    quantity,
    users_permissions_user,
    category_list,
    image,
    status
  ) => {
    return this.post(`bidding-items`, {
      data: {
        name,
        description,
        quantity,
        users_permissions_user,
        category_list,
        image,
        status,
      },
    });
  };
  getOneBiddingItem = (biddingId) => {
    const filteredItem = [];
    const query = qs.stringify({
      populate: this.populate,
    });
    return new Promise((resolve, reject) => {
      this.get(`bidding-items/${biddingId}?${query}`)
        .then((response) => {
          const { data } = response;
          filteredItem.push(this.extractBiddingProducts(data));
          resolve(filteredItem);
        })
        .catch((err) => reject(err));
    });
  };
  getAllBiddingItems = (userId) => {
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
          status: "approved",
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
  getUserUploadedItems = (userId) => {
    const allItems = [];
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        filters: {
          users_permissions_user: {
            id: {
              $eq: userId,
            },
          },
          status: "approved",
        },
      });
      this.get(
        `bidding-items?populate=users_permissions_user,image&${query}`,
        {}
      )
        .then((response) => {
          const { data } = response;
          for (let ad of data) {
            allItems.push(this.extractBiddingProducts(ad));
          }
          resolve(allItems);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  getRelatedProducts = (subCategory, existingProductName) => {
    const filteredProducts = [];
    let query;
    return new Promise((resolve, reject) => {
      query = qs.stringify({
        populate: this.populate,
        filters: {
          category_list: {
            name: {
              $eq: subCategory,
            },
          },
          name: {
            $notContains: existingProductName,
          },
        },
      });
      this.get(`bidding-items?${query}`)
        .then((response) => {
          const { data } = response;
          for (let ad of data) {
            filteredProducts.push(this.extractBiddingProducts(ad));
          }
          resolve(filteredProducts);
        })
        .catch((err) => reject(err));
    });
  };
  extractBiddingProducts = (item) => {
    const { id, attributes } = item;
    const {
      name,
      description,
      bid,
      image,
      users_permissions_user,
      quantity,
      category_list,
      createdAt,
      highest_bidder,
    } = attributes;
    // const { price, duration } = estimated_price
    var product = {
      id: "",
      name: "",
      description: "",
      bid: "",
      duration: "",
      quantity: "",
      reviews: [],
      image_urls: [],
      supplier: {},
      highestBidder: {},
      subCategory: "",
      subCategoryId: "",
      createdAt: "",
    };
    product.id = id;
    product.name = name;
    product.description = description;
    product.createdAt = createdAt.slice(0, 10);
    product.quantity = quantity;
    product.bid = bid;

    if (category_list) {
      const { data } = category_list;
      const extractedData = productService.extractSubcategoryName(data);
      product.subCategory = extractedData.name;
      product.subCategoryId = extractedData.id;
    }

    if (image) {
      const { data } = image;
      for (let index = 0; index < data.length; index++) {
        const singleImage = data[index];
        const extractedData = productService.extractImage(singleImage);
        product.image_urls.push(extractedData.url);
      }
    }

    if (users_permissions_user) {
      const { data } = users_permissions_user;
      product.supplier = productService.extractUser(data);
    }
    console.log("bidder data: ", highest_bidder);
    if (highest_bidder) {
      const { data } = highest_bidder;
      product.highestBidder = productService.extractUser(data);
    }
    return product;
  };
  updateBid = (bid, bidId, bidder) => {
    return this.put(`bidding-items/${bidId}`, {
      data: {
        bid,
        highest_bidder: bidder,
      },
    });
  };

  //on admin side
  getRequestedBiddingItems = () => {
    const allads = [];
    const query = qs.stringify({
      populate: this.populate,
      filters: {
        status: "pending",
      },
    });
    return new Promise((resolve, reject) => {
      this.get(`bidding-items?${query}`, {}).then((response) => {
        const { data } = response;
        for (let ad of data) {
          allads.push(this.extractBiddingProducts(ad));
        }
        resolve(allads);
      });
    });
  };

  acceptBiddingItem = () => {
    return this.put(`bidding-items`, {
      data: {
        status: "approved",
      },
    });
  };
  rejectBiddingItem = () => {
    return this.put(`bidding-items`, {
      data: {
        status: "disapproved",
      },
    });
  };
}
export default BiddingService;
