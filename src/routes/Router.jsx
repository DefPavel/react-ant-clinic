import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import {
  LoginMiddleware,
  SecretMiddleware,
  SecretRolesMiddleware,
} from './middlewares/privates.middleware';
import { Main } from '../pages/Main/Main';
import { User } from '../pages/User';
import { NotFound } from '../pages/NotFound/NotFound';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          exact
          element={
            <LoginMiddleware>
              <Login />
            </LoginMiddleware>
          }
        />
        <Route
          path="/"
          exact
          element={
            <SecretMiddleware>
              <Main />
            </SecretMiddleware>
          }
        />
        <Route
          path="/users"
          exact
          element={
            <SecretRolesMiddleware>
              <User />
            </SecretRolesMiddleware>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
