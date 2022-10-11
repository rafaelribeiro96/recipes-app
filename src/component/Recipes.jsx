import React, { useContext, useEffect } from 'react';
import context from '../contexts/ContextRecipe';
import CardDrink from './CardDrink';
import CardMeal from './CardMeal';
import DrinkCategories from './DrinkCategories';
import MealCategories from './MealCategories';
import fetchDrinks from '../service/fetchDrinks';
import fetchMeals from '../service/fetchMeals';

export default function Recipes() {
  const { title, setDataMeals, setDataDrinks } = useContext(context);
  useEffect(() => {
    async function onLoadFetch() {
      if (title === 'Meals') {
        const data = await fetchMeals('name', '');
        setDataMeals(data.meals);
      }
      if (title === 'Drinks') {
        const data = await fetchDrinks('name', '');
        setDataDrinks(data.drinks);
      }
    }
    onLoadFetch();
  }, []);

  return (
    <div>
      {
        title === 'Meals'
        && (
          <>
            <MealCategories />
            <CardMeal />
          </>)
      }
      {
        title === 'Drinks'
        && (
          <>
            <DrinkCategories />
            <CardDrink />
          </>)
      }
    </div>
  );
}
