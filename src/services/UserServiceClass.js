// import jwtDecode from 'jwt-decode';
import qs from 'qs'
import GenericService from './GenericService'
import axios from 'axios'

class UserService extends GenericService {
  // eslint-disable-next-line no-useless-constructor
  // constructor() {
  //   super();
  // }

  loginUser = (ID, Password) =>
    new Promise((resolve, reject) => {
      console.log('this:', this)
      console.log('id: ', ID)

      this.post(`${axios.defaults.baseURL}auth/local`, {
        identifier: ID,
        password: Password,
      })
        .then((data) => {
          localStorage.setItem('token', JSON.stringify(data.jwt))
          this.tokenUpdate()
          resolve(data.user)
        })
        .catch((err) => {
          reject(err)
        })
    })

  forgetPassword = (email) =>
    new Promise((resolve, reject) => {
      this.tokenUpdate()
      this.post(`${axios.defaults.baseURL}auth/forgot-password`, {
        email,
      })
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })

  resetPassword = (code, password) =>
    new Promise((resolve, reject) => {
      this.tokenUpdate()
      this.post(`${axios.defaults.baseURL}auth/reset-password`, {
        code,
        password,
        passwordConfirmation: password,
      })
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  register = (username, email, password) =>
    this.post(`${axios.defaults.baseURL}users/register`, {
      password,
      email,
      username,
    })

  logout = async () => {
    await localStorage.removeItem('token')
    //this.tokenUpdate();
  }

  isLoggedInToken = () =>
    typeof localStorage.getItem('token') === 'undefined' ||
    localStorage.getItem('token') === null

  isLoggedIn = () =>
    new Promise((resolve, reject) => {
      if (this.isLoggedInToken()) {
        this.tokenUpdate(null)
        reject(new Error('Not Logged In'))
        return false
      }
      resolve()
      return true
    })

  getLoggedInUser = () =>
    new Promise((resolve, reject) => {
      const user = localStorage.getItem('user')
      if (user) resolve(JSON.parse(user))
      else {
        localStorage.removeItem('token')
        this.tokenUpdate()
        reject(new Error('Not Logged In'))
      }
    })

  getUser = (ID) =>
    new Promise((resolve, reject) => {
      this.get(`users/${ID}`, {})
        .then((user) => {
          resolve(user)
        })
        .catch((err) => {
          reject(err)
        })
    })

  findUser = (ID) =>
    new Promise((resolve, reject) => {
      const query = qs.stringify({
        filters: {
          username: {
            $eq: ID,
          },
        },
      })
      this.get(`users?${query}`, {})
        .then((user) => {
          console.log(user)
          if (user.length > 0) {
            return resolve(user[0])
          }

          reject(new Error('User not found'))
        })
        .catch((err) => {
          reject(err)
        })
    })

  addUser = (username, email, password) =>
    this.post(`${axios.defaults.baseURL}auth/local/register`, {
      username,
      email,
      password,
    })

  userDoesNotExist = (ID) =>
    new Promise((resolve, reject) => {
      const query = qs.stringify({
        filters: {
          username: {
            $eq: ID,
          },
        },
      })
      this.get(`users?${query}`, {})
        .then((response) => {
          console.log(response, query)
          if (response.length > 0) return reject(new Error('Already taken'))
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })

  extractData(attributes) {
    const { contact, user: user_object, image: img } = attributes
    let phone, address, city, province
    if (contact) {
      let city_object
      ;({ phone, address, city: city_object } = contact)
      const { data: city_data } = city_object
      const { attributes: city_attributes } = city_data
      ;({ name: city, province } = city_attributes)
    }

    let u_id, username, name, email, blocked, dob, gender

    if (user_object) {
      const { data: u_data } = user_object
      if (u_data) {
        const { id: u_idd, attributes: u_attributes } = u_data
        ;({ username, name, email, blocked, dob, gender } = u_attributes)
        u_id = u_idd
      }
    }

    let image = undefined
    let imageID
    if (img) {
      const { data: img_data } = img
      if (img_data) {
        image = img_data.attributes.url
        imageID = img_data.id
      }
    }

    const user = {
      u_id,
      username,
      name,
      email,
      blocked,
      phone,
      image,
      imageID,
      gender,
      address,
      city,
      province,
      dob,
    }
    return user
  }

  lock = (ID) =>
    this.put(`users/${ID}`, {
      blocked: true,
    })

  unlock = (ID) =>
    this.put(`users/${ID}`, {
      blocked: false,
    })
}

export default UserService
