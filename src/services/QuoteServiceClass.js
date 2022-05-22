import qs from 'qs'
import GenericService from './GenericService'
import productService from './ProductService'
class QuoteService extends GenericService {
    constructor() {
        super()
        this.populate = [
          'product.users_permissions_user',
          'product.image',
          'users_permissions_user',
          'product'
        ]
    }
    sendRequestQuote = (startDate, endDate, quantity, city, userId, productId, quote, st) => {
        return this.post(`request-quotes`, {
            data: {
                start_date: startDate,
                end_date: endDate,
                quantity: quantity,
                city: city,
                users_permissions_user: userId,
                product: productId,
                quote: quote,
                status: st
            }
        })
    }
    updateQuote = (quote,status,id) => {
        return this.put(`request-quotes/${id}`, {
            data: {
              quote,
              status
            }
    })
    }
    getProductOfQuote = (qid,status) => {
        return new Promise((resolve, reject)=> {
            const query = qs.stringify({
                filters: {
                    status: {
                        $eq: status
                    }
                },
            })
            this.get(`request-quotes/${qid}?${query}&populate=product,product.image`, {})
            .then((response) => {
                let prod=[]
                const { data } = response
                const {attributes} = data
                const {product,quote} = attributes
                if(product){
                    const {data} = product
                    let prodRes=productService.extractProducts(data)
                    prodRes.quote=quote
                    prod.push(prodRes)
                }
                resolve(prod)
            })
            .catch(err => reject(err))
        })
    }
    getRequestQuotes = (currentUserId,status) => {
        const allRequests = []
        return new Promise((resolve, reject) => {
            const query = qs.stringify({
                populate: this.populate,
                filters: {
                    product: {
                        users_permissions_user: {
                            id: {
                                $eq: currentUserId,
                            }
                        },
                    },
                    status: {
                        $eq: status
                    }
                },
            })
            this.get(`request-quotes?${query}`, {})
            .then((response) => {
                const { data } = response
                for (let req of data) {
                    allRequests.push(this.extractRequests(req))
                }
                resolve(allRequests)
            })
            .catch(err => reject(err))
        })
    }
    getQuoteRequestResponse = (currentUserId,status) => {
        const allRequests = []
        return new Promise((resolve, reject) => {
            const query = qs.stringify({
                populate: this.populate,
                filters: {
                    users_permissions_user: {
                        id: {
                            $eq: currentUserId,
                        }
                    },
                    status: {
                        $eq: status
                    }
                },
            })
            this.get(`request-quotes?${query}`, {})
            .then((response) => {
                const { data } = response
                for (let req of data) {
                    allRequests.push(this.extractRequests(req))
                }
                resolve(allRequests)
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
export default QuoteService