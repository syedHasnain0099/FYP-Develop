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
        
        console.log("name: ",name);
        console.log("estimated price: ",price);
        let ad_reviews = [];
        if (reviews) {
            const {data} = reviews;
             for (let index = 0; index < data.length; index++) {
                const singleReview = data[index];
                ad_reviews.push(this.extractReviews(singleReview));
            }
            console.log("ad_reviews",ad_reviews)
        }

        let imageUrl='';
        if (image) {
            const {data} = image;
             for (let index = 0; index < data.length; index++) {
                const singleImage = data[index];
                imageUrl = this.extractImage(singleImage);
            }
            console.log("imageUrl: ",imageUrl)
        }
// let user;
        // const user = {}
        if (users_permissions_user) {
            const {data} = users_permissions_user;
            const {attributes} = data;
            const {username,image} = attributes;
            console.log("username: ",username)
            // const {id,attributes} = data;
            // console.log("user id: ",username);
            //  for (let index = 0; index < data.length; index++) {
            //     const singleImage = data[index];
            //     imageUrl = this.extractImage(singleImage);
            // }
            // console.log("imageUrl: ",imageUrl)
        }

        const products = {
            id,
            name,
            description,
            price,
            duration,
            ad_reviews,
            imageUrl,
            // user,
            // categoryType
        }
        // for(let att in products){
        //     console.log(`${att}: ${att.value}`);
        // }
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
    extractUser = (data) => {
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