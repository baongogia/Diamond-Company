import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Select, MenuItem, TextField, Button } from '@mui/material';
import { StaffActionContext } from './StaffActionProvider';

export const SaleOrder = () => {
  const { confirmedOrders,setConfirmedOrders, setStaffAction } = useContext(StaffActionContext);
  console.log(confirmedOrders)
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Customer', headerName: 'Customer', width: 130 },
    { field: 'OrderDate', headerName: 'Order Date', width: 130 },
    { field: 'TotalPrice', headerName: 'Total Price', width: 130 },
    { field: 'ShippingDate', headerName: 'Shipping Date', width: 130 },
    { field: 'ReceiveDate', headerName: 'Receive Date', width: 130 },
    { field: 'StaffID', headerName: 'Staff ID', width: 130 },
    { field: 'ShipperID', headerName: 'Shipper ID', width: 130 },
    {
      field: 'Status',
      headerName: 'Status',
      width: 160,
      renderCell: (params) => (
        <Select
          value={params.value || 'Processing'} // Default value is 'Processing'
          onChange={(event) => handleStatusChange(params.id, event.target.value)}
          fullWidth
        >
          <MenuItem value="Processing">Processing</MenuItem>
          <MenuItem value="Accepted">Accepted</MenuItem>
          <MenuItem value="Delivering">Delivering</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
          <MenuItem value="Canceled">Canceled</MenuItem>
        </Select>
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => (
        <div>
          {params.row.Status === 'Processing' && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleConfirmOrder(params.id)}
                style={{ marginRight: '10px' }}
              >
                Confirm
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
          {['Delivering', 'Accepted', 'Canceled', 'Delivered'].includes(params.row.Status) && (
            <>
              <Button
                variant="contained"
                disabled
                style={{ marginRight: '10px' }}
              >
                Confirm
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
      ),
    },
  ];

  // Initialize rows with 'Processing' status
  const initialRows = [
    { id: 1, Customer: 'John Doe', OrderDate: '2023-01-01', TotalPrice: 100, ShippingDate: '2023-01-02', ReceiveDate: '2023-01-05', StaffID: 101, ShipperID: 201, Status: 'Processing' },
    { id: 2, Customer: 'Jane Smith', OrderDate: '2023-01-03', TotalPrice: 200, ShippingDate: '2023-01-04', ReceiveDate: '2023-01-06', StaffID: 102, ShipperID: 202, Status: 'Processing' },
    { id: 3, Customer: 'Sam Johnson', OrderDate: '2023-01-05', TotalPrice: 300, ShippingDate: '2023-01-06', ReceiveDate: '2023-01-08', StaffID: 103, ShipperID: 203, Status: 'Processing' }
  ];

  const [searchDate, setSearchDate] = useState('');
  const [rows, setRows] = useState(initialRows);

  // Load confirmedOrders from localStorage on component mount
  useEffect(() => {
    const storedConfirmedOrders = localStorage.getItem('confirmedOrders');
    if (storedConfirmedOrders) {
      setConfirmedOrders(JSON.parse(storedConfirmedOrders));
    }
  }, []);

  // Save confirmedOrders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('confirmedOrders', JSON.stringify(confirmedOrders));
  }, [confirmedOrders]);
  
  const handleStatusChange = (id, newStatus) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, Status: newStatus } : row
      )
    );
  };

  const handleConfirmOrder = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, Status: 'Accepted' } : row
      )
    );
    setConfirmedOrders((prev) => [...prev, id]);
    setStaffAction('confirm');
  };

  const handleCancelOrder = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, Status: 'Canceled' } : row
      )
    );
    setConfirmedOrders((prev) => prev.filter(orderId => orderId !== id));
    setStaffAction('cancel');
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
