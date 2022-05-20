import qs from 'qs'
import GenericService from './GenericService'
import productService from './ProductService'
// import productService from './ProductService'
import axios from 'axios'
class ShippingService extends GenericService {
    constructor() {
        super()
        this.populate = [
          'users_permissions_user',
        ]
    }
    addShippingDetail = (fullName, address, cellno, country, city, postalCode, renter) => {
        return this.post(`shipping-details`, {
            data: {
                full_name: fullName,
                address: address,
                contact_number: cellno,
                country: country,
                city: city,
                postal_code: postalCode,
                users_permissions_user: renter
            }
        })
    }
    
    getShippingDetail = (currentUserId) => {
        let shippingDetail={}
        return new Promise((resolve, reject) => {
            const query = qs.stringify({
                populate: this.populate,
                filters: {
                    users_permissions_user: {
                        id: {
                            $eq: currentUserId,
                        }
                    },
                },
            })
            this.get(`shipping-details?${query}`, {})
            .then((response) => {
                //extract last element of array
                
                const { data } = response
                console.log(data[data.length-1])
                shippingDetail=this.extractShippingDetail(data[data.length-1])
                resolve(shippingDetail)
            })
            .catch(err => reject(err))
        })
    }
    extractShippingDetail = (shData) => {
        var shippingDetail={
            shippingId: '',
            fullName:'',
            address:'',
            cellno: '',
            country: '',
            postalCode: '',
            user: {},
            city:''
        }
        const{id, attributes} = shData
        const{full_name, address, contact_number, city, postal_code, country,users_permissions_user}= attributes
        
        const { data } = users_permissions_user
        shippingDetail.user = productService.extractUser(data);
        console.log("user data: ",shippingDetail.user)
        shippingDetail.fullName=full_name
        shippingDetail.country=country
        shippingDetail.city=city
        shippingDetail.postalCode=postal_code
        shippingDetail.cellno='+92'+contact_number
        shippingDetail.address=address
        shippingDetail.shippingId=id

        return shippingDetail
    }
}
export default ShippingService