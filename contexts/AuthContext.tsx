"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '@/types';
import { authService } from '@/services/auth.service';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  role: Role | null;
  login: (username: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // We would fetch role details here normally
        // For MVP assuming role is populated or fetching it:
        // const roles = await mockAdapter.get('roles')... 
        // For now relying on types/index.ts having Role on User? No, user has role_id.
        // Let's simplified setRole mock
        setRole({ id: parsedUser.role_id, name: 'Admin', description: 'Mocked Role', permissions: [] });
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !user && pathname !== '/login') {
      router.push('/login');
    }
  }, [user, isLoading, pathname, router]);

  const login = async (username: string) => {
    const loggedUser = await authService.login(username, username); // pass=username
    if (loggedUser) {
      setUser(loggedUser);
      localStorage.setItem('auth_user', JSON.stringify(loggedUser));
      setRole({ id: loggedUser.role_id, name: 'Admin', description: 'Mocked Role', permissions: [] }); // Update with real fetch if needed
      router.push('/');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('auth_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
