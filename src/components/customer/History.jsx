import React, { useEffect } from "react";
import "../../styles/history.css";
import { useAuth } from "../../context/auth.context.jsx";

const History = () => {
  const { user, getHistory } = useAuth();

  useEffect(() => {
    async function init() {
      await getHistory(user);
    }
    init();
  }, []);

  return (
    <div className="container all-data">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Hour</th>
          </tr>
        </thead>
        <tbody>
          {user.transactions.map((transaction, index) => (
            <tr key={index}>
              <th>{transaction.type}</th>
              <td>
                {transaction.type === "deposit"
                  ? `+ ${transaction.amount}`
                  : `- ${transaction.amount}`}
              </td>
              <td>
                {
                  // format the date and only get the date
                  transaction.date.split("T")[0]
                }
              </td>
              <td>
                {
                  // get the hour in local time
                  new Date(transaction.date).toLocaleTimeString()
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
