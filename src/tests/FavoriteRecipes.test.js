import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import { MEAL_NAME, DRINK_NAME, FAVORITE_KEY_LOCAL_STORAGE, FAVORITE_RECIPES_PATHNAME } from './utils/constantsTest';
import { MOCK_FAVORITE_RECIPE_ALL, MOCK_FAVORITE_RECIPE_ALL_AFTER } from './utils/utilsMocks';
import fetch from '../../cypress/mocks/fetch';
import { pushInLocalStorage, getFromLocalStorage } from '../service/localStorage';

describe('Testa o componente FavoriteRecipes.', () => {
  test('Testa se, ao acessar a página de favoritos, a lista de receitas dispõe as receita sem filtros de categoria.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    pushInLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_ALL);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const drinkName = screen.getByText(DRINK_NAME);
    const mealName = screen.getByText(MEAL_NAME);

    expect(drinkName).toBeInTheDocument();
    expect(mealName).toBeInTheDocument();
  });

  test('Testa se, ao clicar no botão "Drinks", apenas as receitas com categoria drink aparecerão.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    pushInLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_ALL);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const drinkButton = screen.getByRole('button', { name: 'Drinks' });
    expect(drinkButton).toBeInTheDocument();

    userEvent.click(drinkButton);

    const drinkName = screen.queryByText(DRINK_NAME);
    const mealName = screen.queryByText(MEAL_NAME);

    expect(drinkName).toBeInTheDocument();
    expect(mealName).not.toBeInTheDocument();
  });

  test('Testa se, ao clicar no botão "Food", apenas as receitas com categoria meal aparecerão.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    pushInLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_ALL);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const mealsButton = screen.getByRole('button', { name: 'Meals' });
    expect(mealsButton).toBeInTheDocument();

    userEvent.click(mealsButton);

    const drinkName = screen.queryByText(DRINK_NAME);
    const mealName = screen.queryByText(MEAL_NAME);

    expect(drinkName).not.toBeInTheDocument();
    expect(mealName).toBeInTheDocument();

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);

    const drinkNameAfter = screen.queryByText(DRINK_NAME);
    const mealNameAfter = screen.queryByText(MEAL_NAME);

    expect(drinkNameAfter).toBeInTheDocument();
    expect(mealNameAfter).toBeInTheDocument();
  });

  test('Testa se, ao clicar no botão de compartilhar, o link é copiado.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();

    const shareMessageBefore = screen.queryByText(/Link copied!/i);

    expect(shareMessageBefore).not.toBeInTheDocument();

    userEvent.click(shareButton);

    const shareMessageAfter = screen.queryByText(/Link copied!/i);

    expect(shareMessageAfter).toBeInTheDocument();
  });

  test('Testa se, ao clicar no botão de favoritos, a receita é removida da lista de favoritos. ', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    pushInLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_ALL);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);
    const favoriteListBefore = getFromLocalStorage(FAVORITE_KEY_LOCAL_STORAGE);
    expect(favoriteListBefore).toEqual(MOCK_FAVORITE_RECIPE_ALL);

    const drinkNameBefore = screen.queryByTestId('0-horizontal-name');
    const mealNameBefore = screen.queryByTestId('1-horizontal-name');

    expect(drinkNameBefore).toBeInTheDocument();
    expect(mealNameBefore).toBeInTheDocument();

    const favoriteButton = screen.getByTestId('1-horizontal-favorite-btn');
    userEvent.click(favoriteButton);

    const favoriteListAfter = getFromLocalStorage(FAVORITE_KEY_LOCAL_STORAGE);

    expect(favoriteListAfter).toEqual(MOCK_FAVORITE_RECIPE_ALL_AFTER);

    const drinkNameAfter = screen.queryByText(DRINK_NAME);
    const mealNameAfter = screen.queryByText(MEAL_NAME);

    expect(drinkNameAfter).toBeInTheDocument();
    expect(mealNameAfter).not.toBeInTheDocument();
  });

  test('Testa se, quando não houver receitas favoritadas, a mensagem "Nenhuma receita favoritada" é renderizada', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    pushInLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, []);

    renderWithRouter(<App />, FAVORITE_RECIPES_PATHNAME);

    const message = await screen.findByText(/Nenhuma receita favoritada/i);

    expect(message).toBeInTheDocument();
  });
});
