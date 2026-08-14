import React, { createContext, useContext, useState, useEffect } from 'react';

      export interface User {
      email: string;
      username: string;
      password: string;
      fullName: string;
      cardName: string;
      isActive: boolean;
      createdAt: string;
      }

      interface AuthContextType {
      user: User | null;
      login: (identifier: string, password: string) => User | null;
      register: (email: string, username: string, password: string, fullName: string) => boolean;
      logout: () => void;
      updateCardName: (name: string) => void;
      }

      const AuthContext = createContext<AuthContextType | null>(null);

      export const YASSIN_EMAIL = 'yassin808@gmail.com';

      const STORAGE_KEY = 'sweetpay_users';
      const SESSION_KEY = 'sweetpay_session';

      const SEED_USERS: User[] = [
      {
        email: 'sofyanamin@gmail.com',
        username: 'payme',
        password: 'sofyan123',
        fullName: 'Payme',
        cardName: 'Payme',
        isActive: false,
        createdAt: '2024-01-01T00:00:00.000Z',
      },
      {
        email: 'chalabrune@gmail.com',
        username: 'chalabrune',
        password: 'chalabrune',
        fullName: 'Chalabrune',
        cardName: 'Chalabrune',
        isActive: false,
        createdAt: '2024-01-01T00:00:00.000Z',
      },
  {
    email: 'Mayzen123@gmail.com',
    username: 'mayzen',
    password: '123456',
    fullName: 'Mayzen',
    cardName: 'Mayzen',
    isActive: false,
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    email: 'hichem123@gmail.com',
    username: 'hichem',
    password: '123456',
    fullName: 'hichem',
    cardName: 'hichem',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    email: 'hocin123@gmail.com',
    username: 'hocin123',
    password: '123456',
    fullName: 'hocin123',
    cardName: 'hocin123',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    email: 'yassin808@gmail.com',
    username: 'yassin808',
    password: '123456',
    fullName: 'Yassin',
    cardName: 'Yassin',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
  }
      ];

      function getUsers(): User[] {
      try {
        const stored: User[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const merged = [...stored];
        for (const seed of SEED_USERS) {
          if (!merged.find(u => u.email === seed.email)) {
            merged.push(seed);
          }
        }
        return merged;
      } catch { return SEED_USERS; }
      }

      function saveUsers(users: User[]) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      }

      export function AuthProvider({ children }: { children: React.ReactNode }) {
      const [user, setUser] = useState<User | null>(null);

      useEffect(() => {
        const email = localStorage.getItem(SESSION_KEY);
        if (email) {
          const found = getUsers().find(u => u.email === email);
          if (found) setUser(found);
        }
      }, []);

      const login = (identifier: string, password: string): User | null => {
        const found = getUsers().find(
          u => (u.email === identifier || u.username === identifier) && u.password === password
        );
        if (!found) return null;
        setUser(found);
        if (found.email !== YASSIN_EMAIL) {
          localStorage.setItem(SESSION_KEY, found.email);
        }
        if (found.username === 'hichem') {
          const key = `sweetpay_hichem_wait_${found.email}`;
          if (!localStorage.getItem(key)) {
            localStorage.setItem(key, String(Date.now()));
          }
        }
        return found;
      };

      const register = (email: string, username: string, password: string, fullName: string): boolean => {
        const users = getUsers();
        if (users.find(u => u.email === email || u.username === username)) return false;
        const newUser: User = {
          email, username, password, fullName,
          cardName: fullName,
          isActive: false,
          createdAt: new Date().toISOString(),
        };
        saveUsers([...users, newUser]);
        setUser(newUser);
        localStorage.setItem(SESSION_KEY, email);
        return true;
      };

      const logout = () => {
        setUser(null);
        localStorage.removeItem(SESSION_KEY);
      };

      const updateCardName = (name: string) => {
        if (!user) return;
        const users = getUsers().map(u => u.email === user.email ? { ...u, cardName: name } : u);
        saveUsers(users);
        const updated = { ...user, cardName: name };
        setUser(updated);
      };

      return (
        <AuthContext.Provider value={{ user, login, register, logout, updateCardName }}>
          {children}
        </AuthContext.Provider>
      );
      }

      export function useAuth() {
      const ctx = useContext(AuthContext);
      if (!ctx) throw new Error('useAuth must be used within AuthProvider');
      return ctx;
      }
      