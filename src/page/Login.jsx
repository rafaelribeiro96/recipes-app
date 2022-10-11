import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../contexts/ContextRecipe';
import './Login.css';
import voevo from '../images/logovoevo.png';

export default function Login() {
  const { setTitle } = useContext(context);

  useEffect(() => { setTitle('Login'); });

  const history = useHistory();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [buttonDisable, setButtonDisable] = useState(true);

  const loginValidation = () => {
    const { email, password } = loginInfo;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minCaractereLength = 6;
    const validation = regex.test(email) && password.length >= minCaractereLength;
    setButtonDisable(!validation);
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
    loginValidation();
  };

  const handleClick = () => {
    const { email } = loginInfo;
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('drinksToken', '1');
    history.push('/meals');
  };

  return (
    <div
      className="content-login"
    >
      <form className="form-login">
        <h2>
          <img
            src={ voevo }
            alt="Logo Vô e Vó seu app de receitas caseiras"
            className="logo-app-login"
          />
        </h2>
        <label htmlFor="email-input">
          <input
            name="email"
            data-testid="email-input"
            type="email"
            onChange={ handleChange }
            placeholder="E-mail"
          />
        </label>
        <br />
        <label htmlFor="password">
          <input
            onChange={ handleChange }
            name="password"
            data-testid="password-input"
            type="password"
            placeholder="Password"
          />
        </label>
        <button
          disabled={ buttonDisable }
          data-testid="login-submit-btn"
          type="button"
          onClick={ handleClick }
        >
          Login
        </button>
      </form>
    </div>
  );
}
