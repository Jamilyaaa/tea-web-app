const logginForm = document.querySelector("#logginForm");

logginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { email, password } = event.target;
  const response = await fetch("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });
  const data = await response.json();
  
  if (response.ok) {
    window.location.href = `/users/lk/${data.id}`;
  } else alert(data.message);
});
