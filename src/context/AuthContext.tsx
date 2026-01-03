import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'student' | 'staff' | 'owner') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const demoUsers: Record<string, User> = {
  'student@campus.edu': {
    id: '1',
    email: 'student@campus.edu',
    name: 'Alex Student',
    role: 'student',
    createdAt: new Date(),
  },
  'staff@canteen.edu': {
    id: '2',
    email: 'staff@canteen.edu',
    name: 'Sam Staff',
    role: 'staff',
    createdAt: new Date(),
  },
  'owner@canteen.edu': {
    id: '3',
    email: 'owner@canteen.edu',
    name: 'Omar Owner',
    role: 'owner',
    createdAt: new Date(),
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, role: 'student' | 'staff' | 'owner') => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Demo login - in production, this would validate against backend
    const demoUser = demoUsers[email] || {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      role,
      createdAt: new Date(),
    };
    
    setUser({ ...demoUser, role });
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
