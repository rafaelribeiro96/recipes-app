import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteButton from './FavoriteButton';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeCard({ recipe, isFavorite, handleUpdate }) {
  const [msg, setMsg] = useState(false);
  const [msgIndex, setMsgIndex] = useState();

  const changeAlert = (index) => {
    setMsgIndex(index);
    const twoSeconds = 2000;
    setMsg(true);
    setTimeout(() => {
      setMsg(false);
    }, twoSeconds);
  };

  const actualLink = window.location.origin;

  return (
    <div>
      {recipe ? recipe
        .map((element, index) => (
          <div
            key={ index }
            className="content-done-recipes"
          >
            {console.log(element, index)}
            <div>
              <Link to={ `/${element.type}s/${element.id}` }>
                <img
                  src={ element.image }
                  alt={ element.name }
                  data-testid={ `${index}-horizontal-image` }
                  className="recipe-image"
                />
              </Link>
            </div>
            <div className="buttons-favorite-page">
              <div>
                <div
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {element.type === 'meal'
                    ? <p>{`${element.nationality} - ${element.category}`}</p>
                    : <p>{element.alcoholicOrNot}</p>}
                </div>
                <input
                  type="image"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => {
                    (copy(`${actualLink}/${element.type}s/${element.id}`));
                    changeAlert(index);
                  } }
                  src={ shareIcon }
                  alt="share"
                />
                {isFavorite && (<FavoriteButton
                  handleUpdate={ handleUpdate }
                  testId={ `${index}-horizontal-favorite-btn` }
                  isFavorite
                  recipeDetails={ element }
                />)}
              </div>
              {index === msgIndex
                ? <p hidden={ !msg }> Link copied! </p> : ''}
              <Link to={ `/${element.type}s/${element.id}` }>
                <p className="link-favorite" data-testid={ `${index}-horizontal-name` }>
                  {element.name}
                </p>
              </Link>
              {!isFavorite && (
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {`Feito em: ${element.doneDate}`}
                </p>)}
              <div className="tags">
                {element.tags ? element.tags.splice(0, 2).map((item, i) => (
                  <p key={ i } data-testid={ `${i}-${item}-horizontal-tag` }>
                    {item}
                  </p>
                )) : ''}
              </div>
            </div>
          </div>
        )) : 'loading'}
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.instanceOf(Array).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default RecipeCard;
