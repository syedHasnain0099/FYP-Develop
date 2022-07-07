import axios from "axios";
// import renameFile from 'src/utils/renameFile';

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "token"
)}`;
axios.defaults.headers["Content-Type"] =
  "application/json; charset=utf-8" || "application/json;";

class GenericService {
  tokenUpdate = () => {
    const token = localStorage.getItem("token");
    if (token != null)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    else delete axios.defaults.headers.common.Authorization;
  };
  passwordUpdate = (Password) => {
    localStorage.setItem("user_password", JSON.stringify(Password));
  };

  get = (url, data) =>
    new Promise((resolve, reject) => {
      // delete axios.defaults.headers.common.Authorization;
      this.tokenUpdate();
      axios
        .get(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  post = (url, data) => {
    this.tokenUpdate();
    return new Promise((resolve, reject) => {
      axios
        .post(url, JSON.stringify(data))
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log("here i am");
          console.warn(err);
          reject(err);
        });
    });
  };
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
