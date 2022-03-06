import axios from 'axios'
const product_card = [
  {
    id: 1,
    product_name: 'Rayes Alpha',
    description: 'Hands-free, Hads-on Mushc Experience',
    price: 350,
    currency: '$',
    thumb: './images/1.png',
  },
  {
    id: 2,
    product_name: 'Rayes Z30',
    description: 'Hands-free, Hads-on Mushc Experience',
    price: 250,
    currency: '$',
    thumb: './images/2.png',
  },
  {
    id: 3,
    product_name: 'Rayes X30',
    description: 'Hands-free, Hads-on Mushc Experience',
    price: 350,
    currency: '$',
    thumb: './images/3.png',
  },
  {
    id: 4,
    product_name: 'Rayes Alpha',
    description: 'Hands-free, Hads-on Mushc Experience',
    price: 350,
    currency: '$',
    thumb: './images/1.png',
  },
  {
    id: 5,
    product_name: 'Rayes Z30',
    description: 'Hands-free, Hads-on Mushc Experience',
    price: 250,
    currency: '$',
    thumb: './images/2.png',
  },
  {
    id: 6,
    product_name: 'Rayes X30',
    description: 'Hands-free, Hads-on Mushc Experience',
    price: 350,
    currency: '$',
    thumb: './images/3.png',
  },
  {
    id: 7,
    product_name: 'Rayes Alpha',
    description: 'Hands-free, Hads-on Mushc Experience',
    price: 350,
    currency: '$',
    thumb: './images/1.png',
  },
  {
    id: 8,
    product_name: 'Rayes Z30',
    description: 'Hands-free, Hads-on Mushc Experience',
    price: 250,
    currency: '$',
    thumb: './images/2.png',
  },
  {
    id: 9,
    product_name: 'Rayes X30',
    description: 'Hands-free, Hads-on Mushc Experience',
    price: 350,
    currency: '$',
    thumb: './images/3.png',
  },
  axios
    .get(
      'http://rentalelectronics-env.eba-zs7v2ewu.ap-south-1.elasticbeanstalk.com/api/products?populate=category_list'
    )
    .then((response) => {
      // console.log("Your user's password has been reset.", response.data)
    })
    .catch((error) => {
      console.log('An error occurred:', error.response)
    }),
]
export default product_card
