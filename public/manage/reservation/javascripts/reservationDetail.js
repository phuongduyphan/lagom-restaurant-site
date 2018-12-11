const locationArr = window.location.href.split('/');
const reservationId = locationArr[locationArr.length - 1];

window.addEventListener('load', async () => {
  const result = await axios.get(`/api/reservations/alls/${reservationId}`);
  const reservation = result.data[0];
  console.log(reservation);

  document.getElementById('name').value = reservation.users.userFullName;
  document.getElementById('phone-number').value = reservation.users.userPhoneNumber;
  document.getElementById('email').value = reservation.users.userEmail;
  document.getElementById('arrival-date').value = reservation.arrivalDate;
  document.getElementById('arrival-time').value = reservation.arrivalTime;
  document.getElementById('party-size').value = reservation.partySize;
  document.getElementById('special-requests').value = reservation.specialRequests;
  document.getElementById('reservation-status').value = reservation.status;

  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', async () => {
    const updatedReservation = {
      status: document.getElementById('reservation-status').value
    };
    try {
      await axios.put(`/api/reservations/${reservationId}`, { reservation: updatedReservation });
      alert('Success');
    } catch (err) {
      alert('Something wrong. Try again later');
    }
  });
});