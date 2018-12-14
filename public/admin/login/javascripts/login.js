const submitButton = document.getElementById('submit-button');

console.log(document.cookie);

submitButton.addEventListener('click', async () => {
  try {
    const admin = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    };

    const res = await axios.post('/api/admins/login', { admin });
    console.log('OK');
    window.location.href = '/manage';
  } catch (err) {
    alert(err.response.data.message);
  }
});