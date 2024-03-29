import qs from "qs";
import GenericService from "./GenericService";
import productService from "./ProductService";
// import productService from './ProductService'
import axios from "axios";
class ShippingService extends GenericService {
  constructor() {
    super();
    this.populate = ["user"];
  }
  addShippingDetail = (
    fullName,
    address,
    cellno,
    country,
    city,
    postalCode,
    renter
  ) => {
    return this.post(`shipping-details`, {
      data: {
        full_name: fullName,
        address: address,
        contact_number: cellno,
        country: country,
        city: city,
        postal_code: postalCode,
        user: renter,
      },
    });
  };
  updateShippingDetail = (shD, shipId) => {
    return this.put(`shipping-details/${shipId}`, {
      data: {
        full_name: shD.fullName,
        address: shD.address,
        contact_number: shD.cellPhone,
        country: shD.country,
        city: shD.city,
        postal_code: shD.postalCode,
      },
    });
  };

  getShippingDetail = (currentUserId) => {
    let shippingDetail = {};
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        populate: this.populate,
        filters: {
          user: {
            id: {
              $eq: currentUserId,
            },
          },
        },
      });
      this.get(`shipping-details?${query}`, {})
        .then((response) => {
          //extract last element of array
          const { data } = response;
          if (data[data.length - 1]) {
            console.log(data[data.length - 1]);
            shippingDetail = this.extractShippingDetail(data[data.length - 1]);
            resolve(shippingDetail);
          }
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  };
  extractShippingDetail = (shData) => {
    var shippingDetail = {
      id: "",
      shippingId: "",
      fullName: "",
      address: "",
      cellPhone: "",
      country: "",
      postalCode: "",
      user: {},
      city: "",
    };
    const { id, attributes } = shData;
    const {
      full_name,
      address,
      contact_number,
      city,
      postal_code,
      country,
      user,
    } = attributes;

    const { data } = user;
    shippingDetail.user = productService.extractUser(data);
    console.log("user data: ", shippingDetail.user);
    shippingDetail.fullName = full_name;
    shippingDetail.country = country;
    shippingDetail.city = city;
    shippingDetail.id = id;
    shippingDetail.postalCode = postal_code;
    shippingDetail.cellPhone = contact_number;
    shippingDetail.address = address;
    shippingDetail.shippingId = id;

    return shippingDetail;
  };
}
export default ShippingService;
