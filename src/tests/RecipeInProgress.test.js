import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import RenderWithRouter from './utils/renderWithRouter';
import {
  DESCRIPTION_MEAL_PATHNAME, DESCRIPTION_DRINK_PATHNAME,
  SHARE_BTN_TEST_ID, FAVORITE_BTN_TEST_ID, FAVORITE_KEY_LOCAL_STORAGE,
} from './utils/constantsTest';
import {
  MOCK_FAVORITE_RECIPE_MEAL_BEFORE, MOCK_FAVORITE_RECIPE_MEAL_AFTER,
  MOCK_IN_PROGRESS_RECIPE, MOCK_IN_PROGRESS_RECIPE_AFTER,
} from './utils/utilsMocks';
import { pushInLocalStorage, getFromLocalStorage } from '../service/localStorage';
import fetch from '../../cypress/mocks/fetch';

const INITIAL_ENTRIES = '/meals/52771/in-progress';
const FAV_BTN = 'favorite-btn';

describe('Testa o componente RecipeInProgress', () => {
  test('Verifica se o Titulo e a Categoria da Receita aparace na tela', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    RenderWithRouter(<App />, INITIAL_ENTRIES);

    expect(await screen.findByRole('heading', { level: 2, name: /Vegetarian/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { level: 1, name: /Spicy Arrabiata Penne/i })).toBeInTheDocument();
  });

  test('Verifica se a lista de ingredientes da Receita aparace na tela', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    RenderWithRouter(<App />, INITIAL_ENTRIES);

    expect(screen.getByText(/ingredients list/i)).toBeInTheDocument();
    expect(await screen.findAllByRole('checkbox')).toHaveLength(8);
  });

  test('Verifica se as instruções da Receita aparacem na tela', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    RenderWithRouter(<App />, INITIAL_ENTRIES);

    expect(screen.getByText(/instructions/i)).toBeInTheDocument();
    expect(await screen.findByText(/Bring a large pot of water to a boil. Add kosher salt to the boiling water,/i)).toBeInTheDocument();
  });

  test('Verifica se todos botoẽs de curtir e compartilhar aparacem na tela', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    RenderWithRouter(<App />, INITIAL_ENTRIES);

    expect(await screen.findByTestId('share-btn')).toBeInTheDocument();
    expect(await screen.findByTestId(FAV_BTN)).toBeInTheDocument();
  });

  // test('Verifica se o botão "Finishi Recipe" aparace na tela e desabilitado', async () => {
  //   jest.spyOn(global, 'fetch').mockImplementation(fetch);
  //   pushInLocalStorage('inProgressRecipes', MOCK_IN_PROGRESS_RECIPE);
  //   RenderWithRouter(<App />, INITIAL_ENTRIES);

  //   const recipePhoto = await screen.findByTestId('recipe-photo');
  //   expect(recipePhoto).toBeInTheDocument();

  //   const finishRecipeBtn = await screen.findByTestId('finish-recipe-btn');

  //   expect(finishRecipeBtn).toBeInTheDocument();

  //   expect(finishRecipeBtn).toBeDisabled();
  // });

  test('Verifica se clicar no botão de compartilhar a url é copiado para o clipboard e aparece a mensagem "Link Copied"', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    RenderWithRouter(<App />, DESCRIPTION_DRINK_PATHNAME);

    const shareButton = await screen.findByTestId(SHARE_BTN_TEST_ID);
    expect(shareButton).toBeInTheDocument();
    userEvent.click(shareButton);

    const shareMessage = screen.getByText(/Link copied!/i);
    expect(shareMessage).toBeInTheDocument();
  });

  test('Verifica se clicar no botão de favoritar a receita é favoritada', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    pushInLocalStorage(FAVORITE_KEY_LOCAL_STORAGE, MOCK_FAVORITE_RECIPE_MEAL_BEFORE);

    RenderWithRouter(<App />, DESCRIPTION_MEAL_PATHNAME);
    const favoriteListBefore = getFromLocalStorage(FAVORITE_KEY_LOCAL_STORAGE);

    expect(favoriteListBefore).not.toBe(null);

    const blackHeartButton = screen.getByTestId(FAVORITE_BTN_TEST_ID);
    userEvent.click(blackHeartButton);

    const favoriteListAfter = getFromLocalStorage(FAVORITE_KEY_LOCAL_STORAGE);

    expect(favoriteListAfter).toEqual(MOCK_FAVORITE_RECIPE_MEAL_AFTER);
  });

  test('Testa se ao marcar um ingrediete como feito, o progresso é salvo no local storage', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    pushInLocalStorage('inProgressRecipes', MOCK_IN_PROGRESS_RECIPE);

    RenderWithRouter(<App />, INITIAL_ENTRIES);

    const firstIngredient = await screen.findByTestId('0-ingredient-step');
    userEvent.click(firstIngredient);

    const inProgressRecipes = getFromLocalStorage('inProgressRecipes');
    expect(inProgressRecipes).toEqual(MOCK_IN_PROGRESS_RECIPE_AFTER);

    userEvent.click(firstIngredient);

    const inProgressRecipesAfter = getFromLocalStorage('inProgressRecipes');
    expect(inProgressRecipesAfter).toEqual(MOCK_IN_PROGRESS_RECIPE);
  });

  test('Testa se ao marcar todos os ingredientes como feitos e ao clicar no botão de finalizar o usuário é redirecionado para a tela de receitas prontas.', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    pushInLocalStorage('inProgressRecipes', MOCK_IN_PROGRESS_RECIPE);

    const { history } = RenderWithRouter(<App />, INITIAL_ENTRIES);

    const firstIngredient = await screen.findByTestId('0-ingredient-step');
    const secondIngredient = await screen.findByTestId('1-ingredient-step');
    const thirdIngredient = await screen.findByTestId('2-ingredient-step');
    const fourthIngredient = await screen.findByTestId('3-ingredient-step');
    const fifthIngredient = await screen.findByTestId('4-ingredient-step');
    const sixthIngredient = await screen.findByTestId('5-ingredient-step');
    const seventhIngredient = await screen.findByTestId('6-ingredient-step');
    const eighthIngredient = await screen.findByTestId('7-ingredient-step');

    const finishRecipeBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishRecipeBtn).toBeDisabled();

    userEvent.click(firstIngredient);
    userEvent.click(secondIngredient);
    userEvent.click(thirdIngredient);
    userEvent.click(fourthIngredient);
    userEvent.click(fifthIngredient);
    userEvent.click(sixthIngredient);
    userEvent.click(seventhIngredient);
    userEvent.click(eighthIngredient);

    expect(finishRecipeBtn).not.toBeDisabled();

    userEvent.click(finishRecipeBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
});
