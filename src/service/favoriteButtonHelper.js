const favoriteButtonHelper = (isFavoritePage, path, details) => {
  if (isFavoritePage) {
    return {
      id: details.id,
      name: details.name,
      image: details.image,
      alcoholicOrNot: details.alcoholicOrNot,
      area: details.area,
      type: details.type,
      category: details.category,
    };
  } if (path.includes('meals')) {
    return {
      id: details.idMeal,
      name: details.strMeal,
      image: details.strMealThumb,
      alcoholicOrNot: '',
      area: details.strArea,
      type: 'meal',
      category: details.strCategory,
    };
  }
  return {
    id: details.idDrink,
    name: details.strDrink,
    image: details.strDrinkThumb,
    alcoholicOrNot: details.strAlcoholic,
    area: '',
    type: 'drink',
    category: details.strCategory,
  };
};

export default favoriteButtonHelper;
