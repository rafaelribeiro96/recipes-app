import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

const drinksButtonID = 'drinks-btn';
const mealsButtonID = 'meals-btn';

describe('O componente footer deve ', () => {
  it('ser encontrado na rota /meals', () => {
    const { history } = renderWithRouter(<App />, '/meals');
    const drinksButton = screen.getByTestId(drinksButtonID);
    expect(drinksButton).toBeInTheDocument();
    userEvent.click(drinksButton);
    expect(history.location.pathname).toBe('/drinks');
    const mealsButton = screen.getByTestId(mealsButtonID);
    expect(mealsButton).toBeInTheDocument();
    userEvent.click(mealsButton);
    expect(history.location.pathname).toBe('/meals');
  });
});
