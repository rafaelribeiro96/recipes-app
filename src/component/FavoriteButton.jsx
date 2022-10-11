import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import favoriteButtonHelper from '../service/favoriteButtonHelper';

function FavoriteButton({ recipeDetails, isFavorite, handleUpdate, testId }) {
  const [image, setImage] = useState(whiteHeartIcon);
  const location = useLocation();
  const path = location.pathname;

  const favorite = favoriteButtonHelper(isFavorite, path, recipeDetails);
  const { id } = favorite;

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const checkFavorite = recipes.some((element) => element.id === id);
      if (checkFavorite) {
        setImage(blackHeartIcon);
      }
    }
  }, [id]);

  const handleFavorite = () => {
    if (image === blackHeartIcon) {
      setImage(whiteHeartIcon);
      const favItem = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const favFiltered = favItem.filter((element) => element.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favFiltered));
      localStorage.setItem('img', whiteHeartIcon);
    } if (image === whiteHeartIcon) {
      setImage(blackHeartIcon);
      localStorage.setItem('img', blackHeartIcon);
      if (!localStorage.getItem('favoriteRecipes')) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
      } else {
        const exist = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const arr = [...exist, favorite];
        localStorage.setItem('favoriteRecipes', JSON.stringify(arr));
      }
    }
    if (isFavorite) {
      handleUpdate();
    }
  };

  return (
    <input
      type="image"
      data-testid={ testId }
      onClick={ handleFavorite }
      src={ image }
      alt="favorite"
    />
  );
}

FavoriteButton.propTypes = {
  recipeDetails: PropTypes.objectOf(PropTypes.string).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
};

export default FavoriteButton;
