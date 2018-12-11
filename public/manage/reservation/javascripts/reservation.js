const statusButton = document.getElementById('reservation-status');
const date = document.getElementById('reservation-date');
const wrapper = document.getElementById('reservation-wrapper');

async function render(status, date) {
  let result;
  console.log(date);
  if (date) {
    result = await axios.get(`/api/reservations/${status}/?arrivalDate=${date}`);
  }
  else {
    result = await axios.get(`/api/reservations/${status}`);
  }
  console.log(result);

  const listOfReservations = result.data;
  let htmlContent = '';
  let element;
  let textColor;
  
  switch (status) {
    case 'pending':
      textColor = 'yellow';
      break;
    case 'confirmed': 
      textColor = 'green';
      break;
    case 'declined': 
      textColor = 'red';
      break;
  }

  for (let i = 0; i < listOfReservations.length; i++) {
    element = listOfReservations[i];
    let style = '';
    if (i % 2 !== 0) style = 'background-color: #f5f5f5';
    if (!element.specialRequests) element.specialRequests = '';
    htmlContent += `
      <div class="reservation-container" style="${style}">
      <div class="row">
        <p class="header">Date</p>
        <p class="content">${element.arrivalDate}</p>
      </div>

      <div class="row">
        <p class="header">Time</p>
        <p class="content">${element.arrivalTime}</p>
      </div>

      <div class="row">
        <p class="header">Id</p>
        <p class="content">${element.reservationId}</p>
      </div>

      <div class="row">
        <p class="header">Name</p>
        <p class="content">${element.users.userFullName}</p>
      </div>

      <div class="row">
        <p class="header">Phone Number</p>
        <p class="content">${element.users.userPhoneNumber}</p>
      </div>

      <div class="row">
        <p class="header">Email</p>
        <p class="content">${element.users.userEmail}</p>
      </div>

      <div class="row">
        <p class="header">Party Size</p>
        <p class="content">${element.partySize}</p>
      </div>

      <div class="row">
        <p class="header">Special Requests</p>
        <p class="content">${element.specialRequests}</p>
      </div>

      <div class="row">
        <p class="header">Status</p>
        <p class="content" style="color: ${textColor}">${element.status}</p>
      </div>

      <a href="/manage/reservation/${element.reservationId}" target="_blank">Detail</a>
    </div>`;
  };
  wrapper.innerHTML = htmlContent;
}

window.addEventListener('load', async () => {
  console.log('OK');
  await render(statusButton.value, date.value);

  statusButton.addEventListener('change', async () => {
    render(statusButton.value, date.value);
  });

  date.addEventListener('change', async () => {
    render(statusButton.value, date.value);
  });
});