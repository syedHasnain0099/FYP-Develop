import qs from 'qs'
import GenericService from './GenericService'
import productService from './ProductService'
class OrderService extends GenericService {
    constructor() {
        super()
        this.populate = [
          'user',
          'product'
        ]
    }
    getOrders = (currentUserId,status) => {
        const allRequests = []
        return new Promise((resolve, reject) => {
            const query = qs.stringify({
                populate: this.populate,
                filters: {
                    user: {
                        id: {
                            $eq: currentUserId,
                        }
                    },
                    status: {
                        $eq: status
                    }
                },
            })
            this.get(`orders?${query}`, {})
            .then((response) => {
                // const { data } = response
                // for (let req of data) {
                //     allRequests.push(this.extractRequests(req))
                // }
                resolve(response)
            })
            .catch(err => reject(err))
        })
    }

    extractRequests = (req) => {
        const { id, attributes } = req
        const { start_date, end_date, quantity, city, createdAt, status, quote, product,users_permissions_user } = attributes

        var request = {
        id: '',
        startDate: {},
        endDate: {},
        quantity: '',
        city: '',
        createdAt: '',
        status: '',
        quote: '',
        product: {},
        requestingUser :{}
        }
        request.id = id
        request.startDate = start_date
        request.endDate = end_date
        request.quantity = quantity
        request.city = city
        request.status = status
        request.quote = quote
        request.createdAt = createdAt.slice(0, 10)

        if (product) {
            const { data } = product
            request.product = productService.extractProducts(data);
        }
        if (users_permissions_user) {
            const { data } = users_permissions_user
            request.requestingUser = productService.extractUser(data);
        }
        
        return request
    }

}
export default OrderService