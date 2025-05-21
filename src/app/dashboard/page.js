"use client";
import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TableSortLabel,
  TextField,
  InputAdornment,
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  Search, 
  ArrowUpward, 
  ArrowDownward,
  FilterList,
  MenuOpen
} from '@mui/icons-material';
import { 
  LineChart, 
  BarChart, 
  PieChart,
  Line,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@mui/material';

// Sample data
const metrics = [
  { id: 1, name: 'Total Users', value: '1,248', change: '+12%', trend: 'up' },
  { id: 2, name: 'Active Sessions', value: '482', change: '+5%', trend: 'up' },
  { id: 3, name: 'Sales Revenue', value: '$24,760', change: '-3%', trend: 'down' },
  { id: 4, name: 'Conversion Rate', value: '3.2%', change: '+0.5%', trend: 'up' }
];

const salesTrendData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 2780 },
  { month: 'May', revenue: 1890 },
  { month: 'Jun', revenue: 2390 },
  { month: 'Jul', revenue: 3490 }
];

const userGrowthData = [
  { month: 'Jan', newUsers: 240, returningUsers: 180 },
  { month: 'Feb', newUsers: 190, returningUsers: 210 },
  { month: 'Mar', newUsers: 280, returningUsers: 190 },
  { month: 'Apr', newUsers: 320, returningUsers: 220 },
  { month: 'May', newUsers: 290, returningUsers: 250 },
  { month: 'Jun', newUsers: 310, returningUsers: 280 }
];

const categoryData = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 25 },
  { name: 'Home Goods', value: 20 },
  { name: 'Books', value: 15 },
  { name: 'Other', value: 5 }
];

const userData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', lastLogin: '2025-05-20' },
  { id: 2, name: 'Eniola Ajayi', email: 'eniajayi@example.com', status: 'Active', lastLogin: '2025-02-24' },
  { id: 3, name: 'Ovie Aisosa', email: 'aisovie@example.com', status: 'Inactive', lastLogin: '2024-12-28' },
  { id: 4, name: 'Miracle Akor', email: 'miracle@example.com', status: 'Active', lastLogin: '2025-04-30' },
  { id: 5, name: 'Omotola Adrian', email: 'omotola@example.com', status: 'Pending', lastLogin: '2025-01-10' }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Dashboard() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    // Sidebar is retracted by default on mobile screens
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    router.push('/login');
  };

  const filteredUsers = userData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppBar 
        position="fixed"
        className="bg-blue-600 shadow-sm"
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar className="flex justify-between">
          <div className="flex items-center">
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleSidebar}
              className="text-white mr-2"
            >
              <MenuOpen />
            </IconButton>
            <Typography variant="h6" className="font-bold text-white">
              BoardIQ
            </Typography>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:flex items-center mr-4">
              <Avatar className="w-8 h-8 mr-2 bg-white text-blue-600">
                {user?.fullName?.charAt(0) || 'U'}
              </Avatar>
              <Typography variant="subtitle2" className="text-white">
                {user?.fullName || 'User'}
              </Typography>
            </div>
            
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
              className="text-white"
            >
              <Avatar className="w-8 h-8 bg-white text-blue-600 md:hidden">
                {user?.fullName?.charAt(0) || 'U'}
              </Avatar>
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <div className="flex flex-1 pt-16">
        <Sidebar open={sidebarOpen} handleDrawerClose={toggleSidebar} />
        
        <main className={`flex-1 p-4 md:p-6 transition-all duration-300 ${
          sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'
        }`}>
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <Typography variant="h4" className="font-bold text-gray-900">
              Business Overview
            </Typography>
            <TextField
              size="small"
              placeholder="Search users..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="text-gray-500" />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 bg-white rounded-lg"
            />
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric) => (
              <Paper 
                key={metric.id} 
                className="p-4 transition-all hover:shadow-md"
              >
                <Typography 
                  variant="body2" 
                  className="text-gray-600"
                >
                  {metric.name}
                </Typography>
                <div className="flex items-end justify-between mt-2">
                  <Typography 
                    variant="h5" 
                    className="font-bold text-gray-900"
                  >
                    {metric.value}
                  </Typography>
                  <div className={`flex items-center ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.trend === 'up' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                    <Typography variant="body2" className="ml-1">
                      {metric.change}
                    </Typography>
                  </div>
                </div>
              </Paper>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Sales Trend Line Chart */}
            <Paper className="p-4 col-span-1 lg:col-span-2">
              <Typography variant="h6" className="font-semibold mb-4 text-gray-900">
                Sales Trend (Last 6 Months)
              </Typography>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Paper>

            {/* Category Distribution Pie Chart */}
            <Paper className="p-4">
              <Typography variant="h6" className="font-semibold mb-4 text-gray-900">
                Category Distribution
              </Typography>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Paper>
          </div>

          {/* User Growth Bar Chart */}
          <Paper className="p-4 mb-6">
            <Typography variant="h6" className="font-semibold mb-4 text-gray-900">
              User Growth
            </Typography>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="newUsers" fill="#8884d8" name="New Users" />
                  <Bar dataKey="returningUsers" fill="#82ca9d" name="Returning Users" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>

          {/* User Data Table */}
          <Paper className="p-4 overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6" className="font-semibold text-gray-900">
                User Management
              </Typography>
              <IconButton className="text-gray-600">
                <FilterList />
              </IconButton>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow className="bg-gray-50">
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'name'}
                        direction={orderBy === 'name' ? order : 'asc'}
                        onClick={() => handleRequestSort('name')}
                        className="font-semibold text-gray-900"
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell className="font-semibold text-gray-900">Email</TableCell>
                    <TableCell className="font-semibold text-gray-900">Status</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'lastLogin'}
                        direction={orderBy === 'lastLogin' ? order : 'asc'}
                        onClick={() => handleRequestSort('lastLogin')}
                        className="font-semibold text-gray-900"
                      >
                        Last Login
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedUsers.map((user) => (
                    <TableRow key={user.id} hover className="hover:bg-gray-50">
                      <TableCell className="text-gray-900">{user.name}</TableCell>
                      <TableCell className="text-gray-600">{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : user.status === 'Inactive' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-600">{user.lastLogin}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </main>
      </div>
    </div>
  );
}