import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import { pushInLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '../service/localStorage';
import App from '../App';
import meals from '../../cypress/mocks/meals';
import fetch from '../../cypress/mocks/fetch';

const MEAL_RECIPE = 'Spicy Arrabiata Penne';
const DONE_RECIPE_ROUTE = '/done-recipes';
const MEAL_DATA_TESTID = '0-horizontal-name';
const MEAL_NAME = 'Spicy Arrabiata Penne';
const DRINK_NAME = 'Aquamarine';

const MEAL_DONE_RECIPES = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: MEAL_RECIPE,
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('Testa o componente DoneRecipes', () => {
  test('Testa se ao clicar, ao clicar no botão de filtro "meals", a filtragem é feita corretamente', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));

    pushInLocalStorage('doneRecipes', MEAL_DONE_RECIPES);
    renderWithRouter(<App />, DONE_RECIPE_ROUTE);

    const mealFilterButton = screen.getByTestId('filter-by-meal-btn');
    expect(mealFilterButton).toBeInTheDocument();

    userEvent.click(mealFilterButton);

    const recipeTitle = await screen.findByTestId(MEAL_DATA_TESTID);
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle).toHaveTextContent(MEAL_RECIPE);

    const drinkFilterButton = screen.getByTestId('filter-by-drink-btn');
    expect(drinkFilterButton).toBeInTheDocument();

    userEvent.click(drinkFilterButton);

    const mealRecipeTitleAfter = screen.queryByText(MEAL_NAME);
    const drinkRecipeTitleAfter = screen.queryByText(DRINK_NAME);
    expect(mealRecipeTitleAfter).not.toBeInTheDocument();
    expect(drinkRecipeTitleAfter).toBeInTheDocument();

    const allFilterButton = screen.getByTestId('filter-by-all-btn');
    expect(allFilterButton).toBeInTheDocument();

    userEvent.click(allFilterButton);

    const recipeTitleAfterAll = await screen.findByTestId(MEAL_DATA_TESTID);
    expect(recipeTitleAfterAll).toBeInTheDocument();
    expect(recipeTitle).toHaveTextContent(MEAL_RECIPE);
  });

  test('Testa se ao clicarno botão de compartilhar a mensagem de link copiado aparece', async () => {
    pushInLocalStorage('doneRecipes', MEAL_DONE_RECIPES);

    navigator.clipboard = {
      writeText: jest.fn(),
    };

    renderWithRouter(<App />, DONE_RECIPE_ROUTE);

    const shareButton = await screen.findByTestId('0-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();

    userEvent.click(shareButton);

    const copiedMessageAfterButtonClicked = screen.queryByText(/copied/i);
    expect(copiedMessageAfterButtonClicked).toBeInTheDocument();
  });

  test('Testa se ao clicar no título da receita o usuário é redirecionado para a página de detalhes desta última', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    pushInLocalStorage('doneRecipes', MEAL_DONE_RECIPES);
    const { history } = renderWithRouter(<App />, DONE_RECIPE_ROUTE);

    const recipeTitle = await screen.findByTestId(MEAL_DATA_TESTID);
    expect(recipeTitle).toBeInTheDocument();

    userEvent.click(recipeTitle);
    expect(history.location.pathname).toBe('/meals/52771');
  });

  test('Verifica se, quando a chave "doneRecipes"não existir na montagem da página, esta chave é criada ', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    removeFromLocalStorage('doneRecipes');

    renderWithRouter(<App />, DONE_RECIPE_ROUTE);

    const doneRecipes = getFromLocalStorage('doneRecipes');
    expect(doneRecipes).toEqual([]);
  });
});
