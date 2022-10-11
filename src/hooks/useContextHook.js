import { useState } from 'react';

const useContextHook = () => {
  const [showInputSearch, setShowInputSearch] = useState({ inputSearch: false });
  const [showHeaderButtons, setShowHeaderButtons] = useState({
    profile: true,
    search: true,
    inputSearch: false,
  });
  const [searchType, setSearchType] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [title, setTitle] = useState('');
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);

  return {
    searchItem,
    setSearchItem,
    searchType,
    setSearchType,
    showHeaderButtons,
    setShowHeaderButtons,
    title,
    setTitle,
    mealsCategories,
    setMealsCategories,
    drinksCategories,
    setDrinksCategories,
    dataMeals,
    setDataMeals,
    dataDrinks,
    setDataDrinks,
    selectedMeal,
    setSelectedMeal,
    selectedDrink,
    setSelectedDrink,
    showInputSearch,
    setShowInputSearch,
  };
};

export default useContextHook;
