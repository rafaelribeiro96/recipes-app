async function fetchDrinksCategories() {
  try {
    const getList = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const dataDrinksCategories = await getList.json();
    return dataDrinksCategories;
  } catch (error) {
    console.log(error);
  }
}

export default fetchDrinksCategories;
