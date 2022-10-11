import React from 'react';
import PropTypes from 'prop-types';
import ContextRecipe from './ContextRecipe';
import useContextHook from '../hooks/useContextHook';

function Provider({ children }) {
  const {
    searchItem,
    setSearchItem,
    searchType,
    setSearchType,
    showHeaderButtons,
    setShowHeaderButtons,
    title,
    setTitle,
    mealsCategories,
    setMealsCategories,
    drinksCategories,
    setDrinksCategories,
    dataMeals,
    setDataMeals,
    dataDrinks,
    setDataDrinks,
    selectedMeal,
    setSelectedMeal,
    selectedDrink,
    setSelectedDrink,
    showInputSearch,
    setShowInputSearch,
  } = useContextHook();

  const value = {
    searchItem,
    setSearchItem,
    searchType,
    setSearchType,
    showHeaderButtons,
    setShowHeaderButtons,
    title,
    setTitle,
    mealsCategories,
    setMealsCategories,
    drinksCategories,
    setDrinksCategories,
    dataMeals,
    setDataMeals,
    dataDrinks,
    setDataDrinks,
    selectedMeal,
    setSelectedMeal,
    selectedDrink,
    setSelectedDrink,
    showInputSearch,
    setShowInputSearch,
  };

  return (
    <ContextRecipe.Provider value={ value }>
      {children}
    </ContextRecipe.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
