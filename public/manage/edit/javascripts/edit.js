const locationArr = window.location.href.split('/');
const dishId = locationArr[locationArr.length - 1];

window.addEventListener('load', async () => {
  const result = await axios.get(`/api/dishes/${dishId}`);
  const dish = result.data[0];
  
  const dishName = document.getElementById('dish-name');
  const dishDescription = document.getElementById('dish-description');
  const dishPrice = document.getElementById('dish-price');
  const dishStatus = document.getElementById('dish-status');
  const dishCategory = document.getElementById('dish-category');
  dishName.value = dish.dishName;
  dishDescription.value = dish.dishDescription;
  dishPrice.value = dish.dishPrice;
  dishStatus.value = dish.dishStatus;
  dishCategory.value = dish.dishCategory;

  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', async () => {
    const updatedDish = {
      dishName: dishName.value,
      dishDescription: dishDescription.value,
      dishPrice: dishPrice.value,
      dishStatus: dishStatus.value,
      dishCategory: dishCategory.value,
    };
    await axios.put(`/api/dishes/${dishId}`, { dish: updatedDish });
    alert('Success');
  });

  const removeButton = document.getElementById('remove-button');
  removeButton.addEventListener('click', async () => {
    await axios.delete(`/api/dishes/${dishId}`);
    alert('Dish successfully removed');
  });
});