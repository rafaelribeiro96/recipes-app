async function fetchMeals(type, query) {
  try {
    if (type === 'name') {
      const getByName = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const dataName = await getByName.json();
      return dataName;
    } if (type === 'category') {
      const getByCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`);
      const dataCategory = await getByCategory.json();
      return dataCategory;
    } if (type === 'ingredient') {
      const getByCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);
      const dataCategory = await getByCategory.json();
      return dataCategory;
    } if (type === 'first-letter') {
      const getByCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`);
      const dataCategory = await getByCategory.json();
      return dataCategory;
    }
    if (type === 'id') {
      const getById = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${query}`);
      const dataId = await getById.json();
      return dataId.meals[0];
    }
  } catch (error) {
    console.log(error);
  }
}

export default fetchMeals;
