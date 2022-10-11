async function fetchMealsCategories() {
  try {
    const getList = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const dataMealsCategory = await getList.json();
    return dataMealsCategory;
  } catch (error) {
    console.log(error);
  }
}

export default fetchMealsCategories;
