// import jwtDecode from 'jwt-decode';
import qs from "qs";
import GenericService from "./GenericService";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:1337/api/";
// axios.defaults.baseURL =
//   'http://erental-env.eba-wphbuc4y.ap-south-1.elasticbeanstalk.com/api/'
const herokuLink = "https://strapi-project-deployement.herokuapp.com/api/";
class UserService extends GenericService {
  loginUser = (ID, Password) =>
    new Promise((resolve, reject) => {
      this.post(`auth/local`, {
        identifier: ID,
        password: Password,
      })
        .then((data) => {
          localStorage.setItem("token", data.jwt);
          this.tokenUpdate();
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log("data of user", JSON.stringify(data.user));
          localStorage.setItem("user_password", JSON.stringify(Password));
          // console.log("password: ",JSON.stringify(Password))
          resolve(data.user);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });

  forgetPassword = (email) =>
    new Promise((resolve, reject) => {
      this.tokenUpdate();
      this.post(`auth/forgot-password`, {
        email,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.log("PLease provide a valid email address");
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
          reject(err);
        });
    });

  recoverPassword = (email) =>
    new Promise((resolve, reject) => {
      this.tokenUpdate();
      this.post(`auth/returnPassword`, {
        data: {
          to: email,
        },
      })
        .then((message) => {
          resolve(message);
        })
        .catch((err) => {
          console.log("PLease provide a valid email address");
          reject(err);
        });
    });

  resetPassword = (code, password) =>
    new Promise((resolve, reject) => {
      this.tokenUpdate();
      this.post(`auth/reset-password`, {
        code,
        password,
        passwordConfirmation: password,
      })
        .then((data) => {
          console.log("confirmation email has been set");
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  logout = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("user");
    console.log("removed");
    this.tokenUpdate();
  };

  getLoggedInUser = () => {
    new Promise((resolve, reject) => {
      const user = localStorage.getItem("user");
      if (user) resolve(JSON.parse(user));
      else {
        localStorage.removeItem("token");
        this.tokenUpdate();
        reject(new Error("Not Logged In"));
      }
    });
  };
  updateProfile = (
    id,
    first_name,
    last_name,
    username,
    email,
    contact_number,
    image,
    password
  ) => {
    this.passwordUpdate(password);
    return this.put(`users/${id}`, {
      first_name,
      last_name,
      username,
      email,
      contact_number,
      image,
      password,
    });
  };
  getUser = (ID) =>
    new Promise((resolve, reject) => {
      this.get(`users/${ID}`, {})
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  getUserDP = (imageID) =>
    new Promise((resolve, reject) => {
      this.get(`upload/files/${imageID}`, {})
        .then((data) => {
          resolve(data.url);
        })
        .catch((err) => {
          reject(err);
        });
    });

  addUser = (
    username,
    email,
    password,
    first_name,
    last_name,
    contact_number,
    type
  ) => {
    this.tokenUpdate();
    return this.post(`auth/local/register`, {
      username,
      email,
      password,
      first_name,
      last_name,
      contact_number,
      type,
    });
  };

  findUserbyName = (name) =>
    new Promise((resolve, reject) => {
      const query = qs.stringify({
        filters: {
          username: {
            $eq: name,
          },
        },
      });
      this.get(`users?${query}`, {})
        .then((response) => {
          if (response.length > 0) return resolve(true);
          resolve(false);
        })
        .catch((err) => {
          reject(err);
        });
    });
  findUserbyEmail = (email) =>
    new Promise((resolve, reject) => {
      const query = qs.stringify({
        filters: {
          email: {
            $eq: email,
          },
        },
      });
      this.get(`users?${query}`, {})
        .then((user) => {
          if (user.length > 0) {
            return resolve(user[0]);
          }

          reject(new Error("User not found"));
        })
        .catch((err) => {
          reject(err);
        });
    });
  getUserAds = (userId) => {};
  userExists = (email) =>
    new Promise((resolve, reject) => {
      const query = qs.stringify({
        filters: {
          email: {
            $eq: email,
          },
        },
      });
      this.get(`users?${query}`, {})
        .then((response) => {
          if (response.length > 0) return resolve(true);
          resolve(false);
        })
        .catch((err) => {
          reject(err);
        });
    });

  lock = (ID) =>
    this.put(`users/${ID}`, {
      blocked: true,
    });

  unlock = (ID) =>
    this.put(`users/${ID}`, {
      blocked: false,
    });

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

export default UserService;
