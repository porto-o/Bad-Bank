import React from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import Welcome from "./Welcome";
import { BsGoogle } from "react-icons/bs";
import LoadingModal from "./general/loading";
import "../styles/signup.css"; // Import a CSS file for additional styling

const SignIn = () => {
  // global context
  const { signin, user, googleSignIn } = useAuth();

  // things for the modal
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setShowModal(true);
      await googleSignIn();
      setIsLoading(false);
      setShowModal(false);
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      setModalMessage(error.response.data);
    }
  }

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setShowModal(true);
      await signin(data);
      setIsLoading(false);
      setShowModal(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setModalMessage(error.response.data);
    }
  };

  return (
    <>
      {user && <Navigate to="/me" />}
     
        <div className="signup-container">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="signup-content">
                  <h1>Welcome to</h1>
                  <h1>Bad Bank</h1>
                  <Welcome />
                </div>
              </div>
              <div className="col-md-6">
                <div className="signup-form">
                <form
              onSubmit={handleSubmit(onSubmit)}
              className="needs-validation"
              noValidate
            >
              <h2 className="mb-4 text-center">Login to Bad Bank</h2>

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
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">Password is required</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-black btn-block col-md-12" // Use "btn-block" class for consistent width
                disabled={!isDirty}
              >
                Sign In
              </button>
            </form>

                  <div className="mt-4 text-center">
                    Don't have an account? &nbsp;
                    <Link to="/" className=" me-2">
                      Sign Up
                    </Link>
                  </div>

                  <div className="text-center">
                    <p>Or sign in using:</p>
                    <button className="btn btn-light me-2" onClick={handleGoogleSignIn}>
                      <BsGoogle />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      <LoadingModal
        show={showModal}
        loading={isLoading}
        message={modalMessage}
      />
    </>
  );
};

export default SignIn;
