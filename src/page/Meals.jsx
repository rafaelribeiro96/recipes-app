import React, { useEffect, useContext } from 'react';
import context from '../contexts/ContextRecipe';
import Recipes from '../component/Recipes';
import fetchMealsCategories from '../service/fetchMealsCategories';
import Footer from '../component/Footer';
import Header from '../component/Header';

export default function Meals() {
  const { title, setTitle,
    setMealsCategories, setShowHeaderButtons } = useContext(context);

  useEffect(() => {
    setShowHeaderButtons({
      profile: true,
      search: true,
    });
    async function getMealsCategories() {
      const data = await fetchMealsCategories();
      setMealsCategories(data.meals);
    }
    getMealsCategories();
    setTitle('Meals');
  }, []);
  // f

  return (

    <div>
      <Header />
      { title === 'Meals' && <Recipes /> }
      <Footer />
    </div>
  );
}
