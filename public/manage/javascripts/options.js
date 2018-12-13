function delete_cookie(name) {
  const expires = 'Thu, 01 Jan 1970 00:00:01 GMT';
  document.cookie = `${name}=;expires=${expires};path=/;`;
}

const signOutLink = document.getElementById('sign-out-link');

signOutLink.addEventListener('click', () => {
  delete_cookie('jwt');
  window.location.href = '/admin/login';
});