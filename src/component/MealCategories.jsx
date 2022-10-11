import React, { useContext, useState } from 'react';
import context from '../contexts/ContextRecipe';
import fetchMeals from '../service/fetchMeals';
import './Categories.css';

function MealCategories() {
  const { mealsCategories, setDataMeals } = useContext(context);
  const [currentCategory, setCurrentCategory] = useState('');
  const renderLimit = 5;

  const handleCategory = async ({ target }) => {
    if (currentCategory === target.value) {
      const filterCategory = await fetchMeals('name', '');
      setDataMeals(filterCategory.meals);
      setCurrentCategory('');
    } else {
      const filterCategory = await fetchMeals('category', target.value);
      setDataMeals(filterCategory.meals);
      setCurrentCategory(target.value);
    }
  };

  const handleFilters = async () => {
    const allFilter = await fetchMeals('name', '');
    setDataMeals(allFilter.meals);
  };

  return (
    <div className="category-area">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleFilters }
      >
        All
      </button>
      { mealsCategories && mealsCategories.map((category, i) => (
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
    </div>
  );
}

export default MealCategories;
