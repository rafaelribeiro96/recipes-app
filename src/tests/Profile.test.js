import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

const email = 'rafael@gmail.com';

describe('verifica se possui o input de e-mail e senha', () => {
  it('Se os elementos aparecem na tela', () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    renderWithRouter(<App />, '/profile');

    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
  });

  it('Funcionamento do botão done recipes', () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    const { history } = renderWithRouter(<App />, '/profile');
    const profileButton = screen.getByTestId('profile-done-btn');
    userEvent.click(profileButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Funcionamento do botão favorite recipes', () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    const { history } = renderWithRouter(<App />, '/profile');
    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteRecipesButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Funcionamento do botão Logout', () => {
    localStorage.clear();
    const { history } = renderWithRouter(<App />, '/profile');
    const logoutButton = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutButton);
    expect(history.location.pathname).toBe('/');
  });
});
