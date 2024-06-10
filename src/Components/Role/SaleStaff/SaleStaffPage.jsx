import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { DataGrid } from '@mui/x-data-grid';
import { Select, MenuItem, TextField } from '@mui/material';

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
        value={params.value || 'PROCESSING'}
        onChange={(event) => handleStatusChange(params.id, event.target.value)}
        fullWidth
      >
        <MenuItem value="PROCESSING">PROCESSING</MenuItem>
        <MenuItem value="ACCEPTED">ACCEPTED</MenuItem>
        <MenuItem value="DELIVERING">DELIVERING</MenuItem>
        <MenuItem value="DELIVERED">DELIVERED</MenuItem>
        <MenuItem value="CANCELED">CANCELED</MenuItem>
      </Select>
    )
  }

  
];



const initialRows = [
  { id: 1, Customer: 'John Doe', OrderDate: '2023-01-01', TotalPrice: 100, ShippingDate: '2023-01-02', ReceiveDate: '2023-01-05', StaffID: 101, ShipperID: 201, ShipStatus: 'Shipped' },
  { id: 2, Customer: 'Jane Smith', OrderDate: '2023-01-03', TotalPrice: 200, ShippingDate: '2023-01-04', ReceiveDate: '2023-01-06', StaffID: 102, ShipperID: 202, ShipStatus: 'Pending' },
  { id: 3, Customer: 'Sam Johnson', OrderDate: '2023-01-05', TotalPrice: 300, ShippingDate: '2023-01-06', ReceiveDate: '2023-01-08', StaffID: 103, ShipperID: 203, ShipStatus: 'Delivered' }
];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SaleStaffPage() {
  const [rows, setRows] = React.useState(initialRows);

  const [searchDate, setSearchDate] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchDate(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return row.OrderDate.includes(searchDate);
  });

  const handleStatusChange = (id, newStatus) => {
    setRows(rows.map(row => (row.id === id ? { ...row, ShipStatus: newStatus } : row)));
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Orders
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
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
      </Box>
    </Box>
  );
}
