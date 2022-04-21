import qs from 'qs'
import GenericService from './GenericService'
import axios from 'axios'
class CategoryService extends GenericService {
  getCategories = () => {
    const allCategories = []
    return new Promise((resolve, reject) => {
      const query = qs.stringify({
        fields: 'name',
      })
      this.get(`categories?${query}`)
        .then((response) => {
          const { data } = response
          for (let category of data) {
            allCategories.push(this.extractCategory(category))
          }
          resolve(allCategories)
        })
        .catch((err) => reject(err))
    })
  }
  addSubCategory = (subcategoryName, categoryId) => {
    return this.post(`category-lists`,
    {
      "data": {
        "name":subcategoryName,
        "category":categoryId
      }
    })
  }
  deleteSubCategory = (subcategoryId) => {
    return this.delete(`category-lists/${subcategoryId}`)
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
      this.get(`category-lists?${query}`)
        .then((response) => {
          const { data } = response
          for (let categoryType of data) {
            categoryList.push(this.extractCategoryList(categoryType))
          }
          resolve(categoryList)
        })
        .catch((err) => reject(err))
    })
  }

  extractCategory = (data) => {
    const { id, attributes } = data
    const { name } = attributes
    return { id,name }
  }
  extractCategoryList = (data) => {
    const { id,attributes } = data
    const { name } = attributes
    return { id,name }
  }
}
export default CategoryService
