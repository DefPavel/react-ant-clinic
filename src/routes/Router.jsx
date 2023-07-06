import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import { LoginMiddleware } from '../middlewares/privates.middleware';
import { NotFound } from '../pages/NotFound/NotFound';
import { Main } from '../pages/Main';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginMiddleware>
              <Login />
            </LoginMiddleware>
          }
        />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
