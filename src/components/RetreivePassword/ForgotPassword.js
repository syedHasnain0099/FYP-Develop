import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import validateInfo1 from "./validatInfo1";
import userService from "../../services/UserService";
function ForgotPassword(callback) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const usernameChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const values = {
      email: enteredEmail,
    };
    var error1 = {};
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    setErrors(validateInfo1(values));
    error1 = validateInfo1(values);
    console.log(error1);
    if (Object.keys(error1).length === 0) {
      console.log("field errors are not present");
      checkEmailExistance(values.email);
    }
  };

  const checkEmailExistance = (email) => {
    userService
      .userExists(email)
      .then((res) => {
        if (res === true) {
          userService
            .findUserbyEmail(email)
            .then((user) => {
              console.log("user type: ", user.type);
              if (user.type === "admin") {
                console.log("admin wants recovery");
                recoverPassword(email);
              } else {
                console.log(
                  "the provided email doesn't corresponds to the admin"
                );
              }
            })
            .catch((err) => console.log(err));
          setError("");
        } else {
          setError("Email doesn't exists");
          setSuccess("");
        }
      })
      .catch((err) => console.log(err));
  };
  const recoverPassword = (email) => {
    console.log("it is working");
    // const resetPasswordToken = crypto.randomBytes(64).toString("hex");
    // console.log("token: ", resetPasswordToken);
    userService
      .recoverPassword(email)
      .then((message) => {
        console.log(message);
        setSuccess("Admin has received an email");
      })
      .catch((err) => {
        setError(`An error occurred: ${err.response}`);
        console.log("An error occurred:", err.response);
      });
  };
  useEffect(() => {
    if (Object.keys(errors) === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);
  const showError = () => (
    <div
      className="forgotpassword-form-error"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    <div
      className="forgotpassword-form-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );
  return (
    <div className="forgot-form-content-right">
      <form className="forgot-form" onSubmit={submitHandler}>
        <h1>Forget your password?</h1>
        <div className="forgot-form-inputs">
          <label className="forgot-form-label">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            className="forgot-form-input"
            placeholder="Enter your Email"
            onChange={usernameChangeHandler}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <button type="submit" className="forgot-form-input-btn">
          Recover Password
        </button>
      </form>
      {showError()}
      {showSuccess()}
    </div>
  );
}

export default ForgotPassword;
