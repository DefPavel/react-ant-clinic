import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import { LoginMiddleware, SecretMiddleware } from './middlewares/privates.middleware';
import { Main } from '../pages/Main/Main';
import { User } from '../pages/User';
/* 
import { NotFound } from '../pages/NotFound';
import { Users } from '../pages/Users';
*/

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
        <Route path="/" exact element={<Main />} />
        <Route path="/users" exact element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
