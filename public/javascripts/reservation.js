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

function isValidForm() {
  let reservationForm = {
    arrivalDate: document.getElementById('arrival-date'),
    arrivalTime: document.getElementById('arrival-time'),
    partySize: document.getElementById('party-size'),
    specialRequests: document.getElementById('special-requests'),
    users: {
      userFullName: document.getElementById('name'),
      userPhoneNumber: document.getElementById('phone-number'),
      userEmail: document.getElementById('email')
    }
  };
  return reservationForm.arrivalDate.checkValidity() && reservationForm.arrivalTime.checkValidity() && 
    reservationForm.partySize.checkValidity() && reservationForm.users.userFullName.checkValidity() 
    && reservationForm.users.userPhoneNumber.checkValidity() && reservationForm.users.userEmail.checkValidity();
}

reservationButton.addEventListener('click', async () => {
  if (!isValidForm()) return;
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
    reservationButton.disabled = true;
    await axios.post('/api/reservations', { reservation });
    alert('Success');
    resetForm(document.getElementById('reservation-form'));
    reservationButton.disabled = false;
  } catch (err) {
    alert('Something wrong. Try again later');
    reservationButton.disabled = false;
  }
});