const addComment = document.querySelector("#addComment");

addComment.addEventListener("submit", async (event) => {
  event.preventDefault();
  const body_text = event.target.commnet;
  const cactus = window.location.href.split("/");
  const id = cactus[cactus.length - 1];
  const response = await fetch(`/users/tea/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body_text: body_text.value,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    document.getElementById("textComment").innerText = data.body_text;
  } else alert("oops");
});
