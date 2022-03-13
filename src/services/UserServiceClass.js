// import jwtDecode from 'jwt-decode';
import qs from 'qs'
import GenericService from './GenericService'
import axios from 'axios'
axios.defaults.baseURL = 'http://renttoday14-env.eba-csx4ziu6.ap-south-1.elasticbeanstalk.com/api/';
const herokuLink = 'https://strapi-project-deployement.herokuapp.com/api/'
class UserService extends GenericService {

  loginUser = (ID, Password) =>
    new Promise((resolve, reject) => {
      this.post(`auth/local`, {
        identifier: ID,
        password: Password,
      })
        .then((data) => {
          localStorage.setItem('token', data.jwt)
          this.tokenUpdate()
          localStorage.setItem('user', JSON.stringify(data.user))
          console.log(JSON.stringify(data.user))
          resolve(data.user)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })

  forgetPassword = (email) =>
    new Promise((resolve, reject) => {
      this.tokenUpdate()
      this.post(`auth/forgot-password`, {
        email,
      })
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          console.log("PLease provide a valid email address")
          // this.findUser()
          // .then((res)=> {
          //   console.log()
          // })
    //          if (!user) {
    //   console.log('This email does not exist');
    // }

    // // User blocked
    // if (user.blocked) {
    //   console.log('This user is disabled');
    // }
          reject(err)
        })
    })

  resetPassword = (code, password) =>
    new Promise((resolve, reject) => {
      this.tokenUpdate()
      this.post(`auth/reset-password`, {
        code,
        password,
        passwordConfirmation: password,
      })
        .then((data) => {
          console.log("confirmation email has been set")
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })

  logout = async () => {
    await localStorage.removeItem('token')
    await localStorage.removeItem('user')
    console.log('removed')
    this.tokenUpdate();
  }

  getLoggedInUser = () => {
    new Promise((resolve, reject) => {
      const user = localStorage.getItem('user')
      if (user) resolve(JSON.parse(user))
      else {
        localStorage.removeItem('token')
        this.tokenUpdate()
        reject(new Error('Not Logged In'))
      }
    })
  }

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

    addUser = (username, email, password, type) => {
      this.tokenUpdate();
    return this.post(`auth/local/register`, {
      username,
      email,
      password,
      type,
    })
  }
  
  findUserbyName = (name) =>
    new Promise((resolve, reject) => {
      const query = qs.stringify({
        filters: {
          username: {
            $eq: name,
          },
        },
      })
      this.get(`users?${query}`, {})
        .then((user) => {
          if (user.length > 0) {
            return resolve(user[0])
          }
          reject(new Error('User not found'))
        })
        .catch((err) => {
          reject(err)
        })
    })
      findUserbyEmail = (email) =>
    new Promise((resolve, reject) => {
      const query = qs.stringify({
        filters: {
          email: {
            $eq: email,
          },
        },
      })
      this.get(`users?${query}`, {})
        .then((user) => {
          if (user.length > 0) {
            return resolve(user[0])
          }

          reject(new Error('User not found'))
        })
        .catch((err) => {
          reject(err)
        })
    })

  userExists = (email) =>
  new Promise((resolve, reject) => {
    const query = qs.stringify({
      filters: {
          email: {
            $eq: email
          }
        },
      })
      this.get(`users?${query}`, {})
        .then((response) => {
          console.log(response)
          if (response.length > 0) return resolve(true)
          // reject(new Error('Already taken'))
          resolve(false)
          // reject(new Error('user does not exists'))
        })
        .catch((err) => {
          reject(err)
        })
    })
  
  lock = (ID) =>
    this.put(`users/${ID}`, {
      blocked: true,
    })

  unlock = (ID) =>
    this.put(`users/${ID}`, {
      blocked: false,
    })
  
  // isLoggedInToken = () =>
  //   typeof localStorage.getItem('token') === 'undefined' ||
  //   localStorage.getItem('token') === null

  // isLoggedIn = () =>
  //   new Promise((resolve, reject) => {
  //     if (this.isLoggedInToken()) {
  //       this.tokenUpdate(null)
  //       reject(new Error('Not Logged In'))
  //       return false
  //     }
  //     resolve()
  //     return true
  //   })
}

export default UserService
