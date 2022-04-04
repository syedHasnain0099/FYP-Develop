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
      this.get(`products?${query}`, {})
        .then((response) => {
          const { data } = response
          for (let ad of data) {
            allProducts.push(this.extractProducts(ad))
          }
          resolve(allProducts)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  getRequestedAds = () => {
    const allads = []
    return new Promise((resolve, reject) => {
      this.get(
        `requested-ads?populate=product_media,users_permissions_user,category_list`,
        {}
      ).then((response) => {
        const { data } = response
        for (let ad of data) {
          allads.push(this.extractAds(ad))
        }
        resolve(allads)
      })
    })
  }

  postAd = (
    name,
    description,
    rent,
    duration,
    categoryId,
    quantity,
    id,
    mediaIds,
    videoMediaId
  ) => {
    // mediaIds.push(videoMediaId)
    const Id = [mediaIds, videoMediaId]
    console.log(mediaIds)
    // console.log(Id[0])
    // console.log(Id[1])
    return this.post(`requested-ads`, {
      data: {
        product_name: name,
        product_decription: description,
        product_media: Id,
        product_quantity: quantity,
        estimated_rent: rent,
        estimated_duration: duration,
        users_permissions_user: id,
        category_list: categoryId,
      },
    })
  }
  deleteRequestedAd = (id) => {
    return this.delete(`requested-ads/${id}`)
  }

  uploadPost = (post) => {
        const Id = [post.mediaIds, post.videoMediaId]
    console.log("post media ids",post.mediaIds)
    return this.post(`products`, {
      data: {
        name: post.name,
        description: post.description,
        image: Id,
        estimated_price:{
          price: post.rent,
          duration: post.duration
        },
        quantity: post.quantity,
        users_permissions_user: post.id,
        category_list: post.categoryId,
      },
    })
  }

  getUserAds = (userId) =>{
    const allAds = []
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        filters: {
          users_permissions_user: {
            id: userId
          }
        }
      })
      this.get(`products?populate=users_permissions_user&${query}`, {})
        .then((response) => {
          const { data } = response
          for (let ad of data) {
            allAds.push(this.extractProducts(ad))
          }
          resolve(allAds)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  uploadMedia = (files) => {
    let mediaIds = ''
    const data = new FormData()
    if (!files[0]) {
      console.log('please select some file')
    }
    for (let i = 0; i < files.length; i++) {
      data.append('files', files[i])
      console.log('file: ', files[i])
    }
    return new Promise((resolve, reject) => {
      axios
        .post(`upload`, data, {
          onUploadProgress: (progress) => {
            const { loaded, total } = progress
            const percentage = `${Math.round((loaded / total) * 100)}%`
            console.log('loading percentage: ', percentage)
          },
        })
        .then((response) => {
          const { data } = response
          for (let singleMedia of data) {
            mediaIds = this.extractMediaId(singleMedia)
          }
          resolve(mediaIds)
        })
        .catch((err) => reject(err))
    })
  }
  extractMediaId = (data) => {
    const { id } = data
    return id
  }
  getProductsByCategory = (categoryListName) => {
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
      this.get(`products?${query}`)
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
  findOne = (productId) => {
    const filteredProduct = []
    const query = qs.stringify({
        populate: this.populate,
      })
    return new Promise((resolve, reject) => {
      this.get(`products/${productId}?${query}`)
        .then((response) => {
          const { data } = response
          filteredProduct.push(this.extractProducts(data))
          resolve(filteredProduct)
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
      this.get(`products?${query}`)
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
  search = (keyword, subCatgeryName = '') => {
    const filteredProducts = []
    let query
    return new Promise((resolve, reject) => {
      if (subCatgeryName == '') {
        query = qs.stringify({
          populate: this.populate,
          filters: {
            name: {
              $containsi: keyword,
            },
          },
        })
      } else {
        console.log('subcatgeoyr id : ', subCatgeryName)
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
        })
      }
      this.get(`products?${query}`)
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
      category_list,
    } = attributes

    var ad = {
      id: '',
      name: '',
      description: '',
      quantity: '',
      rent: '',
      duration: '',
      image_urls: [],
      supplier: {},
      categoryType: '',
    }
    ad.id = id
    ad.name = product_name
    ad.description = product_description
    ad.quantity = product_quantity
    ad.rent = estimated_rent
    ad.duration = estimated_duration
    ad.categoryType = category_list
    const { data } = product_media
    if (data) {
      for (let index = 0; index < data.length; index++) {
        const singleMedia = data[index]
        ad.image_urls.push(this.extractImage(singleMedia))
      }
    }
    const { sup_data } = users_permissions_user
    if (sup_data) {
      ad.supplier = this.extractSupplier(sup_data)
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
