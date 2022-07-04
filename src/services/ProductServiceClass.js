import qs from "qs";
import GenericService from "./GenericService";
import axios from "axios";
import moment from "moment";
class ProductService extends GenericService {
  constructor() {
    super();
    this.populate = [
      "reviews",
      "image",
      "users_permissions_user",
      "category_list",
    ];
  }
  getAllAds = (userId) => {
    const allProducts = [];
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        populate: this.populate,
        filters: {
          users_permissions_user: {
            id: {
              $ne: userId,
            },
          },
        },
      });
      this.get(`products?${query}`, {})
        .then((response) => {
          const { data } = response;
          var currProduct = {};
          for (let ad of data) {
            currProduct = this.extractProducts(ad);
            if (currProduct.quantity >= 1) {
              allProducts.push(currProduct);
            }
          }
          resolve(allProducts);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  getRequestedAds = () => {
    const allads = [];
    return new Promise((resolve, reject) => {
      this.get(
        `requested-ads?populate=product_media,users_permissions_user,category_list`,
        {}
      ).then((response) => {
        const { data } = response;
        for (let ad of data) {
          allads.push(this.extractAds(ad));
        }
        resolve(allads);
      });
    });
  };
  postAd = (
    name,
    description,
    rent,
    duration,
    categoryId,
    quantity,
    id,
    mediaIds
  ) => {
    return this.post(`requested-ads`, {
      data: {
        product_name: name,
        product_description: description,
        product_media: mediaIds,
        product_quantity: quantity,
        estimated_rent: rent,
        estimated_duration: duration,
        users_permissions_user: id,
        category_list: categoryId,
      },
    });
  };
  updateProduct = (
    pId,
    name,
    description,
    rent,
    duration,
    categoryTypeId,
    quantity,
    image_ids
  ) => {
    return this.put(`products/${pId}`, {
      data: {
        name: name,
        description: description,
        image: image_ids,
        rent: rent,
        duration: duration,
        quantity: quantity,
        category_list: categoryTypeId,
      },
    });
  };
  addRejectedAd = (
    { name, description, rent, duration, categoryTypeId, quantity, image_ids },
    supplierId
  ) => {
    console.log("supplier id: ", supplierId);
    return this.post(`rejected-ads`, {
      data: {
        product_name: name,
        product_description: description,
        media_files: image_ids,
        rent: rent,
        duration: duration,
        quantity: quantity,
        users_permissions_user: supplierId,
        category_list: categoryTypeId,
      },
    });
  };
  deleteRequestedAd = (id) => {
    return this.delete(`requested-ads/${id}`);
  };
  uploadPost = (
    name,
    description,
    rent,
    duration,
    categoryTypeId,
    quantity,
    supplierId,
    image_ids
  ) => {
    return this.post(`products`, {
      data: {
        name: name,
        description: description,
        image: image_ids,
        rent: rent,
        duration: duration,
        quantity: quantity,
        users_permissions_user: supplierId,
        category_list: categoryTypeId,
      },
    });
  };
  uploadReview = (comment, rating, prodId, userId) => {
    return this.post(`reviews`, {
      data: {
        content: comment,
        rating: rating,
        product: prodId,
        users_permissions_user: userId,
      },
    });
  };
  deleteReview = (id) => {
    return new Promise((resolve, reject) => {
      this.delete(`reviews/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  };
  deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
      this.delete(`products/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  };

  getReportedAds = (id = "") => {
    const products = [];
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        filters: {
          reporting_reason: {
            $notNull: true,
          },
        },
      });
      this.get(`products/${id}?populate=*&${query}`, {})
        .then((response) => {
          const { data } = response;
          if (Array.isArray(data)) {
            for (let product of data) {
              products.push(this.extractProducts(product));
            }
          } else {
            products.push(this.extractProducts(data));
          }
          resolve(products);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  getReviews = (prodId) => {
    const reviews = [];
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        filters: {
          product: {
            id: {
              $eq: prodId,
            },
          },
        },
      });
      this.get(`reviews?populate=users_permissions_user,product&${query}`, {})
        .then((response) => {
          const { data } = response;
          for (let review of data) {
            reviews.push(this.extractReviews(review));
          }
          resolve(reviews);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  getRejectedAds = (userId) => {
    const allAds = [];
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        filters: {
          users_permissions_user: {
            id: {
              $eq: userId,
            },
          },
        },
      });
      this.get(
        `rejected-ads?populate=users_permissions_user,media_files&${query}`,
        {}
      )
        .then((response) => {
          const { data } = response;
          for (let ad of data) {
            allAds.push(this.extractRejectedAds(ad));
          }
          resolve(allAds);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  deleteRejectedAd = (adId) => {
    return new Promise((resolve, reject) => {
      this.delete(`rejected-ads/${adId}`)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  };
  getUserAds = (userId) => {
    const allAds = [];
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        filters: {
          users_permissions_user: {
            id: {
              $eq: userId,
            },
          },
        },
      });
      this.get(`products?populate=users_permissions_user,image&${query}`, {})
        .then((response) => {
          const { data } = response;
          for (let ad of data) {
            allAds.push(this.extractProducts(ad));
          }
          resolve(allAds);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  uploadMedia = (files) => {
    let mediaIds = [];
    const data = new FormData();
    if (!files[0]) {
      console.log("please select some file");
    }
    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
      console.log("file: ", files[i]);
    }
    return new Promise((resolve, reject) => {
      axios
        .post(`upload`, data, {
          onUploadProgress: (progress) => {
            const { loaded, total } = progress;
            const percentage = `${Math.round((loaded / total) * 100)}%`;
            console.log("loading percentage: ", percentage);
          },
        })
        .then((response) => {
          console.log("response of image uploading: ", response);
          const { data } = response;
          for (let singleMedia of data) {
            mediaIds.push(this.extractMediaId(singleMedia));
          }
          resolve(mediaIds);
        })
        .catch((err) => reject(err));
    });
  };
  extractMediaId = (data) => {
    const { id } = data;
    return id;
  };
  splitImageVideo = (file) => {
    const videos = [];
    const images = [];
    var match = file.match(/^data:([^/]+)\/([^;]+);/) || [];
    var type = match[1];
    var format = match[2];
    if (type == "video") {
      videos.push(file);
    } else if (type == "image") {
      images.push(file);
    }
  };
  checkMediaType = (media_url) => {
    let result = media_url.slice(-3);
    if (result == "jpg") {
      return "image";
    }
    if (result == "PNG") {
      return "image";
    }
    if (result == "jpeg") {
      return "image";
    }
    if (result == "png") {
      return "image";
    }
    if (result == "webp") {
      return "image";
    } else if (result == "mp4") {
      return "video";
    }
  };
  getProductsByCategory = (categoryListName) => {
    const filteredProducts = [];
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        populate: this.populate,
        filters: {
          category_list: {
            name: categoryListName,
          },
        },
      });
      this.get(`products?${query}`)
        .then((response) => {
          const { data } = response;
          for (let ad of data) {
            filteredProducts.push(this.extractProducts(ad));
          }
          resolve(filteredProducts);
        })
        .catch((err) => reject(err));
    });
  };
  findOneProduct = (productId) => {
    const filteredProduct = [];
    const query = qs.stringify({
      populate: this.populate,
    });
    return new Promise((resolve, reject) => {
      this.get(`products/${productId}?${query}`)
        .then((response) => {
          const { data } = response;
          filteredProduct.push(this.extractProducts(data));
          resolve(filteredProduct);
        })
        .catch((err) => reject(err));
    });
  };
  findOneRequestedAd = (productId) => {
    const filteredProduct = [];
    return new Promise((resolve, reject) => {
      this.get(
        `requested-ads/${productId}?populate=product_media,users_permissions_user,category_list`
      )
        .then((response) => {
          const { data } = response;
          filteredProduct.push(this.extractAds(data));
          resolve(filteredProduct);
        })
        .catch((err) => reject(err));
    });
  };
  find = (productName) => {
    const filteredProducts = [];
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        populate: this.populate,
        filters: {
          name: productName,
        },
      });
      this.get(`products?${query}`)
        .then((response) => {
          const { data } = response;
          for (let ad of data) {
            filteredProducts.push(this.extractProducts(ad));
          }
          resolve(filteredProducts);
        })
        .catch((err) => reject(err));
    });
  };
  search = (keyword, subCatgeryName = "") => {
    const filteredProducts = [];
    let query;
    return new Promise((resolve, reject) => {
      if (subCatgeryName == "") {
        query = qs.stringify({
          populate: this.populate,
          filters: {
            name: {
              $containsi: keyword,
            },
          },
        });
      } else {
        console.log("subcatgeoyr id : ", subCatgeryName);
        query = qs.stringify({
          populate: this.populate,
          filters: {
            category_list: {
              name: {
                $eq: subCatgeryName,
              },
            },
            name: {
              $containsi: keyword,
            },
          },
        });
      }
      this.get(`products?${query}`)
        .then((response) => {
          const { data } = response;
          for (let ad of data) {
            filteredProducts.push(this.extractProducts(ad));
          }
          resolve(filteredProducts);
        })
        .catch((err) => reject(err));
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
      this.get(`products?${query}`)
        .then((response) => {
          const { data } = response;
          for (let ad of data) {
            filteredProducts.push(this.extractProducts(ad));
          }
          resolve(filteredProducts);
        })
        .catch((err) => reject(err));
    });
  };
  extractRejectedAds = (ad) => {
    const { id, attributes } = ad;
    const {
      product_name,
      product_description,
      quantity,
      rent,
      duration,
      media_files,
      users_permissions_user,
      category_list,
    } = attributes;

    var ad = {
      id: "",
      name: "",
      description: "",
      quantity: "",
      rent: "",
      duration: "",
      image_urls: [],
      image_ids: [],
      supplier: {},
      categoryType: "",
      categoryTypeId: "",
      createdAt: "",
    };
    ad.id = id;
    ad.name = product_name;
    ad.description = product_description;
    ad.quantity = quantity;
    ad.rent = rent;
    ad.duration = duration;
    const { data } = media_files;
    if (data) {
      for (let index = 0; index < data.length; index++) {
        const singleMedia = data[index];
        const extractedData = this.extractImage(singleMedia);
        ad.image_urls.push(extractedData.url);
        ad.image_ids.push(extractedData.id);
      }
    }
    if (users_permissions_user) {
      const { data } = users_permissions_user;
      if (data) {
        ad.supplier = this.extractUser(data);
      }
    }
    if (category_list) {
      const { data } = category_list;
      if (data) {
        const extractedData = this.extractSubcategoryName(data);
        ad.categoryType = extractedData.name;
        ad.categoryTypeId = extractedData.id;
      }
    }
    return ad;
  };
  extractAds = (ad) => {
    const { id, attributes } = ad;
    const {
      product_name,
      product_description,
      product_quantity,
      estimated_rent,
      estimated_duration,
      product_media,
      users_permissions_user,
      category_list,
      createdAt,
    } = attributes;

    var ad = {
      id: "",
      name: "",
      description: "",
      quantity: "",
      rent: "",
      duration: "",
      image_urls: [],
      image_ids: [],
      supplier: {},
      categoryType: "",
      categoryTypeId: "",
      createdAt: "",
    };
    ad.id = id;
    ad.name = product_name;
    ad.description = product_description;
    ad.quantity = product_quantity;
    ad.rent = estimated_rent;
    ad.duration = estimated_duration;
    ad.createdAt = createdAt.slice(0, 10);
    const { data } = product_media;
    if (data) {
      for (let index = 0; index < data.length; index++) {
        const singleMedia = data[index];
        const extractedData = this.extractImage(singleMedia);
        ad.image_urls.push(extractedData.url);
        ad.image_ids.push(extractedData.id);
      }
    }
    if (users_permissions_user) {
      const { data } = users_permissions_user;
      if (data) {
        ad.supplier = this.extractUser(data);
      }
    }
    if (category_list) {
      const { data } = category_list;
      if (data) {
        const extractedData = this.extractSubcategoryName(data);
        ad.categoryType = extractedData.name;
        ad.categoryTypeId = extractedData.id;
      }
    }
    return ad;
  };
  extractMediaIdfromUrl = (url) => {
    let addMids = [];
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        filters: {
          url: {
            $eq: url,
          },
        },
      });
      this.get(`upload/files?${query}`, {})
        .then((response) => {
          for (let im of response) {
            addMids.push(im.id);
          }
          resolve(addMids);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  extractProducts = (ad) => {
    const { id, attributes } = ad;
    const {
      name,
      description,
      rent,
      duration,
      reviews,
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

    if (reviews) {
      const { data } = reviews;
      for (let index = 0; index < data.length; index++) {
        const singleReview = data[index];
        product.reviews.push(this.extractReviews(singleReview));
      }
    }
    if (category_list) {
      const { data } = category_list;
      const extractedData = this.extractSubcategoryName(data);
      product.subCategory = extractedData.name;
      product.subCategoryId = extractedData.id;
    }

    if (image) {
      const { data } = image;
      for (let index = 0; index < data.length; index++) {
        const singleImage = data[index];
        const extractedData = this.extractImage(singleImage);
        product.image_urls.push(extractedData.url);
      }
    }

    if (users_permissions_user) {
      const { data } = users_permissions_user;
      product.supplier = this.extractUser(data);
    }
    return product;
  };
  extractSubcategoryName = (data) => {
    const { id, attributes } = data;
    const { name } = attributes;
    return { id, name };
  };
  extractReviews = (rev) => {
    let user = {};
    let productDetails = {};
    const { id, attributes } = rev;
    const { content, rating, users_permissions_user, createdAt, product } =
      attributes;
    if (users_permissions_user) {
      const { data } = users_permissions_user;
      user = this.extractUser(data);
    }
    if (product) {
      const { data } = product;
      if (data) {
        productDetails = this.extractProducts(data);
      }
    }
    return {
      id,
      content,
      rating,
      user,
      createdAt,
      productDetails,
    };
  };
  extractUser = (data) => {
    const { id, attributes } = data;
    const { username, email, contact_number } = attributes;
    const code = "+92";

    const contactNumber = code + contact_number;
    return { id, username, email, contactNumber };
  };
  extractImage = (data) => {
    const { id, attributes } = data;
    const { url } = attributes;
    return { id, url };
  };
}
export default ProductService;
