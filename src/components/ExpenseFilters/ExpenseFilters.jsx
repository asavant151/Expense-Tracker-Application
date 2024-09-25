import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

const ExpenseFilters = ({ filters, onChange }) => {
  return (
    <div className="container my-3">
      <div className="row align-items-center">
        <div className="col-md-6 mb-3">
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            name="search"
            onChange={(e) => onChange('search', e.target.value)}
            InputProps={{
              className: 'bg-light',
            }}
          />
        </div>
        <div className="col-md-6 mb-3">
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category || ''}
              onChange={(e) => onChange('category', e.target.value)}
              label="Category"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Transport">Transport</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Utilities">Utilities</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default ExpenseFilters;
