const locationArr = window.location.href.split('/');
const dishId = locationArr[locationArr.length - 1];

window.addEventListener('load', async () => {
  const dish = await axios.get('/', { dishId });
  console.log(dish);
});