# Transaction_Dashboard
MERN Stack Coding Challenge
This is a MERN (MongoDB, Express, React, Node.js) stack project built as part of a coding challenge. The application allows users to manage and display transactions, generate statistics, and visualize data with bar and pie charts. The backend connects to a MongoDB database to fetch, insert, and analyze transaction data.

Project Overview
This project is a full-stack web application built using the MERN stack. The backend seeds transaction data from an external API, and users can fetch and visualize this data in various ways, including listing transactions by month, generating sales statistics, and creating bar and pie charts to display categorized data.

Technologies Used
Frontend: React, Axios
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
API: Axios for external API calls

Functionality
1. Seed the Database
Fetches transaction data from an external API and populates the MongoDB database.
2. View Transactions
Users can view transactions filtered by month, with optional pagination and search functionality.
Pagination allows users to navigate through large sets of data.
3. Generate Statistics
Displays total sales, number of sold and unsold items for a selected month.
4. Visualize Data with Bar Chart
Generates a bar chart that shows the number of transactions in different price ranges.
5. Visualize Data with Pie Chart
Displays a pie chart based on unique product categories and the number of transactions in each category.
6. Combined Data API
Fetches all the above statistics in a single API call for better performance.

Setup and Installation
Prerequisites
Node.js and npm installed
MongoDB running locally or using a cloud provider like MongoDB Atlas
Backend Setup
Clone the repository and navigate to the /backend folder:
code
git clone https://github.com/your-repo/mern-challenge.git
cd backend

Install dependencies:
code
npm install

Create a .env file for environment variables:

code
MONGO_URI=your-mongodb-uri
PORT=5000

Run the backend server:
code
npm start


Frontend Setup
Navigate to the /frontend folder:

code
cd ../frontend

Install dependencies:
code
npm install

Start the React app:
code
npm start

