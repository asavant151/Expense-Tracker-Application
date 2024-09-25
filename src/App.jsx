import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import ExpenseList from './components/ExpenseList/ExpenseList';
import ExpenseCharts from './components/ExpenseCharts/ExpenseCharts';
import Layout from './components/Layout/Layout';
import EditExpenseForm from './components/ExpenseForm/EditExpenseForm';
import { Toaster } from 'react-hot-toast';

function App() {
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem('expenses');
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    paymentMethod: '',
    dateRange: { startDate: '', endDate: '' }
  });
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const addExpense = (expense) => {
    const updatedExpenses = [...expenses, { ...expense, id: expenses.length + 1 }];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  // Edit existing expense
  const editExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp);
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  useEffect(() => {
    let updatedExpenses = [...expenses];

    if (filters.search) {
      updatedExpenses = updatedExpenses.filter(expense =>
        expense.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        expense.amount.toString().toLowerCase().includes(filters.search.toLowerCase()) ||
        expense.date.toLowerCase().includes(filters.search.toLowerCase()) ||
        expense.paymentMethod.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      updatedExpenses = updatedExpenses.filter(expense => expense.category === filters.category);
    }

    if (filters.paymentMethod) {
      updatedExpenses = updatedExpenses.filter(expense => expense.paymentMethod === filters.paymentMethod);
    }

    if (filters.dateRange.startDate && filters.dateRange.endDate) {
      updatedExpenses = updatedExpenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= new Date(filters.dateRange.startDate) &&
          expenseDate <= new Date(filters.dateRange.endDate);
      });
    }

    setFilteredExpenses(updatedExpenses);
  }, [filters, expenses]);

  const expenseData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    totals: [200, 450, 300, 500, 700, 600, 400, 350, 500, 600, 450, 400],
    categories: [400, 350, 250]
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ExpenseList expenses={filteredExpenses} onEditExpense={editExpense} handleFilterChange={handleFilterChange} filters={filters} />} />
            <Route path="/expense/new" element={<ExpenseForm onAddExpense={addExpense} />} />
            <Route path="/expense/edit/:id" element={<EditExpenseForm onEditExpense={editExpense} />} />
            <Route path="/expense-chart" element={
              <ExpenseCharts
                expenseData={expenseData}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                expenses={expenses}
              />
            } />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
