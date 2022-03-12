import qs from 'qs'
import GenericService from './GenericService'
import axios from 'axios'
class ProductService extends GenericService {
  constructor() {
    super()
    this.populate = 
    [
      'reviews',
      'estimated_price',
      'image',
      'users_permissions_user',
      'category_list',
    ]
  }
  getAllAds = () => {
    const allProducts = []
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        populate: this.populate,
      })
      this.get(`${axios.defaults.baseURL}products?${query}`,{})
      .then((response) => {
          const { data } = response
          for (let ad of data) {
            allProducts.push(this.extractProducts(ad))
          }
          resolve(allProducts)
        })
        .catch((err) => {
          reject(err);
        })
      })
    }
    getRequestedAds = () => {
      const allads = []
    return new Promise((resolve, reject) => {
      this.get(`${axios.defaults.baseURL}requested-ads?populate=product_media,users_permissions_user,category_list`)
      .then((response) => {
          const { data } = response
          for (let ad of data) {
            allads.push(this.extractProducts(ad))
          }
          resolve(allads)
        })
        .catch((err) => {
          reject(err);
        })
      })
    }
    requestConfirmation = () => {

  }
  postAd = (name,description,rent, photo, duration,subcategory,quantity,id) => {
    return new Promise((resolve,reject) => {
      this.authPost(`${axios.defaults.baseURL}requested-ads`, {
        product_name:name,
        product_decription:description,
        product_media:photo,
        product_quantity:quantity,
        estimated_rent:rent,
        estimated_duration:duration,
        users_permissions_user:id,
        category_list:subcategory
    })
    })
  }
  getProductsByCategory(categoryListName) {
    const filteredProducts = []
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        populate: this.populate,
        filters: {
          category_list: {
            name: categoryListName,
          },
        },
      })
      this.get(`${axios.defaults.baseURL}products?${query}`)
        .then((response) => {
          const { data } = response
          for (let ad of data) {
            filteredProducts.push(this.extractProducts(ad))
          }
          resolve(filteredProducts)
        })
        .catch((err) => reject(err))
    })
  }

  find = (productName) => {
    const filteredProducts = []
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        populate: this.populate,
        filters: {
          name: productName,
        },
      })
      this.get(`${axios.defaults.baseURL}products?${query}`)
        .then((response) => {
          const { data } = response
          for (let ad of data) {
            filteredProducts.push(this.extractProducts(ad))
          }
          resolve(filteredProducts)
        })
        .catch((err) => reject(err))
    })
  }
  extractAds = (ad) => {
    const { id, attributes } = ad
    const {
      product_name,
      product_description,
      product_quantity,
      estimated_rent,
      estimated_duration,
      product_media,
      users_permissions_user,
      category_list
    } = attributes
    
    var ad = {
      id: '',
      name: '',
      description: '',
      quantity:'',
      rent: '',
      duration: '',
      image_urls: [],
      supplier: {},
      categoryType:''
    }
    ad.id = id
    ad.name = product_name
    ad.description = product_description
    ad.quantity=product_quantity
    ad.rent = estimated_rent
    ad.duration = estimated_duration
    ad.categoryType=category_list


    if (product_media) {
      const { data } = product_media
      for (let index = 0; index < data.length; index++) {
        const singleMedia = data[index]
        ad.image_urls.push(this.extractImage(singleMedia))
      }
    }

    if (users_permissions_user) {
      const { data } = users_permissions_user
      ad.supplier = this.extractSupplier(data)
    }
    return ad
  }
  extractProducts = (ad) => {
    const { id, attributes } = ad
    const {
      name,
      description,
      estimated_price,
      reviews,
      image,
      users_permissions_user,
    } = attributes
    const { price, duration } = estimated_price
    var product = {
      id: '',
      name: '',
      description: '',
      price: '',
      duration: '',
      reviews: [],
      image_urls: [],
      supplier: {},
    }
    product.id = id
    product.name = name
    product.description = description
    product.price = price
    product.duration = duration

    if (reviews) {
      const { data } = reviews
      for (let index = 0; index < data.length; index++) {
        const singleReview = data[index]
        product.reviews.push(this.extractReviews(singleReview))
      }
    }

    if (image) {
      const { data } = image
      for (let index = 0; index < data.length; index++) {
        const singleImage = data[index]
        product.image_urls.push(this.extractImage(singleImage))
      }
    }

    if (users_permissions_user) {
      const { data } = users_permissions_user
      product.supplier = this.extractSupplier(data)
    }
    // for(let att in product){
    //     console.log(`${att}: ${product[att]}`);
    // }
    return product
  }
  extractReviews = (data) => {
    const { id, attributes } = data
    const { content, rating } = attributes
    return { content, rating }
  }
  extractSupplier = (data) => {
    const { id, attributes } = data
    const { username } = attributes
    return { id, username }
  }
  extractImage = (data) => {
    const { attributes } = data
    const { url } = attributes
    return url
  }
  extractCategoryType = (data) => {
    const { id, attributes } = data
    const { content, rating } = attributes
    return { content, rating }
  }
}
export default ProductService
