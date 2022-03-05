import qs from 'qs'
import GenericService from './GenericService'
import axios from 'axios'
class ProductService extends GenericService{
    constructor() {
    super();
    this.populate = ['reviews','estimated_price','image','users_permissions_user','category_list'];
  }
    getAllAds = () => {
        const allProducts=[];
        new Promise((resolve, reject) => {
            const query = qs.stringify({
                populate: this.populate
                // fields: 'name,description,estimated_price'
            });
            this.get(`${axios.defaults.baseURL}products?${query}`)
            .then((response) => {
                const {data}=response;
                for(let ad of data){
                    allProducts.push(this.extractProducts(ad));
                }
                console.log(allProducts)
                resolve(allProducts)
            })
            .catch((err) => {
            console.log(err);
            reject(err);
            })
    })
    }
    getProductsByCategory(categoryListName){
        console.log("name: ",categoryListName);
        const filteredProducts=[];
        new Promise((resolve, reject) => {
            const query = qs.stringify({
                populate: this.populate,
                filters: {
                    category_list: {
                        name: categoryListName
                    }
                }
            });
            this.get(`${axios.defaults.baseURL}products?${query}`)
            .then((response) => {
                // console.log("response: ",response)
                const {data}=response;
                // console.log("data: ",data)
                for(let ad of data){
                    filteredProducts.push(this.extractProducts(ad));
                }
                console.log("products of specific category: ",filteredProducts)
                resolve(filteredProducts)
            })
            .catch((err) => {
            console.log(err);
            console.log("huh")
            reject(err);
            })
    })
    }

    find = (productName) => {
        const filteredProducts=[];
        new Promise((resolve, reject) => {
            const query = qs.stringify({
                populate: this.populate,
                filters: {
                name: productName
                }
            });
            this.get(`${axios.defaults.baseURL}products?${query}`)
            .then((response) => {
                const {data}=response;
                for(let ad of data){
                    filteredProducts.push(this.extractProducts(ad));
                }
                console.log("products with specific name: ",filteredProducts)
                resolve(filteredProducts)
            })
            .catch((err) => reject(err));
        });
    }


    extractProducts = (ad) => {
        const {id,attributes} = ad;
        const {name,description,estimated_price,reviews,image,users_permissions_user,category_list} = attributes;
        const{price,duration} = estimated_price;
        var product = {
            id:'',
            name:'',
            description:'',
            price:'',
            duration:'',
            reviews:[],
            image_urls:[],
            supplier:''
        };
        product.id=id;
        product.name=name;
        product.description=description;
        product.price=price;
        product.duration=duration;

        if (reviews) {
            const {data} = reviews;
             for (let index = 0; index < data.length; index++) {
                const singleReview = data[index];
                product.reviews.push(this.extractReviews(singleReview));
             }
        }

        if (image) {
            const {data} = image;
             for (let index = 0; index < data.length; index++) {
                const singleImage = data[index];
                product.image_urls.push(this.extractImage(singleImage));
            }
        }

        
        if (users_permissions_user) {
            const {data} = users_permissions_user;
            const {attributes} = data;
            const {username,profile_picture} = attributes;
            product.supplier=username;
            
            //  for (let index = 0; index < data.length; index++) {
            //     const singleImage = data[index];
            //     image_urls = this.extractImage(singleImage);
            // }
            // console.log("image_urls: ",imageimage_ur)
        }
        // for(let att in product){
        //     console.log(`${att}: ${product[att]}`);
        // }
        return product
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