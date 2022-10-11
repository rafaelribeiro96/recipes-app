import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getFromLocalStorage, pushInLocalStorage } from '../../service/localStorage';
import shareButtonImage from '../../images/shareIcon.svg';
import whiteFavoriteButtonImage from '../../images/whiteHeartIcon.svg';
import blackFavoriteButtonImage from '../../images/blackHeartIcon.svg';
import buttonBack from '../../images/buttonback2.png';

function ShareAndFavoriteButtons({ recipeDetails }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFavoritedRecipe, setIsFavoritedRecipe] = useState(false);
  const { pathname } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    const favoriteRecipes = getFromLocalStorage('favoriteRecipes');
    if (favoriteRecipes) {
      const isFavorited = favoriteRecipes?.some((recipe) => recipe.id === id);
      setIsFavoritedRecipe(isFavorited);
    } else {
      pushInLocalStorage('favoriteRecipes', []);
    }
  }, []);

  const shareRecipe = () => {
    const mealOrDrink = pathname.includes('/meals') ? '/meals/' : '/drinks/';
    navigator.clipboard.writeText(window.location.origin + mealOrDrink + id);
    setCopiedLink(true);
    console.log(window.location.origin + pathname);
  };

  const addAndRemoveFavoriteRecipe = () => {
    const favoriteRecipes = getFromLocalStorage('favoriteRecipes');
    if (favoriteRecipes) {
      const recipe = {
        id,
        type: pathname.includes('/meals') ? 'meal' : 'drink',
        nationality: recipeDetails.strArea || '',
        category: recipeDetails.strCategory || '',
        alcoholicOrNot: recipeDetails.strAlcoholic || '',
        name: recipeDetails.strMeal || recipeDetails.strDrink,
        image: recipeDetails.strMealThumb || recipeDetails.strDrinkThumb,
      };
      if (isFavoritedRecipe) {
        const newFavoriteRecipes = favoriteRecipes.filter(
          (favoriteRecipe) => favoriteRecipe.id !== id,
        );
        pushInLocalStorage('favoriteRecipes', newFavoriteRecipes);
        setIsFavoritedRecipe(false);
      } else {
        pushInLocalStorage('favoriteRecipes', [...favoriteRecipes, recipe]);
        setIsFavoritedRecipe(true);
      }
    } else {
      pushInLocalStorage('favoriteRecipes', [...favoriteRecipes, recipe]);
      setIsFavoritedRecipe(true);
    }
  };

  return (
    <section className="share-favorite">
      <button
        type="button"
        className="button-back"
        onClick={ () => window.history.back() }
      >
        <img src={ buttonBack } alt="button-back" />
      </button>

      <button
        className="favorite-button"
        type="button"
        data-testid="favorite-btn"
        onClick={ addAndRemoveFavoriteRecipe }
        src={ isFavoritedRecipe ? blackFavoriteButtonImage : whiteFavoriteButtonImage }
      >
        <img
          src={ isFavoritedRecipe ? blackFavoriteButtonImage : whiteFavoriteButtonImage }
          // src={ blackFavoriteButtonImage }
          alt="favorite"
        />
      </button>

      <button
        className="share-button"
        type="button"
        data-testid="share-btn"
        onClick={ shareRecipe }
        src={ shareButtonImage }
      >
        <img
          src={ shareButtonImage }
          alt="share"
        />
      </button>
      {copiedLink && <span className="link-copied">Link copied!</span>}

    </section>
  );
}

ShareAndFavoriteButtons.propTypes = {
  recipeDetails: PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
};

export default ShareAndFavoriteButtons;
