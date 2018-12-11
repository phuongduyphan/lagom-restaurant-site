const reservationButton = document.getElementById('reservation-button');

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
      case 'tel':
        inputs[i].value = '';
      case 'date':
        inputs[i].value = '';
      case 'time': 
        inputs[i].value = '';
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

reservationButton.addEventListener('click', async () => {
  try {
    let reservation = {
      arrivalDate: document.getElementById('arrival-date').value,
      arrivalTime: document.getElementById('arrival-time').value,
      partySize: document.getElementById('party-size').value,
      specialRequests: document.getElementById('special-requests').value,
      users: {
        userFullName: document.getElementById('name').value,
        userPhoneNumber: document.getElementById('phone-number').value,
        userEmail: document.getElementById('email').value
      }
    };
    await axios.post('/api/reservations', { reservation });
    alert('Success');
    resetForm(document.getElementById('reservation-form'));
  } catch (err) {
    alert('Something wrong. Try again later');
  }
});