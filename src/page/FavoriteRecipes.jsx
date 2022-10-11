import React, { useContext, useEffect, useState } from 'react';
import context from '../contexts/ContextRecipe';
import Header from '../component/Header';
import Filters from '../component/Filters';
import RecipeCard from '../component/RecipeCard';

function FavoriteRecipes() {
  const { setTitle, setShowHeaderButtons } = useContext(context);
  const favoritesRecipes = JSON
    .parse(localStorage.getItem('favoriteRecipes'));
  const [filters, setFilters] = useState('all');
  const [favorites, setFavorites] = useState(favoritesRecipes);

  useEffect(() => {
    setShowHeaderButtons({
      profile: true,
      search: false,
    });
    setTitle('Favorite Recipes');
  }, []);

  useEffect(() => {
    console.log('Filters value: ', filters);
    if (filters === 'all') {
      setFavorites(favoritesRecipes);
    } else {
      const filteredRecipes = favoritesRecipes.filter((done) => done.type === filters);
      setFavorites(filteredRecipes);
    }
  }, [filters]);

  const updateFav = () => {
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorite-page-html">
        <Header />
        <div className="favorite-page-content">
          <p className="not-favorite">Não existe nenhuma receita salva!</p>
        </div>

      </div>
    );
  }

  return (
    <div>
      <Header />
      <Filters setFilters={ setFilters } />
      {favorites && (
        <RecipeCard
          recipe={ favorites }
          isFavorite
          handleUpdate={ updateFav }
        />
      )}
    </div>
  );
}
export default FavoriteRecipes;
