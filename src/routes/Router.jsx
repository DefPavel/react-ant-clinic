import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import {
  LoginMiddleware,
  SecretMiddleware,
  SecretRolesMiddleware,
} from './middlewares/privates.middleware';
import { Main } from '../pages/Main/Main';
import { BaseLayout } from '../components/BaseLayout';
import { User } from '../pages/User';
import { NotFound } from '../pages/NotFound/NotFound';

function Router() {
  const MainPage = (
    <SecretMiddleware>
      <BaseLayout titleName="Расписание">
        <Main />
      </BaseLayout>
    </SecretMiddleware>
  );

  const UsersPage = (
    <SecretRolesMiddleware>
      <BaseLayout titleName="Пользователи">
        <User />
      </BaseLayout>
    </SecretRolesMiddleware>
  );

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
        <Route path="/" element={MainPage} />
        <Route path="/users" element={UsersPage} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
