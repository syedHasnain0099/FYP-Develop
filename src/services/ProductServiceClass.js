import qs from 'qs'
import GenericService from './GenericService'
import axios from 'axios'
class ProductService extends GenericService {
  constructor() {
    super()
    this.populate = [
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
      this.get(`${axios.defaults.baseURL}products?${query}`)
        .then((response) => {
          const { data } = response
          for (let ad of data) {
            allProducts.push(this.extractProducts(ad))
          }
          resolve(allProducts)
        })
        .catch((err) => reject(err))
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
