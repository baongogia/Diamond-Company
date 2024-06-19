import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Switch, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AppsIcon from '@mui/icons-material/Apps';
import CodeIcon from '@mui/icons-material/Code';
import PaletteIcon from '@mui/icons-material/Palette';
import AssignmentIcon from '@mui/icons-material/Assignment';

const ManagerPage = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        backgroundColor: '#3f51b5',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px 10px',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ mr: 2 }}>
            <AssignmentIcon />
          </Box>
          <Typography variant="h6" component="div">
            My-Task
          </Typography>
        </Box>
        <List>
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Tickets" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Our Clients" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Payroll" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <AppsIcon />
            </ListItemIcon>
            <ListItemText primary="App" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <CodeIcon />
            </ListItemIcon>
            <ListItemText primary="Other Pages" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <PaletteIcon />
            </ListItemIcon>
            <ListItemText primary="UI Components" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default ManagerPage;
