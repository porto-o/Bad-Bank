import React, { useContext, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { DataContext } from "../../context/DataContext";
import Success from "./successModal";

import "../../styles/atm.css";

const MoneyOpsForm = ({ action }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    trigger, // Add the trigger function
  } = useForm();

  const { activeUser, shareData, setShareData } = useContext(DataContext);
  const storedBalance = parseFloat(activeUser.balance);
  const [tempBalance, setTempBalance] = useState(storedBalance);
  const [balance, setBalance] = useState(storedBalance);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const enteredAmount = watch("amount");

  useEffect(() => {
    if (enteredAmount) {
      trigger("amount"); // Trigger validation for the "amount" field while typing
    }

    const parsedAmount = parseFloat(enteredAmount);

    if (isNaN(parsedAmount)) {
      setTempBalance(storedBalance);
      return;
    }

    if (action === "withdraw" && parsedAmount > storedBalance) {
      setTempBalance(storedBalance);
      return;
    } else if (action === "deposit" && parsedAmount < 0) {
      setTempBalance(storedBalance);
      return;
    }

    const newTempBalance =
      action === "deposit"
        ? storedBalance + parsedAmount
        : storedBalance - parsedAmount;

    setTempBalance(newTempBalance);
  }, [enteredAmount, trigger, action, storedBalance]);
  const onSubmit = handleSubmit((data) => {
    const amount = parseFloat(data.amount);
    const newBalance =
      action === "deposit" ? balance + amount : balance - amount;

    activeUser.balance = newBalance;
    const index = shareData.findIndex((user) => user.id === activeUser.id);
    shareData[index] = activeUser;
    setShareData([...shareData]);

    activeUser.operations.push({
      id: activeUser.operations.length + 1,
      type: action,
      amount: amount,
    });
    shareData[index] = activeUser;
    setShareData([...shareData]);
    setBalance(newBalance);
    setShowSuccessPopup(true);
  });

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="atm-machine">
        <div className="screen">
          <h2 className="display-4">ATM Cash Machine</h2>
          <p className="balance">Current balance: ${balance}</p>
          <p className="balance">
            Balance after operation: ${tempBalance.toFixed(2)}
          </p>
        </div>
        <form onSubmit={onSubmit} noValidate className="text-center">
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
                  if (action === "withdraw" && value > balance) {
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
            {action === "deposit" ? "Deposit" : "Withdraw"}
          </button>
        </form>
      </div>
      <Success
        show={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        title={action === "deposit" ? "Deposit" : "Withdraw"}
        body={
          action === "deposit"
            ? `You deposited $${watch("amount")}`
            : `You withdrew $${watch("amount")}`
        }
      />
    </div>
  );
};

export default MoneyOpsForm;
