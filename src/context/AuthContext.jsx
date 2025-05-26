import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login
      const mockUser = {
        id: '1',
        email,
        name: 'Demo User',
        savedJobs: [],
        applications: []
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      // In a real app, this would be an API call
      const mockUser = {
        id: '1',
        email,
        name,
        savedJobs: [],
        applications: []
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const saveJob = (jobId) => {
    if (!user) return { success: false, error: 'User not logged in' };

    const updatedUser = {
      ...user,
      savedJobs: [...user.savedJobs, jobId]
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return { success: true };
  };

  const unsaveJob = (jobId) => {
    if (!user) return { success: false, error: 'User not logged in' };

    const updatedUser = {
      ...user,
      savedJobs: user.savedJobs.filter(id => id !== jobId)
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return { success: true };
  };

  const applyForJob = (jobId, applicationData) => {
    if (!user) return { success: false, error: 'User not logged in' };

    const updatedUser = {
      ...user,
      applications: [...user.applications, { jobId, ...applicationData, status: 'pending', appliedAt: new Date().toISOString() }]
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return { success: true };
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    saveJob,
    unsaveJob,
    applyForJob
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 