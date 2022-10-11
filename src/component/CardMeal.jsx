import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../contexts/ContextRecipe';
import './CardMealAndDrink.css';

function CardMeal() {
  const history = useHistory();
  const { dataMeals, setSelectedMeal } = useContext(context);
  const renderLimit = 12;

  return (
    <div className="card-drink-meal-css ">
      {dataMeals && dataMeals.map((meal, i) => (
        i < renderLimit && (
          <div
            className="only-card-drink-meal"
            key={ meal.idMeal }
            data-testid={ `${i}-recipe-card` }
            role="button"
            tabIndex={ 0 }
            onClick={ () => {
              setSelectedMeal(meal.idMeal);
              history.push(`/meals/${meal.idMeal}`);
            } }
            onKeyPress={ () => { history.push(`/meals/${meal.idMeal}`); } }
          >
            <img
              data-testid={ `${i}-card-img` }
              src={ meal.strMealThumb }
              alt={ `meal-${i}` }
            />
            <h2
              data-testid={ `${i}-card-name` }
            >
              {meal.strMeal}
            </h2>
          </div>
        )
      ))}
    </div>
  );
}

export default CardMeal;
