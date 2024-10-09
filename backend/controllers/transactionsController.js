const axios = require('axios');
const Transaction = require('../models/Transaction');

// Fetch data from the external API and seed the database
const seedDatabase = async (req, res) => {
  try {
    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.deleteMany();  // Clear existing data
    await Transaction.insertMany(data);  // Insert new data
    res.status(200).json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({ message: 'Failed to seed database', error: error.message });
  }
};

// List transactions with pagination and search functionality by month
const getTransactions = async (req, res) => {
  try {
    
    const date1 = new Date(req.body);
    const transaction = await Transaction.findOne({ dateOfSale: date1 });
   
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found for the given date' });
    }

    // Extract the year and month from the dateOfSale field
    const year = transaction.dateOfSale.getFullYear();
    const month = transaction.dateOfSale.getMonth() + 1; 

    // Log and respond with the transaction details, year, and month
    console.log(transaction, year, month);
    
    res.status(200).json({ 
      message: 'Transaction fetched successfully', 
      transaction, 
      year, 
      month 
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions', error });
  }
}
// Get statistics for a selected month
const getStatistics = async (req, res) => {
  try {
    const month = !isNaN(parseInt(req.query.month)) ? parseInt(req.query.month) : 3;
    const monthQuery = month == 0 ? {} : {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, month]
      }
    };

    const projectQuery = { _id: 0, price: 1, sold: 1, dateOfSale: 1 };
    const transactions = await Transaction.find(monthQuery, projectQuery);

    const response = transactions.reduce((acc, curr) => {
      const currPrice = parseFloat(curr.price);
      acc.totalSale += curr.sold ? currPrice : 0;
      acc.soldCount += curr.sold ? 1 : 0;
      acc.unsoldCount += curr.sold ? 0 : 1;
      return acc;
    }, { totalSale: 0, soldCount: 0, unsoldCount: 0 });

    response.totalSale = response.totalSale.toFixed(2);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: 'Failed to fetch statistics', error: error.message });
  }
};

// Generate bar chart data based on price ranges
const getBarChartData = async (req, res) => {
  try {
    const month = !isNaN(parseInt(req.query.month)) ? parseInt(req.query.month) : 3;
    const monthQuery = month == 0 ? {} : {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, month]
      }
    };

    const transactions = await Transaction.find(monthQuery, { _id: 0, price: 1 });

    const priceRanges = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const barChartData = priceRanges.map((min, index) => {
      const max = priceRanges[index + 1] || Infinity;
      const count = transactions.filter(t => t.price >= min && t.price < max).length;
      return { range: `${min}-${max}`, count };
    });

    res.status(200).json(barChartData);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).json({ message: 'Failed to fetch bar chart data', error: error.message });
  }
};

// Generate pie chart data for unique categories
const getPieChartData = async (req, res) => {
  try {
    const month = !isNaN(parseInt(req.query.month)) ? parseInt(req.query.month) : 3;
    const monthQuery = month == 0 ? {} : {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, month]
      }
    };

    const transactions = await Transaction.find(monthQuery, { _id: 0, category: 1 });

    const categories = {};
    transactions.forEach(transaction => {
      categories[transaction.category] = (categories[transaction.category] || 0) + 1;
    });

    const pieChartData = Object.entries(categories).map(([category, count]) => ({
      category,
      count,
    }));

    res.status(200).json(pieChartData);
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    res.status(500).json({ message: 'Failed to fetch pie chart data', error: error.message });
  }
};

// Combined API that fetches data from all APIs and returns a combined response
const getCombinedData = async (req, res) => {
  try {
    const baseURL = req.protocol + '://' + req.get('host');
    const [stats, barChart, pieChart] = await Promise.all([
      axios.get(`${baseURL}/statistics?month=${req.query.month}`),
      axios.get(`${baseURL}/bar-chart?month=${req.query.month}`),
      axios.get(`${baseURL}/pie-chart?month=${req.query.month}`)
    ]);

    const combinedData = {
      statsData: stats.data,
      barChartData: barChart.data,
      pieChartData: pieChart.data
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).json({ message: 'Failed to fetch combined data', error: error.message });
  }
};



module.exports = {
  seedDatabase,
  getTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
  getCombinedData
 
};
