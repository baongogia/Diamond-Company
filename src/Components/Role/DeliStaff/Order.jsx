import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Select, MenuItem, TextField, Button } from '@mui/material';
import { StaffActionContext } from '../SaleStaff/StaffActionProvider';

export const Order = () => {
  const { confirmedOrders, setConfirmedOrders } = useContext(StaffActionContext);

  // Function to check if an order is confirmed
  useEffect(() => {
    const storedConfirmedOrders = localStorage.getItem('confirmedOrders');
    if (storedConfirmedOrders) {
      setConfirmedOrders(JSON.parse(storedConfirmedOrders));
    }
  }, []);

  const isOrderConfirmed = (orderId) => confirmedOrders.includes(orderId);

  console.log(confirmedOrders)

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Customer', headerName: 'Customer', width: 130 },
    { field: 'OrderDate', headerName: 'Order Date', width: 130 },
    { field: 'TotalPrice', headerName: 'Total Price', width: 130 },
    { field: 'StaffID', headerName: 'Staff ID', width: 130 },
    {
      field: 'OrderStatus',
      headerName: 'Order Status',
      width: 160,
      renderCell: (params) => (
        <Select
          value={params.value || 'Processing'} // Default value is 'Processing'
          onChange={(event) => handleStatusChange(params.id, event.target.value)}
          fullWidth
        >
          <MenuItem value="Processing">Processing</MenuItem>
          <MenuItem value="Shipping">Shipping</MenuItem>
          <MenuItem value="Shipped">Shipped</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </Select>
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => (
        <div>
          {params.row.OrderStatus === 'Processing' && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleConfirmOrder(params.id)}
                disabled={!isOrderConfirmed(params.id)}
                style={{ marginRight: '10px' }}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={!isOrderConfirmed(params.id)}
                onClick={() => handleCancelOrder(params.id)}
              >
                Cancel
              </Button>
            </>
          )}
          {params.row.OrderStatus === 'Shipping' && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDoneOrder(params.id)}
                style={{ marginRight: '10px' }}
              >
                Done
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleCancelOrder(params.id)}
              >
                Cancel
              </Button>
            </>
          )}
          {['Shipped', 'Cancelled'].includes(params.row.OrderStatus) && (
            <>
              <Button
                variant="contained"
                disabled
                style={{ marginRight: '10px' }}
              >
                Done
              </Button>
              <Button
                variant="contained"
                disabled
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      )
    }
  ];  

  // Set initial rows with 'Processing' status
  const initialRows = [
    { id: 1, Customer: 'John Doe', OrderDate: '2023-01-01', TotalPrice: 100, StaffID: 101, OrderStatus: 'Processing' },
    { id: 2, Customer: 'Jane Smith', OrderDate: '2023-01-03', TotalPrice: 200, StaffID: 102, OrderStatus: 'Processing' },
    { id: 3, Customer: 'Sam Johnson', OrderDate: '2023-01-05', TotalPrice: 300, StaffID: 103, OrderStatus: 'Processing' }
  ];

  const [searchDate, setSearchDate] = useState('');
  const [rows, setRows] = useState(initialRows);
  const { staffAction, setStaffAction } = useContext(StaffActionContext); // Use the context

  const handleStatusChange = (id, newStatus) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, OrderStatus: newStatus } : row
      )
    );
  };

  const handleConfirmOrder = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, OrderStatus: 'Shipping' } : row
      )
    );
  };

  const handleCancelOrder = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, OrderStatus: 'Cancelled' } : row
      )
    );
  };

  const handleDoneOrder = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, OrderStatus: 'Shipped' } : row
      )
    );
  };

  const handleSearchChange = (event) => {
    setSearchDate(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return row.OrderDate.includes(searchDate);
  });

  return (
    <div style={{ height: 500, width: '100%' }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search by Order Date"
          variant="outlined"
          value={searchDate}
          onChange={handleSearchChange}
        />
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};
