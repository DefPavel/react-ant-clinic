import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import { LoginMiddleware } from './middlewares/privates.middleware';
/* import { Home } from '../pages/Home/Home';
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
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
