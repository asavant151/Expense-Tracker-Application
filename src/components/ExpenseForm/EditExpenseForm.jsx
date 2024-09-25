import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const EditExpenseForm = ({ onEditExpense }) => {
  const location = useLocation();
  const expense = location.state?.expense;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    category: "",
    paymentMethod: "",
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        amount: expense.amount,
        description: expense.description,
        date: expense.date,
        category: expense.category,
        paymentMethod: expense.paymentMethod,
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditExpense({ ...formData, id: expense.id });
    toast.success("Expense Update Successfully");
    navigate("/");
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <Card.Title className="text-center mb-4">Edit Expense</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="amount" className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  placeholder="Enter amount"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="date" className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter description"
            />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group controlId="category" className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  placeholder="Enter category"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="paymentMethod" className="mb-3">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  type="text"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                  placeholder="Enter payment method"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className="w-100">
            Save Changes
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default EditExpenseForm;
