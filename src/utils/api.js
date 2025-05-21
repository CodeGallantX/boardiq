// Mock API functions
export const loginUser = async ({ email, password }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock response
    if (email === 'user@example.com' && password === 'User@123') {
      return {
        user: {
          id: '1',
          email,
          fullName: 'John Samuel'
        },
        token: 'mock-jwt-token'
      };
    } else {
      throw new Error('Invalid email or password');
    }
  };
  
  export const registerUser = async ({ email, password, fullName }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock response
    return {
      user: {
        id: '2',
        email,
        fullName
      },
      token: 'mock-jwt-token'
    };
  };
  
  export const logoutUser = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true };
  };
  
  export const verifyToken = async (token) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return token === 'mock-jwt-token';
  };