import React from "react";
import { useAuth } from "../../context/auth.context";

const Home = () => {
  // get the name of the user from context
  const { user } = useAuth();

  // Check if there are transactions before displaying the last one
  const lastTransaction =
    user.transactions.length > 0
      ? user.transactions[user.transactions.length - 1]
      : null;

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card bg-transparent border-0">
        <div className="card-body text-center">
          <h1 className="card-title display-4 fw-bold">
            Welcome to Bad Bank,
            <span className="text-success"> {user.username}</span>!
          </h1>
          <h4 className="">
            Your current balance is: {""}
            <span className="text-success">${user.balance}</span>
          </h4>
          {lastTransaction && (
            <h5 className="card-text">
              Your last operation was a{" "}
              <span className="text-success">{lastTransaction.type}</span> of{" "}
              <span className="text-success">${lastTransaction.amount}</span>
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
