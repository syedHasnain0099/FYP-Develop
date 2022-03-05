import qs from 'qs'
import GenericService from './GenericService'
import axios from 'axios'
class ProductService extends GenericService{
    constructor() {
    super();
    this.populate = ['reviews','estimated_price','image','users_permissions_user','category_list'];
  }
  
    getAllAds = () => {
        new Promise((resolve, reject) => {
            const query = qs.stringify({
                populate: this.populate
                // fields: 'name,description,estimated_price'
            });
            this.get(`${axios.defaults.baseURL}products?${query}`)
            .then((response) => {
                const {data}=response;
                for(let ad of data){
                    this.extractProducts(ad);
                }
            resolve(data)
            })
            .catch((err) => {
            console.log(err);
            reject(err);
            })
    })
    }
    extractProducts = (ad) => {
        const {id,attributes} = ad;
        const {name,description,estimated_price,reviews,image,users_permissions_user,category_list} = attributes;
        const{price,duration} = estimated_price;
        var products = {
            id:'',
            name:'',
            description:'',
            price:'',
            duration:'',
            reviews:{},
            url:'',
            user:''
        };
        products.id=id;
        products.name=name;
        products.description=description;
        products.price=price;
        products.duration=duration;

        if (reviews) {
            const {data} = reviews;
             for (let index = 0; index < data.length; index++) {
                const singleReview = data[index];
                products.reviews=this.extractReviews(singleReview);
            }
            console.log("ad_reviews",products.reviews)
        }

        if (image) {
            const {data} = image;
             for (let index = 0; index < data.length; index++) {
                const singleImage = data[index];
                products.url = this.extractImage(singleImage);
            }
        }

        
        if (users_permissions_user) {
            const {data} = users_permissions_user;
            const {attributes} = data;
            const {username,profile_picture} = attributes;
            products.user=username;
            
            //  for (let index = 0; index < data.length; index++) {
            //     const singleImage = data[index];
            //     imageUrl = this.extractImage(singleImage);
            // }
            // console.log("imageUrl: ",imageUrl)
        }
        for(let att in products){
            console.log(`${att}: ${products[att]}`);
        }
        return products
    }
    extractReviews = (data) => {
        const {id,attributes} = data;
        const {content,rating} = attributes;
        return {content,rating}
    }
    extractImage = (data) => {
        const {attributes} = data;
        const {url} = attributes;
        return url;
    }
    extractUserDP = (data) => {
        const {id,attributes} = data;
        const {content,rating} = attributes;
        return {content,rating}
    }
    extractCategoryType = (data) => {
        const {id,attributes} = data;
        const {content,rating} = attributes;
        return {content,rating}
    }
}
export default ProductService