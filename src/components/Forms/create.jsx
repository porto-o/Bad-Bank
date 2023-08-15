import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { DataContext } from "../../context/DataContext";
import Success from "./successModal";

import "../../styles/createForm.css"; // Import your custom CSS styles for the form

const CreateForm = () => {
  const [account, setAccount] = useState("Create account");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const { shareData, setShareData } = useContext(DataContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    const highestId = shareData.reduce(
      (maxId, user) => Math.max(maxId, user.id || 0),
      0
    );
    const nextId = highestId + 1;
      console.log(data.photo[0])
    const newUser = {
      id: nextId,
      name: data.name,
      email: data.email,
      balance: 0,
      operations: [],
      photo: data.photo[0],
    };
    setShareData([...shareData, newUser]);
    setShowSuccessPopup(true);
    reset();
    setAccount("Add another account");
  });

  return (
    <div className="container create-form">
      <h1 className="create-account-title">Create Account</h1>
      <p className="create-account-subtitle">
        Please fill in the form to create an account
      </p>
      <form onSubmit={onSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Name"
            {...register("name", {
              required: "Name required",
            })}
          />
          {errors.name && (
            <p className="invalid-feedback">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-3">
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Email"
            {...register("email", {
              required: "Email required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="invalid-feedback">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password"
            {...register("password", {
              required: "Password required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className="invalid-feedback">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-3">
          <input
            type="password"
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm Password required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="invalid-feedback">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="mb-3">
          <input type="file" className="form-control" {...register("photo")} />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className={`form-check-input ${errors.terms ? "is-invalid" : ""}`}
            {...register("terms", {
              required: "You must accept our terms and conditions",
            })}
          />
          <label className="form-check-label">
            Accept our terms and conditions
          </label>
          {errors.terms && (
            <p className="invalid-feedback">{errors.terms.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-custom" disabled={!isDirty}>
          {account}
        </button>
      </form>
      <Success
        show={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        title="Account Created"
        body="Your account has been created"
      />
    </div>
  );
};

export default CreateForm;
