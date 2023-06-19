import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { signIn } from '../../store/actions/auth.action';
import { authReducer } from '../../store/reducers/auth.reducer';
import './Login.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, handleUsernameChange] = useState('');
  const [password, handlePasswordChange] = useState('');
  const [loading, handleLoading] = useState(false);
  const { success: isSuccessAuth, error, isLoading } = useSelector((store) => store.authReducer);
  const { clearAuth, clearError } = authReducer.actions;

  useEffect(() => {
    if (isSuccessAuth) navigate('/');

    return () => dispatch(clearAuth());
  }, [isSuccessAuth]);

  useEffect(() => {
    if (error) {
      dispatch(clearError());
      handleLoading(false);
    }
  }, [username, password]);

  useEffect(() => {
    if (isLoading) handleLoading(true);
  }, [isLoading]);

  const handleSubmit = () => {
    if (username && password) dispatch(signIn({ username, password }));
  };

  return (
    <div className="wrapper">
      <LoginForm
        error={error}
        handlePasswordChange={handlePasswordChange}
        handleUsernameChange={handleUsernameChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export { Login };
