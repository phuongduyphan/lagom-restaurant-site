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
    const statusCode = err.response.status;
    switch (statusCode) {
      case 404: 
        alert('Username does not exist');
        break;
      case 401: 
        alert('Wrong password');
        break;
    }
  }
});