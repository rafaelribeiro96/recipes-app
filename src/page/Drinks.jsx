import React, { useEffect, useContext } from 'react';
import context from '../contexts/ContextRecipe';
import Recipes from '../component/Recipes';
import fetchDrinksCategories from '../service/fetchDrinksCategories';
import Footer from '../component/Footer';
import Header from '../component/Header';

export default function Drinks() {
  const { setShowHeaderButtons, title,
    setTitle, setDrinksCategories } = useContext(context);

  useEffect(() => {
    setShowHeaderButtons({
      profile: true,
      search: true,
    });
    async function getDrinksCategories() {
      const data = await fetchDrinksCategories();
      setDrinksCategories(data.drinks);
    }
    getDrinksCategories();
    setTitle('Drinks');
  }, []);
  // f

  return (
    <div className="drinks-css">
      <Header />
      { title === 'Drinks' && <Recipes /> }
      <Footer />

    </div>
  );
}
