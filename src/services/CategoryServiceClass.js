import qs from 'qs'
import GenericService from './GenericService'
import axios from 'axios'
class CategoryService extends GenericService {
  //     constructor() {
  //     super();
  //     this.populate = ['category'];
  //   }

  getCategories = () => {
    const allCategories = []
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        fields: 'name',
      })
      this.get(`${axios.defaults.baseURL}categories?${query}`)
        .then((response) => {
          const { data } = response
          for (let category of data) {
            allCategories.push(this.extractCategory(category))
          }
          resolve(allCategories)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }
  getCategoryList = (categoryName) => {
    const categoryList = []
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        fields: 'name',
        filters: {
          category: {
            name: categoryName,
          },
        },
      })
      this.get(`${axios.defaults.baseURL}category-lists?${query}`)
        .then((response) => {
          const { data } = response
          for (let categoryType of data) {
            categoryList.push(this.extractCategoryList(categoryType))
          }
          console.log(categoryList)
          resolve(categoryList)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }

  extractCategory = (data) => {
    const { attributes } = data
    const { name } = attributes
    return { name }
  }
  extractCategoryList = (data) => {
    const { attributes } = data
    const { name } = attributes
    return { name }
  }
}
export default CategoryService
