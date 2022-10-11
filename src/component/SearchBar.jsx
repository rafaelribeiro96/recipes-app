import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../contexts/ContextRecipe';
import fetchMeals from '../service/fetchMeals';
import fetchDrinks from '../service/fetchDrinks';

export default function SearchBar() {
  const history = useHistory();
  const { searchType, setDataDrinks,
    setSearchType, searchItem, title, setDataMeals } = useContext(context);

  useEffect(() => {}, []);

  const onClickSearchType = ({ target }) => {
    const { value } = target;
    setSearchType(value);
  };

  const checkIfOneRecipe = (array, id) => {
    if (array.length === 1) {
      history.push(`${title.toLowerCase()}/${id}`);
    }
  };

  const mealsHandle = async () => {
    const dataMealsTwo = await fetchMeals(searchType, searchItem);
    if (dataMealsTwo.meals === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    checkIfOneRecipe(dataMealsTwo.meals, dataMealsTwo.meals[0].idMeal);
    setDataMeals(dataMealsTwo.meals);
  };

  const drinkHandle = async () => {
    const dataDrinkTwo = await fetchDrinks(searchType, searchItem);
    if (dataDrinkTwo.drinks === null) {
      console.log('fui chamado');
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    checkIfOneRecipe(dataDrinkTwo.drinks, dataDrinkTwo.drinks[0].idDrink);
    setDataDrinks(dataDrinkTwo.drinks);
  };

  const searchRecipe = () => {
    console.log('fui chamado sr');
    const ifFirstLetter = searchType === 'first-letter' && searchItem.length >= 2;
    if (ifFirstLetter === true) {
      return global.alert('Your search must have only 1 (one) character');
    }

    if (title === 'Meals') {
      return mealsHandle();
    }
    if (title === 'Drinks') {
      return drinkHandle();
    }
  };

  return (
    <div className="search-header">
      <div className="search-header-radio">
        <label htmlFor="ingredient-search-radio">
          Ingredients
          <input
            value="ingredient"
            onClick={ onClickSearchType }
            name="search-type"
            data-testid="ingredient-search-radio"
            type="radio"
          />
        </label>
        <label htmlFor="name-search-radio">
          Name
          <input
            value="name"
            onClick={ onClickSearchType }
            name="search-type"
            data-testid="name-search-radio"
            type="radio"
          />
        </label>
        <label htmlFor="first-letter-search-radio">
          First letter
          <input
            value="first-letter"
            onClick={ onClickSearchType }
            name="search-type"
            data-testid="first-letter-search-radio"
            type="radio"
          />
        </label>
      </div>
      <button
        onClick={ searchRecipe }
        type="button"
        data-testid="exec-search-btn"
      >
        SEARCH
      </button>

    </div>

  );
}
