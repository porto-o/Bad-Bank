import React from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import LoadingModal from "./general/loading";
import Welcome from "./Welcome";
import "../styles/signup.css"; // Import a CSS file for additional styling
import { BsGoogle } from "react-icons/bs";
import { BiLogoFacebook } from "react-icons/bi";

const SignUp = () => {
  // global context
  const { signup, user } = useAuth();

  // things for the modal
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setShowModal(true);
      await signup(data);
      setIsLoading(false);
      setShowModal(false);
    } catch (error) {
      setIsLoading(false);
      setModalMessage(error.response.data);
    }
  };

  return (
    <>
      {user ? (
        <Navigate to="/me" />
      ) : (
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="col-md-6 text-center">
            <h2>Welcome to</h2>
            <h1 className="app-title">Bad Bank</h1>
            <Welcome />
          </div>
          <div className="col-md-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="needs-validation"
              noValidate
            >
              <h3 className="mb-4 text-center">
                Sign Up for Your Bank Account
              </h3>
              <div className="mb-3 form-field">
                <label htmlFor="username" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  id="username"
                  {...register("username", {
                    required: true,
                  })}
                />
                {errors.username && (
                  <div className="invalid-feedback">This field is required</div>
                )}
              </div>

              <div className="mb-3 form-field">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  {...register("email", {
                    required: "Email required",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              <div className="mb-3 form-field">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 20,
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    Password must be 8-20 characters
                  </div>
                )}
              </div>

              <div className="mb-3 form-field">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm Password required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-black btn-block col-md-12" // Use "btn-block" class for consistent width
                disabled={!isDirty}
              >
                Create Account
              </button>
            </form>

            <div className="mt-4 text-center">
              Already have an account? &nbsp;
              <Link to="/signin" className="me-2">
                Sign in
              </Link>
            </div>
            <hr />

            <div className="text-center">
              <p>Or create an account using:</p>
               <BsGoogle />
              <button className="btn btn-light">
                <BiLogoFacebook />
              </button>
            </div>
          </div>
        </div>
      )}
      <LoadingModal
        show={showModal}
        loading={isLoading}
        message={modalMessage}
      />
    </>
  );
};

export default SignUp;
