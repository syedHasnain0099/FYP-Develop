import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import "./ForgotPassword.css";
function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className="forgot-form-container">
        {!isSubmitted ? (
          <ForgotPassword submitForm={submitForm} />
        ) : (
          <ForgotPassword />
        )}
      </div>
    </>
  );
}

export default ForgotPasswordForm;
