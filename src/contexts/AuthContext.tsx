import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithRegisterNumber: (registerNumber: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: 'teacher-1',
    name: 'Dr. Mahidhar',
    email: 'mahidhar@example.com',
    role: 'teacher',
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'student-1',
    name: 'John Doe',
    registerNumber: 'STLD2025001',
    role: 'student',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'student-2',
    name: 'Jane Smith',
    registerNumber: 'STLD2025002',
    role: 'student',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'student-3',
    name: 'Mike Johnson',
    registerNumber: 'STLD2025003',
    role: 'student',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'student-4',
    name: 'Sarah Williams',
    registerNumber: 'STLD2025004',
    role: 'student',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'student-5',
    name: 'Tom Brown',
    registerNumber: 'STLD2025005',
    role: 'student',
    createdAt: new Date('2024-01-15')
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('stld-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication - replace with actual Supabase auth
    if (email === 'mahidhar@example.com' && password === 'TeacherPass123') {
      const teacher = mockUsers.find(u => u.email === email);
      if (teacher) {
        setUser(teacher);
        localStorage.setItem('stld-user', JSON.stringify(teacher));
        return;
      }
    }
    throw new Error('Invalid credentials');
  };

  const loginWithRegisterNumber = async (registerNumber: string, password: string) => {
    // Mock authentication - replace with actual Supabase auth
    if (password === 'pass123') {
      const student = mockUsers.find(u => u.registerNumber === registerNumber);
      if (student) {
        setUser(student);
        localStorage.setItem('stld-user', JSON.stringify(student));
        return;
      }
    }
    throw new Error('Invalid credentials');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stld-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithRegisterNumber, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};