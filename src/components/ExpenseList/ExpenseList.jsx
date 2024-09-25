import React, { useState } from 'react';
import { Table, Button, Pagination, Container, Row, Col } from 'react-bootstrap';
import ExpenseFilters from '../ExpenseFilters/ExpenseFilters';
import { useNavigate } from 'react-router-dom';

const ExpenseList = ({ expenses, onEditExpense, handleFilterChange, filters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const handleEdit = (id) => {
    const editedExpense = expenses.find(expense => expense.id === id);
    navigate(`/expense/edit/${id}`, { state: { expense: editedExpense } });
    onEditExpense(editedExpense);
  };

  const paginatedExpenses = expenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className='mt-4'>
      <ExpenseFilters filters={filters} onChange={handleFilterChange} />
      <Row>
        <Col>
          <Table striped bordered hover responsive className='mt-4'>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Description</th>
                <th>Date</th>
                <th>Category</th>
                <th>Payment Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedExpenses.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.amount}</td>
                  <td>{expense.description}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>{expense.category}</td>
                  <td>{expense.paymentMethod}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(expense.id)}>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center'>
          <Pagination>
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
            <Pagination.Item>{currentPage}</Pagination.Item>
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={paginatedExpenses.length < itemsPerPage} />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseList;
