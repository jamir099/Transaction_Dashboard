import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import './style/App.css';


function App() {
  const [month, setMonth] = useState("03"); // Default to March
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  

  // Fetch data when the month, page, or search changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch transactions
        const transactionsResponse = await axios.get(
          `http://localhost:5000/api/transactions`, 
          { params: { month, page, perPage, search } }
        );
        setTransactions(transactionsResponse.data);

        // Fetch statistics
        const statisticsResponse = await axios.get(
          `http://localhost:5000/api/statistics`, 
          { params: { month } }
        );
        setStatistics(statisticsResponse.data);

        // Fetch bar chart data
        const barChartResponse = await axios.get(
          `http://localhost:5000/api/bar-chart`, 
          { params: { month } }
        );
        setBarChartData(barChartResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [month, page, perPage, search]);  // Dependencies

  // Handle month change
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="App">
      <h1>Transaction Dashboard</h1>
      
      {/* Month Dropdown */}
      <select value={month} onChange={handleMonthChange} id="month-select" name="month">
        {["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map((m, index) => (
          <option key={index} value={m}>
            {new Date(0, index).toLocaleString("en", { month: "long" })}
          </option>
        ))}
      </select>

      {/* Components */}
      <TransactionsTable
        transactions={transactions}
        search={search}
        setSearch={setSearch}
        page={page}
        setPage={setPage}
      />
      <Statistics statistics={statistics} />
      <BarChart data={barChartData} />
    </div>
  );
}

export default App;
