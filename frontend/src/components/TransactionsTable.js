import React from "react";
import '../style/TransactionsTable.css';  

function TransactionsTable({ transactions, search, setSearch, page, setPage }) {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  return (
    <div>
      <h2>Transactions</h2>
      
      {/* Search Box */}
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search transactions"
        id="search-input" 
        name="search"
      />

      {/* Transactions Table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
        <span>Page: {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
}

export default TransactionsTable;
