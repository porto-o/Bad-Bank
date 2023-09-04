import React, { useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { useAuth } from "../../../context/auth.context";
import { useNavigate } from "react-router-dom";
import "../../../styles/atm.css";
import LoadingModal from "../../general/loading";
import Success from "../../general/Success";

const Transfer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    trigger,
  } = useForm();

  const { user, transfer } = useAuth();

  const [isLoading, setIsLoading] = React.useState(false);
  const [tempBalance, setTempBalance] = React.useState(Number(user.balance));
  const [actualBalance, setActualBalance] = React.useState(
    Number(user.balance)
  );
  const [showModal, setShowModal] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const enteredAmount = watch("amount");

  useEffect(() => {
    if (enteredAmount) {
      trigger("amount");
    }

    setTempBalance(actualBalance - enteredAmount);
  }, [enteredAmount]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setShowModal(true);
      const response = await transfer(data.amount, user, data.email);
      setIsLoading(false);
      setShowModal(false);
      setShowModal(false);
      setShowSuccess(true);
      setSuccessMessage(response.data.message);
      setTimeout(() => {
        setShowSuccess(false);
        setSuccessMessage("");
      }, 1000);
      // update the actual balance
      setActualBalance(res.data.balance);
      // navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);
      setShowModal(false);
      setShowSuccess(true);
      setSuccessMessage(error.response.data.message);
      setTimeout(() => {
        setShowSuccess(false);
        setSuccessMessage("");
      }, 2000);
      console.log(error);
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="atm-machine">
          <div className="screen">
            <h2 className="display-4">Transfer money</h2>
            <p className="balance">Current balance: ${actualBalance}</p>
            <p className="balance">
              Balance after operation:
              <span className="text-success"> ${tempBalance}</span>
            </p>
          </div>
          <form
            noValidate
            className="text-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group">
              <input
                type="number"
                className={`form-control ${errors.amount ? "is-invalid" : ""}`}
                id="amount"
                name="amount"
                placeholder="Enter Amount"
                {...register("amount", {
                  required: "Please enter an amount",
                  min: {
                    value: 0,
                    message: "Please enter a positive number",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please enter a number",
                  },
                  // it must be     less than the actual balance
                  validate: (value) => {
                    if (value > actualBalance) {
                      return "You cannot transfer more than your balance";
                    }
                    return true;
                  },
                })}
              />
              <div className="invalid-feedback">
                {errors.amount && errors.amount.message}
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                placeholder="Enter destination email"
                {...register("email", {
                  required: "Please enter an email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email",
                  },
                })}
              />
              <div className="invalid-feedback">
                {errors.email && errors.email.message}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-custom"
              disabled={!isDirty}
            >
              Transfer
            </button>
          </form>
        </div>
      </div>
      <LoadingModal show={showModal} loading={isLoading} />
      <Success show={showSuccess} message={successMessage} />
    </>
  );
};

export default Transfer;
