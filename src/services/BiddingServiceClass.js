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
  extractBiddingProducts = (item) => {
    const { id, attributes } = item;
    const {
      name,
      description,
      rent,
      duration,
      image,
      users_permissions_user,
      quantity,
      category_list,
      createdAt,
    } = attributes;
    // const { price, duration } = estimated_price
    var product = {
      id: "",
      name: "",
      description: "",
      rent: "",
      duration: "",
      quantity: "",
      reviews: [],
      image_urls: [],
      supplier: {},
      subCategory: "",
      subCategoryId: "",
      createdAt: "",
    };
    product.id = id;
    product.name = name;
    product.description = description;
    product.duration = duration;
    product.createdAt = createdAt.slice(0, 10);
    product.quantity = quantity;
    product.rent = rent;

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
      product.supplier = this.extractUser(data);
    }
    return product;
  };
  updateBid = (bid, bidId) => {
    return this.put(`bidding-items/${bidId}`, {
      data: {
        bid,
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
