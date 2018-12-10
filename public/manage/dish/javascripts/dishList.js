function dishFilter(dishCategory, dishStatus, listOfDishes) {
  return listOfDishes.filter((element) => {
    return (element.dishCategory === dishCategory) && (element.dishStatus === dishStatus);
  });
}

function render(listOfDishes) {
  let container = document.getElementById('dish-container');
  let htmlContent = '';

  listOfDishes.forEach((element) => {
    htmlContent += `<div class="col-10 offset-1 dish">
    <h3 class="dish-name">${element.dishName}</h3>
    <p class="dish-price">${element.dishPrice}</p>
    <p class="dish-description">${element.dishDescription}</p>
    <a href="/manage/edit/${element.dishId}" target="_blank">Edit</a>
  </div>`;
  });
  container.innerHTML = htmlContent;
}

window.addEventListener('load', async () => {
  let result = await axios.get('/api/dishes');
  let listOfDishes = result.data;

  let tabPanel = document.getElementById('tab-panel');

  let list = Array.from(tabPanel.children);
  let dishCategory;
  list.forEach(element => {
    dishCategory = element.children[0].classList.contains('active') ? element.dataset.dishCategory : dishCategory;
  });

  let dishStatusFilter = document.getElementById('dish-status');
  let dishStatus = dishStatusFilter.value;

  let listOfCategoryDishes = dishFilter(dishCategory, dishStatus, listOfDishes);
  render(listOfCategoryDishes);

  dishStatusFilter.addEventListener('change', () => {
    dishStatus = dishStatusFilter.value;
    let dishFilterList = dishFilter(dishCategory, dishStatus, listOfDishes);
    render(dishFilterList);
  });
});