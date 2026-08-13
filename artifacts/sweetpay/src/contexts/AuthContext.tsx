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
      login: (identifier: string, password: string) => boolean;
      register: (email: string, username: string, password: string, fullName: string) => boolean;
      logout: () => void;
      updateCardName: (name: string) => void;
      }

      const AuthContext = createContext<AuthContextType | null>(null);

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
    password: 'mayzen50',
    fullName: 'Mayzen',
    cardName: 'Mayzen',
    isActive: false,
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

      const login = (identifier: string, password: string): boolean => {
        const found = getUsers().find(
          u => (u.email === identifier || u.username === identifier) && u.password === password
        );
        if (!found) return false;
        setUser(found);
        localStorage.setItem(SESSION_KEY, found.email);
        return true;
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
      