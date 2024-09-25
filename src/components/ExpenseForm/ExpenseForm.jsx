import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem, Button, Grid, Paper, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const categories = ['Food', 'Transport', 'Utilities', 'Entertainment'];

const ExpenseForm = ({ onAddExpense }) => {
    const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      amount: '',
      description: '',
      date: '',
      category: '',
      paymentMethod: ''
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('Amount is required'),
      description: Yup.string().required('Description is required'),
      date: Yup.date().required('Valid date is required'),
      category: Yup.string().required('Category is required'),
      paymentMethod: Yup.string().required('Payment method is required')
    }),
    onSubmit: values => {
      onAddExpense(values);
      formik.resetForm();
      toast.success("Expense Add Successfully");
      navigate("/");
    }
  });

  return (
    <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
        Add New Expense
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Amount"
              name="amount"
              type="number"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
              fullWidth
              variant="outlined"
              margin="normal"
            >
              {categories.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Payment Method"
              name="paymentMethod"
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
              error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}
              helperText={formik.touched.paymentMethod && formik.errors.paymentMethod}
              fullWidth
              variant="outlined"
              margin="normal"
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="credit">Credit</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add Expense
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ExpenseForm;
