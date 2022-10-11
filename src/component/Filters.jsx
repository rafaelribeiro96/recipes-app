import React from 'react';
import PropTypes from 'prop-types';

function Filters({ setFilters }) {
  const handleClick = ({ target }) => {
    const text = target.innerHTML;
    if (text === 'All') {
      setFilters('all');
    } else if (text === 'Meals') {
      setFilters('meal');
    } else if (text === 'Drinks') {
      setFilters('drink');
    }
  };

  return (
    <div className="category-area-done">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleClick }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleClick }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleClick }
      >
        Drinks
      </button>
    </div>
  );
}

Filters.propTypes = {
  setFilters: PropTypes.func.isRequired,
};

export default Filters;
