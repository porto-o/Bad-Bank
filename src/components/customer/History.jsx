import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

  const [filter, setFilter] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Sort transactions by date in descending order (most recent first)
  const sortedTransactions = [...user.transactions].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // Filter transactions based on the selected option and date range
  const filteredTransactions = sortedTransactions
    .filter((transaction) => {
      if (filter === "all") return true;
      return transaction.type === filter;
    })
    .filter((transaction) => {
      if (!startDate || !endDate) return true;
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });

  // Calculate the total number of pages based on the itemsPerPage
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the transactions for the current page
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when changing filters
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div
      className="container all-data"
      style={{
        marginTop: "75px"
      }}
    >
      <h1 className="display-4 fw-bold">
        Hello, <span className="text-success">{user.username}</span>!
      </h1>
      <p className="lead">Here is your transaction history with Bad Bank:</p>
      <div className="filter">
        <label>Filter by transaction type:</label>
        <select
          className="form-control"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="deposit">Deposits</option>
          <option value="withdrawal">Withdrawals</option>
          <option value="transfer">Transfers</option>
          {/* Add more filter options as needed */}
        </select>
      </div>
      <hr />
      <p className="lead">
        Showing {currentTransactions.length} of {filteredTransactions.length}{" "}
      </p>
      <hr />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Hour</th>
            {
              // for transfers only remitte
              filter === "transfer" && <th scope="col">Remitte</th>
            }
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction, index) => (
            <tr key={index}>
              <th className="black-text">{transaction.type}</th>
              <td className="black-text">
                {transaction.type === "deposit"
                  ? `+ $${transaction.amount}`
                  : `- $${transaction.amount}`}
              </td>
              <td className="black-text">
                {
                  // format the date and only get the date
                  transaction.date.split("T")[0]
                }
              </td>
              <td className="black-text">
                {
                  // get the hour in local time
                  new Date(transaction.date).toLocaleTimeString()
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                index + 1 === currentPage ? "active" : ""
              }`}
            >
              <button
                className="btn btn-custom" // Set text color to black
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default History;
