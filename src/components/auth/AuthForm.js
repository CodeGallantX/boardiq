"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Box, Paper, CircularProgress, Alert, Fade } from '@mui/material';
import { motion } from 'framer-motion';
import { Email, Lock, Person, Login, HowToReg } from '@mui/icons-material';

export default function AuthForm({ type }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, register, error: authError } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (type === 'register' && !formData.fullName) newErrors.fullName = 'Full name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      if (type === 'login') {
        await login(formData.email, formData.password, formData.rememberMe);
        router.push('/dashboard');
      } else {
        await register(formData.email, formData.password, formData.fullName);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto"
    >
      <Paper 
        elevation={3} 
        className="p-8 rounded-xl bg-white shadow-lg transition-colors duration-300"
      >
        <Box className="flex flex-col items-center mb-6">
          <Box className="p-3 mb-4 rounded-full bg-blue-100">
            {type === 'login' ? (
              <Login className="text-blue-600  text-3xl" />
            ) : (
              <HowToReg className="text-blue-600  text-3xl" />
            )}
          </Box>
          <Typography 
            variant="h4" 
            className="text-center font-bold text-gray-900 "
          >
            {type === 'login' ? 'Welcome Back' : 'Create Account'}
          </Typography>
          <Typography 
            variant="body2" 
            className="text-gray-600  mt-2"
          >
            {type === 'login' ? 'Sign in to continue' : 'Get started with your account'}
          </Typography>
        </Box>

        {authError && (
          <Fade in={!!authError}>
            <Alert severity="error" className="mb-6">
              {authError}
            </Alert>
          </Fade>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          className="space-y-4"
        >
          {type === 'register' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TextField
                fullWidth
                name="fullName"
                label="Full Name"
                variant="outlined"
                value={formData.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
                InputProps={{
                  startAdornment: <Person className="text-gray-500  mr-2" />,
                }}
                
              />
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: type === 'register' ? 0.1 : 0 }}
          >
            <TextField
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: <Email className="text-gray-500  mr-2" />,
              }}
              
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: type === 'register' ? 0.2 : 0.1 }}
          >
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: <Lock className="text-gray-500  mr-2" />,
              }}
              // 
            />
          </motion.div>
          
          {type === 'login' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center justify-between"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    color="primary"
                    className=""
                  />
                }
                label={
                  <span className="text-gray-700 text-sm">
                    Remember me
                  </span>
                }
              />
              <Typography 
                variant="body2" 
                className="text-blue-600 hover:text-blue-500   cursor-pointer"
              >
                Forgot password?
              </Typography>
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: type === 'register' ? 0.3 : 0.2 }}
            className="pt-2"
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              className="h-12 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition-colors"
            >
              {isSubmitting ? (
                <CircularProgress size={24} className="text-white" />
              ) : (
                type === 'login' ? 'Sign In' : 'Register'
              )}
            </Button>
          </motion.div>
        </Box>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="pt-4 mt-6 border-t border-gray-200 "
        >
          <Typography 
            variant="body2" 
            className="text-center text-gray-600 "
          >
            {type === 'login' ? (
              <>
                Don't have an account?{' '}
                <span
                  onClick={() => router.push('/auth/register')}
                  className="text-blue-600 hover:text-blue-500  font-medium cursor-pointer"
                >
                  Register
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span
                  onClick={() => router.push('/auth/login')}
                  className="text-blue-600 hover:text-blue-500 font-medium cursor-pointer"
                >
                  Sign in
                </span>
              </>
            )}
          </Typography>
        </motion.div>
      </Paper>
    </Box>
  );
}