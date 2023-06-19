import React from 'react';
import Cookies from 'universal-cookie/es6';
import { Navigate } from 'react-router-dom';

export function LoginMiddleware({ children }) {
  const cookies = new Cookies();
  const token = cookies.get('auth-token');
  if (token) return <Navigate to="/" />;
  return children;
}

export function SecretMiddleware({ children }) {
  const cookies = new Cookies();
  const token = cookies.get('auth-token');
  if (token) return children;
  return <Navigate to="/login" />;
}

export function SecretRolesMiddleware({ children }) {
  const cookies = new Cookies();
  const token = cookies.get('auth-token');
  const role = cookies.get('role');
  if (token && role === '1') return children;
  return <Navigate to="/login" />;
}
