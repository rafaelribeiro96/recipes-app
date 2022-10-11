import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import meals from '../../cypress/mocks/meals';

const searchInput = 'search-input';

describe('O componente header deve ', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
  });
  it('ser encontrado na rota /meals', () => {
    renderWithRouter(<App />, '/meals');
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });
  it('Testa se ao clicar no icone da pequisa, o input de texto aparece e desaparece', () => {
    renderWithRouter(<App />, '/meals');
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);
    expect(searchButton).toBeInTheDocument();
    expect(screen.getByTestId(searchInput)).toBeInTheDocument();
    userEvent.click(searchButton);
    expect(screen.queryByTestId(searchInput)).not.toBeInTheDocument();
  });
  it('Testa se ao clicar no icone da pequisa, o input de texto aparece e desaparece', async () => {
    renderWithRouter(<App />, '/meals');
    expect(global.fetch).toHaveBeenCalled();
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);
    userEvent.type(screen.getByTestId(searchInput), 'pancake');
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.click(screen.getByTestId('exec-search-btn'));
    const pancakes = await screen.findByText(/pancakes/i);
    expect(pancakes).toBeInTheDocument();
  });
  it('Testa se ao clicar no icone de perfil é redirecionado para a pagina \'profile\'', () => {
    const { history } = renderWithRouter(<App />, '/meals');
    act(() => {
      const profileButton = screen.queryByTestId('go-to-profile');
      expect(history.location.pathname).toBe('/meals');
      userEvent.click(profileButton);
      expect(history.location.pathname).toBe('/profile');
    });
  });
});
