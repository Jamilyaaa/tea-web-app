const regForm = document.querySelector("#regForm");

regForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { login, email, password } = event.target;
  const response = await fetch("/users/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: login.value,
      email: email.value,
      password: password.value,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    window.location.href = `/users/lk/${data.id}`;
  } else alert(data.message);
});
