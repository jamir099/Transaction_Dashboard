import React from "react";
import '../style/Statistics.css';  

function Statistics({ statistics }) {
  return (
    <div className="statistics">
      <h2>Statistics</h2>
      <p>Total Sale Amount: ${statistics.totalSaleAmount}</p>
      <p>Total Sold Items: {statistics.totalSoldItems}</p>
      <p>Total Unsold Items: {statistics.totalUnsoldItems}</p>
    </div>
  );
}

export default Statistics;
