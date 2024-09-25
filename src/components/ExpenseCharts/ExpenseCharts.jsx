import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseCharts = ({ expenseData, selectedMonth, setSelectedMonth, selectedCategory, setSelectedCategory, expenses }) => {
  
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.toLocaleString('default', { month: 'short' });

    const isMonthMatch = selectedMonth ? expenseMonth === selectedMonth : true;
    const isCategoryMatch = selectedCategory ? expense.category === selectedCategory : true;

    return isMonthMatch && isCategoryMatch;
  });

  const lineChartData = {
    labels: expenseData.months,
    datasets: [
      {
        label: "Total Expenses Per Month",
        data: expenseData.totals?.map((total, index) => {
          if (selectedMonth) {
            return filteredExpenses.filter(expense => new Date(expense.date).getMonth() === index).reduce((sum, expense) => sum + expense.amount, 0);
          }
          return total;
        }),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const categoryData = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categoryData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Expenses",
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Expenses by Category",
      },
    },
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-6">
          <select className="form-select" value={selectedMonth} onChange={handleMonthChange}>
            <option value="">Select Month</option>
            {expenseData.months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Monthly Expenses</h5>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Expenses by Category</h5>
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCharts;
