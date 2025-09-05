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

// Generate students for 24PA1A0462–24PA1A0499, 24PA1A04A0–04A9, 24PA1A04B0–04B9, 24PA1A04C0–04C1
const generateStudents = (): User[] => {
  const students: User[] = [];

  const pushStudent = (reg: string, idx: number) => {
    students.push({
      id: `student-${reg}`,
      name: reg,
      registerNumber: reg,
      role: 'student',
      createdAt: new Date('2024-01-15')
    });
  };

  // 24PA1A0462 .. 24PA1A0499
  for (let i = 62; i <= 99; i++) {
    const suffix = i.toString().padStart(2, '0');
    pushStudent(`24PA1A04${suffix}`, i);
  }
  // 24PA1A04A0 .. 24PA1A04A9
  for (let i = 0; i <= 9; i++) pushStudent(`24PA1A04A${i}`, 100 + i);
  // 24PA1A04B0 .. 24PA1A04B9
  for (let i = 0; i <= 9; i++) pushStudent(`24PA1A04B${i}`, 110 + i);
  // 24PA1A04C0 .. 24PA1A04C1
  for (let i = 0; i <= 1; i++) pushStudent(`24PA1A04C${i}`, 120 + i);

  return students;
};

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: 'teacher-1',
    name: 'Dr.S.Sugumaran',
    email: 'Sugumaran.s@vishnu.edu',
    role: 'teacher',
    createdAt: new Date('2024-01-01')
  },
  ...generateStudents()
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
    if (email.toLowerCase() === 'sugumaran.s@vishnu.edu' && password === 'stld') {
      const teacher = mockUsers.find(u => u.email?.toLowerCase() === email.toLowerCase());
      if (teacher) {
        setUser(teacher);
        localStorage.setItem('stld-user', JSON.stringify(teacher));
        return;
      }
    }
    throw new Error('Invalid credentials');
  };

  const loginWithRegisterNumber = async (registerNumber: string, password: string) => {
    // Accept any valid register from the list, password = last 4 characters of register (case-insensitive)
    const reg = registerNumber.toUpperCase();
    const student = mockUsers.find(u => u.registerNumber?.toUpperCase() === reg);
    if (student) {
      const expected = reg.slice(-4).toUpperCase();
      if (password.toUpperCase() === expected) {
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
