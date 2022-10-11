import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

const emailTestID = 'email-input';
const passWordTestID = 'password-input';
const testEmail = 'email@email.com';
const testPassword = '1234567';
const loginButton = 'login-submit-btn';

describe('Verifica se a página Login', () => {
  it('tem os inputs de e-mail e senha', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestID);
    const passwordInput = screen.getByTestId(passWordTestID);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('habilita o botão pra logar ao cumprir a condição', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestID);
    const passwordInput = screen.getByTestId(passWordTestID);
    const button = screen.getByTestId(loginButton);

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, testPassword);
    expect(button).toBeEnabled();
  });

  it('te redireciona para a página Meals', () => {
    const { history } = renderWithRouter(<App />, {}, '/meals');
    const emailInput = screen.getByTestId(emailTestID);
    const passwordInput = screen.getByTestId(passWordTestID);
    const button = screen.getByTestId(loginButton);

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, testPassword);
    expect(button).toBeEnabled();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals');
  });

  it('deve ter o mesmo valor do input que foi digitado pelo usuário', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestID);
    userEvent.type(emailInput, testEmail);
    expect(emailInput.value).toBe(testEmail);

    const passwordInput = screen.getByTestId(passWordTestID);
    userEvent.type(passwordInput, testPassword);
    expect(passwordInput.value).toBe(testPassword);
  });

  it('desabilita o botão se retirar o texto do input', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestID);
    const passwordInput = screen.getByTestId(passWordTestID);
    const button = screen.getByTestId(loginButton);

    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, testPassword);
    expect(button).toBeEnabled();
    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);
    expect(button).toBeDisabled();
  });
});
