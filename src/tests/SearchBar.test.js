import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import oneDrink from '../../cypress/mocks/oneDrink';
import drink from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import emptyDrinks from '../../cypress/mocks/emptyDrinks';

const inputSearch = 'search-input';
const buttonSearch = 'show-search-input';
const nameType = 'name-search-radio';
const execSearch = 'exec-search-btn';

describe('testa o componente Searchbar', () => {
  it('Testa se ao pesquisar uma nome que retorna apenas uma receita, é redirecionando para a tela de detalhes', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    renderWithRouter(<App />, '/meals');
    expect(global.fetch).toHaveBeenCalled();
    userEvent.click(screen.getByTestId(buttonSearch));
    expect(screen.getByTestId(inputSearch)).toBeInTheDocument();
    userEvent.type(screen.getByTestId(inputSearch), 'Arrabiata');
    userEvent.click(screen.getByTestId(nameType));
    userEvent.click(await screen.findByTestId(execSearch));
    const arrabiata = screen.getByRole('heading', {
      name: /spicy arrabiata penne/i,
    });
    expect(arrabiata).toBeInTheDocument();
  });
  it('Testa se ao pesquisar uma nome que retorna apenas uma bebida, é redirecionando para a tela de detalhes', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    renderWithRouter(<App />, '/drinks');
    expect(global.fetch).toHaveBeenCalled();
    userEvent.click(screen.getByTestId(buttonSearch));
    expect(screen.getByTestId(inputSearch)).toBeInTheDocument();
    userEvent.type(screen.getByTestId(inputSearch), 'Aquamarine');
    userEvent.click(screen.getByTestId(nameType));
    userEvent.click(await screen.findByTestId(execSearch));
    const oneDrinkReturn = screen.getByRole('heading', {
      name: /aquamarine/i,
    });
    expect(oneDrinkReturn).toBeInTheDocument();
  });
  it('Testa se ao pesquisar uma bebida invalida, um alerta é exibido na tela', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(drink)
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValue(emptyDrinks),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    renderWithRouter(<App />, '/drinks');
    userEvent.click(screen.getByTestId(buttonSearch));
    expect(screen.getByTestId(inputSearch)).toBeInTheDocument();
    userEvent.type(screen.getByTestId(inputSearch), 'Xablau');
    userEvent.click(screen.getByTestId(nameType));
    fireEvent.click(screen.getByTestId(execSearch));
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });
  it('Testa se ao pesquisar uma comida invalida, um alerta é exibido na tela', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValue(emptyMeals),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    renderWithRouter(<App />, '/meals');
    userEvent.click(screen.getByTestId(buttonSearch));
    expect(screen.getByTestId(inputSearch)).toBeInTheDocument();
    userEvent.type(screen.getByTestId(inputSearch), 'Xablau');
    userEvent.click(screen.getByTestId(nameType));
    fireEvent.click(screen.getByTestId(execSearch));
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });
  it('Testa se ao inserir mais de um caractere na busca pela primeira letra, um alerta é exibido na tela', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(mealCategories),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    renderWithRouter(<App />, '/meals');
    userEvent.click(screen.getByTestId(buttonSearch));
    expect(screen.getByTestId(inputSearch)).toBeInTheDocument();
    userEvent.type(screen.getByTestId(inputSearch), 'Xa');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    fireEvent.click(screen.getByTestId(execSearch));
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });
});
