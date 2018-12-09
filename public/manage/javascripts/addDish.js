const submitButton = document.getElementById('submit-button');

function resetForm(form) {
  // clearing inputs
  var inputs = form.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    switch (inputs[i].type) {
      // case 'hidden':
      case 'text':
        inputs[i].value = '';
        break;
      case 'radio':
      case 'checkbox':
        inputs[i].checked = false;
    }
  }

  // clearing selects
  var selects = form.getElementsByTagName('select');
  for (var i = 0; i < selects.length; i++)
    selects[i].selectedIndex = 0;

  // clearing textarea
  var text = form.getElementsByTagName('textarea');
  for (var i = 0; i < text.length; i++)
    text[i].value = '';
}

submitButton.addEventListener('click', async () => {
  try {
    const dish = {
      dishName: document.getElementById('dish-name').value,
      dishDescription: document.getElementById('dish-description').value,
      dishPrice: document.getElementById('dish-price').value,
      dishStatus: document.getElementById('dish-status').value,
      dishCategory: document.getElementById('dish-category').value
    };

    const url = '/api/dishes';
    await axios.post(url, { dish });
    alert('Success');
    resetForm(document.getElementById('dish-form'));
  } catch (err) {
    alert('There is something wrong. Pls try again later');
  }
});