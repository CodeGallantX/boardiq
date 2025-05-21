"use client";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Avatar,
  Typography
} from '@mui/material';
import {
  ChevronLeft,
  Dashboard as DashboardIcon,
  People,
  ShoppingCart,
  BarChart as BarChartIcon,
  Settings,
  Logout
} from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon className="text-gray-700" /> },
  { text: 'Users', icon: <People className="text-gray-700" /> },
  { text: 'Products', icon: <ShoppingCart className="text-gray-700" /> },
  { text: 'Reports', icon: <BarChartIcon className="text-gray-700" /> },
  { text: 'Settings', icon: <Settings className="text-gray-700" /> },
];

export default function Sidebar({ open, handleDrawerClose }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <div 
      className={`fixed h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-20 ${
        open ? 'w-64' : 'w-0 overflow-hidden'
      }`}
    >
      <div className="flex items-center justify-between p-4 h-16 border-b">
        <div className="flex items-center">
          <Avatar className="w-8 h-8 mr-2 bg-blue-500">
            {user?.fullName?.charAt(0) || 'U'}
          </Avatar>
          {open && (
            <Typography variant="subtitle1" className="font-medium">
              {user?.fullName || 'User'}
            </Typography>
          )}
        </div>
        <IconButton 
          onClick={handleDrawerClose}
          className="text-gray-500 hover:bg-gray-100"
        >
          <ChevronLeft />
        </IconButton>
      </div>
      
      <Divider className="border-gray-200" />
      
      <List className="p-2">
        {menuItems.map((item) => (
          <ListItem 
            key={item.text} 
            disablePadding
            className="hover:bg-gray-100 rounded-lg"
          >
            <ListItemButton className="px-3 py-2">
              <ListItemIcon className="min-w-0 mr-3">
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                className={`transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider className="border-gray-200" />

      {/* Logout Button */}
      <List className="p-2 absolute bottom-0 w-full">
        <ListItem disablePadding className="hover:bg-gray-100 rounded-lg">
          <ListItemButton 
            className="px-3 py-2"
            onClick={handleLogout}
          >
            <ListItemIcon className="min-w-0 mr-3">
              <Logout className="text-gray-700" />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              className={`transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}