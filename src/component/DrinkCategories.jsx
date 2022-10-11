import React, { useContext, useState } from 'react';
import context from '../contexts/ContextRecipe';
import fetchDrinks from '../service/fetchDrinks';
import './Categories.css';

function DrinkCategories() {
  const { drinksCategories, setDataDrinks } = useContext(context);
  const [currentCategory, setCurrentCategory] = useState('');
  const renderLimit = 5;

  const handleCategory = async ({ target }) => {
    if (currentCategory === target.value) {
      const filterCategory = await fetchDrinks('name', '');
      setDataDrinks(filterCategory.drinks);
      setCurrentCategory('');
    } else {
      const filterCategory = await fetchDrinks('category', target.value);
      setDataDrinks(filterCategory.drinks);
      setCurrentCategory(target.value);
    }
  };

  const handleFilters = async () => {
    const allFilter = await fetchDrinks('name', '');
    setDataDrinks(allFilter.drinks);
  };

  return (
    <section className="category-area">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleFilters }
      >
        All
      </button>
      { drinksCategories && drinksCategories.map((category, i) => (
        i < renderLimit && (
          <button
            value={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
            key={ i }
            onClick={ handleCategory }
          >
            { category.strCategory }
          </button>
        )
      )) }
    </section>
  );
}

export default DrinkCategories;
