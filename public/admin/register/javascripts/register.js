const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', async () => {
  try {
    const admin = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    };
    const secretCode = document.getElementById('secret-code').value;

    const res = await axios.post('/api/admins/register', { admin, secretCode });
    window.location.href = '/admin/login';
  } catch (err) {
    alert(err.response.data.message);
  }
});