import React, { useEffect } from "react";
import { set, useForm } from "react-hook-form";
import classNames from "classnames";
import "../../../styles/atm.css";
import { useAuth } from "../../../context/auth.context";


const MoneyOps = ({ type }) => {
  // global context
  const { user, myMoney } = useAuth();
  // console.log(user)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    trigger, // Add the trigger function
  } = useForm();

  const [actualBalance, setActualBalance] = React.useState(
    Number(user.balance)
  );
  const [tempBalance, setTempBalance] = React.useState(Number(user.balance));

  const enteredAmount = watch("amount");

  useEffect(() => {
    if (enteredAmount) {
      trigger("amount");
    }

    if (type === "deposit") {
      // Update tempBalance based on the entered amount for deposit
      const depositAmount = enteredAmount ? parseFloat(enteredAmount) : 0;
      setTempBalance(actualBalance + depositAmount);
    } else if (type === "withdraw") {
      // Update tempBalance based on the entered amount for withdrawal
      const withdrawAmount = enteredAmount ? parseFloat(enteredAmount) : 0;
      setTempBalance(actualBalance - withdrawAmount);
    }
  }, [enteredAmount]);

  const onSubmit = async (data) => {
    console.log(data)
    const res = await myMoney(type, data.amount, user);
    console.log(user)
    setActualBalance(res.data.balance);
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className={classNames("atm-machine", {
          "screen-deposit": type === "deposit",
          "screen-withdraw": type === "withdraw",
        })}
      >
        <div className="screen">
          <h2 className="display-4">ATM Cash Machine</h2>
          <p className="balance">Current balance: ${actualBalance}</p>
          <p className="balance">
            Balance after operation:
            <span className="text-success"> ${tempBalance}</span>
          </p>
        </div>
        <form noValidate className="text-center" onSubmit = {handleSubmit(onSubmit)}>
          <div className="input-group mb-3">
            <input
              type="number"
              className={`form-control ${errors.amount ? "is-invalid" : ""}`}
              id="amount"
              name="amount"
              placeholder="Enter Amount"
              {...register("amount", {
                required: "Please enter an amount",
                min: { value: 0, message: "Please enter a positive number" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a number",
                },
                validate: (value) => {
                  if (type === "withdraw" && value > actualBalance) {
                    return "You cannot withdraw more than your balance";
                  }
                  return true;
                },
              })}
            />
            {errors.amount && (
              <div className="invalid-feedback">{errors.amount.message}</div>
            )}
          </div>
          <button type="submit" className="btn btn-custom" disabled={!isDirty}>
            {type === "deposit" ? "Deposit" : "Withdraw"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MoneyOps;
