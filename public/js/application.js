const regForm = document.querySelector('#regForm');

regForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { login, email, password } = event.target;
  const response = await fetch('/users/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: login.value,
      email: email.value,
      password: password.value,
    }),
  });
  if (response.ok) {
    window.location.href = '/users/login';
  } else alert('awful');
});
