import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AuthService from '@/services/auth';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  googleInitReady?: boolean;
  completeLoginFromToken: (token: string, fallback: { email?: string; name?: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [googleInitReady, setGoogleInitReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // inject Google Identity script
    const scriptId = 'google-identity';
    if (!document.getElementById(scriptId)) {
      const s = document.createElement('script');
      s.id = scriptId;
      s.src = 'https://accounts.google.com/gsi/client';
      s.async = true;
      s.defer = true;
      s.onload = () => setGoogleInitReady(true);
      document.body.appendChild(s);
    } else {
      setGoogleInitReady(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await AuthService.login(email, password);
    const token = data.token as string;
    const userFromToken = decodeJwt(token);
    const nextUser: User = {
      id: userFromToken?.userId ?? 'unknown',
      email,
      name: 'User'
    };
    setUser(nextUser);
    localStorage.setItem('user', JSON.stringify(nextUser));
  };

  const signup = async (email: string, password: string, name: string) => {
    // Register no longer returns a token; OTP verification will complete login
    await AuthService.register(name, email, password);
  };

  const logout = () => {
    setUser(null);
    AuthService.logout();
    localStorage.removeItem('user');
  };

  const completeLoginFromToken = (token: string, fallback: { email?: string; name?: string }) => {
    const decoded = decodeJwt(token);
    const nextUser: User = {
      id: decoded?.userId ?? 'unknown',
      email: decoded?.email ?? fallback.email ?? '',
      name: decoded?.name ?? fallback.name ?? 'User',
    };
    setUser(nextUser);
    localStorage.setItem('user', JSON.stringify(nextUser));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, googleInitReady, completeLoginFromToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function decodeJwt(token: string): any | null {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return decoded;
  } catch (e) {
    return null;
  }
}