import qs from 'qs'
import GenericService from './GenericService'
import productService from './ProductService'
// import productService from './ProductService'
import axios from 'axios'
class QuoteService extends GenericService {
    sendRequestQuote = (startDate, endDate, quantity, city, userId, productId) => {
        return this.post(`request-quotes`, {
            data: {
                start_date: startDate,
                end_date: endDate,
                quantity: quantity,
                city: city,
                users_permissions_user: userId,
                product: productId,
            }
        })
    }

    getRequestQuotes = (currentUserId) => {
        const allRequests = []
        return new Promise((resolve, reject) => {
            const query = qs.stringify({
                filters: {
                    product: {
                        users_permissions_user: {
                        id: {
                            $eq: currentUserId,
                        }
                        },
                    }
                },
            })
            this.get(`request-quotes?populate=product.users_permissions_user&${query}`, {})
                .then((response) => {
                const { data } = response
                for (let req of data) {
                    allRequests.push(this.extractRequests(req))
                }
                resolve(allRequests)
                })
                .catch((err) => {
                reject(err)
                })
        })
    }

    extractRequests = (req) => {
        const { id, attributes } = req
        const { start_date, end_date, quantity, city, createdAt, product } = attributes

        var request = {
        id: '',
        startDate: {},
        endDate: {},
        quantity: '',
        city: '',
        createdAt: '',
        product: {}
        }
        request.id = id
        request.startDate = start_date
        request.endDate = end_date
        request.quantity = quantity
        request.city = city
        request.createdAt = createdAt.slice(0, 10)

        if (product) {
            const { data } = product
            request.product = productService.extractProducts(data);
        }
        return request
    }

}
export default QuoteService