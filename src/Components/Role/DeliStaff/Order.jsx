import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button } from '@mui/material';
import { StaffActionContext } from '../SaleStaff/StaffActionProvider';
import axios from 'axios';

export const Order = () => {
  const { confirmedOrders, setConfirmedOrders } = useContext(StaffActionContext);

  useEffect(() => {
    const storedConfirmedOrders = localStorage.getItem('confirmedOrders');
    if (storedConfirmedOrders) {
      setConfirmedOrders(JSON.parse(storedConfirmedOrders));
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:7292/api/Order/GetOrderInforListForShipper');
        const ordersWithId = response.data.map((order, index) => ({ ...order, id: index + 1 })); // Ensure unique `id`
        setRows(ordersWithId);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const isOrderConfirmed = (orderId) => confirmedOrders.includes(orderId);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'CustomerName', headerName: 'Customer', width: 130 },
    { field: 'OrderDate', headerName: 'Order Date', width: 130 },
    { field: 'ReceiveDate', headerName: 'Receive Date', width: 130 },
    { field: 'CustomerPhone', headerName: 'Phone', width: 130 },
    { field: 'Address', headerName: 'Address', width: 200 },
    { field: 'TotalPrice', headerName: 'Total Price', width: 130 },
    
    {
      field: 'OrderStatus',
      headerName: 'Status',
      width: 160,
      renderCell: (params) => (
        <div>{params.value || 'Pending Delivery'}</div>
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => (
        <div>
          {params.row.OrderStatus === 'Pending Delivery' && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePickupOrder(params.id)}
                style={{ marginRight: '10px' }}
              >
                Pickup
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
          {params.row.OrderStatus === 'Delivering' && (
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
          {['Delivered', 'Canceled'].includes(params.row.OrderStatus) && (
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

  const [searchDate, setSearchDate] = useState('');
  const [rows, setRows] = useState([]);
  const { staffAction, setStaffAction } = useContext(StaffActionContext);

  const handlePickupOrder = async (id) => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    try {
      const response = await axios.post('http://localhost:7292/api/Order/UpdateOrderStatus', {
        orderID: id,
        buttonValue: 'PICKUP',
        username,
        role
      });

      if (response.status === 200) {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, OrderStatus: 'Delivering' } : row
          )
        );
        setConfirmedOrders((prev) => [...prev, id]);
        setStaffAction('pickup');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleCancelOrder = async (id) => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    try {
      const response = await axios.post('http://localhost:7292/api/Order/UpdateOrderStatus', {
        orderID: id,
        buttonValue: 'CANCEL',
        username,
        role
      });

      if (response.status === 200) {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, OrderStatus: 'Canceled' } : row
          )
        );
        setConfirmedOrders((prev) => prev.filter(orderId => orderId !== id));
        setStaffAction('cancel');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleDoneOrder = async (id) => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    try {
      const response = await axios.post('http://localhost:7292/api/Order/UpdateOrderStatus', {
        orderID: id,
        buttonValue: 'DONE',
        username,
        role
      });

      if (response.status === 200) {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, OrderStatus: 'Delivered' } : row
          )
        );
        setStaffAction('done');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
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
