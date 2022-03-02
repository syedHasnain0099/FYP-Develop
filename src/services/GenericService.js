import axios from 'axios';
// import renameFile from 'src/utils/renameFile';

axios.defaults.baseURL = 'http://rentalelectronics-env.eba-zs7v2ewu.ap-south-1.elasticbeanstalk.com/api/';
// axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8' || 'application/json;';
class GenericService {
  tokenUpdate = () => {
    const token = localStorage.getItem('token');
    if (token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    else
      delete axios.defaults.headers.common.Authorization;
  };

  get = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .get(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  post = (url, data) =>
    new Promise((resolve, reject) => {
      console.log("url in generic: ",url);
      console.log("data in generic: ",JSON.stringify(data));
      if (axios.defaults.headers.common.Authorization) {
        delete axios.defaults.headers.common.Authorization;
      }
      axios
        .post(url, JSON.stringify(data))
        .then((res) => {
          resolve(res.data);
          console.log('Well done!')
          console.log('User profile', res.data)
        // console.log('User token', response.data.jwt)
        })
        .catch((err) => {
          console.log("here i am");
          console.warn(err);
          reject(err);
        });
    });

  delete = (url) =>
    new Promise((resolve, reject) => {
      axios
        .delete(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  put = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .put(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  upload(file, name, onUploadProgress) {
    let formData = new FormData();

    console.log(file);
    const extension = file.name.split(".");
    // formData.append("files", renameFile(file, `${name}.${extension[extension.length - 1]};`));

    return axios.post("upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }
}
export default GenericService;