import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import {
  START_RECIPE_BTN_TEST_ID, CONTINUE_RECIPE_BTN, RECIPE_PHOTO_TEST_ID,
  DESCRIPTION_MEAL_PATHNAME, DESCRIPTION_DRINK_PATHNAME, IN_PROGRESS_DRINK_PATHNAME,
} from './utils/constantsTest';
import { MOCK_DONE_RECIPE, MOCK_IN_PROGRESS_RECIPE } from './utils/utilsMocks';
import fetch from '../../cypress/mocks/fetch';
import { pushInLocalStorage } from '../service/localStorage';

describe('Testa o componente RecipeDetails.', () => {
  test('Testa se a foto da receita escolhida é renderizada corretamente.', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, DESCRIPTION_MEAL_PATHNAME);

    const recipePhoto = await screen.findByTestId(RECIPE_PHOTO_TEST_ID);
    expect(recipePhoto).toBeInTheDocument();
  });

  test('Testa se o botão "Start Recipe" é renderizado corretamente.', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, DESCRIPTION_DRINK_PATHNAME);

    const startRecipeBtn = await screen.findByTestId(START_RECIPE_BTN_TEST_ID);
    expect(startRecipeBtn).toBeInTheDocument();
    expect(startRecipeBtn).toHaveTextContent('Start Recipe');
  });

  test('Testa se ao clicar no botão "Start Recipe" o usuário é redirecionado para a página de Receita em Progresso.', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    const { history } = renderWithRouter(<App />, DESCRIPTION_DRINK_PATHNAME);

    const startRecipeBtn = screen.getByTestId(START_RECIPE_BTN_TEST_ID);
    userEvent.click(startRecipeBtn);
    expect(history.location.pathname).toBe(IN_PROGRESS_DRINK_PATHNAME);
  });

  test('Testa se o botão "Continue Recipe" é renderizado corretamente.', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    pushInLocalStorage('inProgressRecipes', MOCK_IN_PROGRESS_RECIPE);
    renderWithRouter(<App />, DESCRIPTION_MEAL_PATHNAME);

    const continueRecipeBtn = await screen.findByText(CONTINUE_RECIPE_BTN);
    expect(continueRecipeBtn).toBeInTheDocument();
  });

  test('Testa se o botão "Start Recipe" não é renderizado se a receita já tiver sido finalizada.', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    pushInLocalStorage('doneRecipes', MOCK_DONE_RECIPE);
    renderWithRouter(<App />, DESCRIPTION_DRINK_PATHNAME);

    const recipePhoto = await screen.findByTestId(RECIPE_PHOTO_TEST_ID);
    expect(recipePhoto).toBeInTheDocument();

    const startRecipeBtn = screen.queryByTestId(START_RECIPE_BTN_TEST_ID);
    expect(startRecipeBtn).not.toBeInTheDocument();
  });

  test('Testa se os ingredientes são renderizados corretamente.', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, DESCRIPTION_MEAL_PATHNAME);

    const recipePhoto = await screen.findByTestId(RECIPE_PHOTO_TEST_ID);
    expect(recipePhoto).toBeInTheDocument();

    const ingredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ingredient).toBeInTheDocument();
  });

  test('Testa se as recomendações, na tela de bebida, são renderizadas corretamente.', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, DESCRIPTION_DRINK_PATHNAME);
    const recipePhoto = await screen.findByTestId(RECIPE_PHOTO_TEST_ID);
    expect(recipePhoto).toBeInTheDocument();

    const recommedationCard = await screen.findByTestId('0-recommendation-card');
    expect(recommedationCard).toBeInTheDocument();
  });

  test('Testa se as recomendações, na tela de comida, são renderizadas corretamente.', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, DESCRIPTION_MEAL_PATHNAME);
    const recipePhoto = await screen.findByTestId(RECIPE_PHOTO_TEST_ID);
    expect(recipePhoto).toBeInTheDocument();

    const recommedationCard = await screen.findByTestId('0-recommendation-card');
    expect(recommedationCard).toBeInTheDocument();
  });
});
