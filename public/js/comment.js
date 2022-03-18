const addComment = document.querySelector("#addComment");

addComment.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { commnet } = event.target;
  const response = await fetch("/tea/:id", {
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

  }
});
