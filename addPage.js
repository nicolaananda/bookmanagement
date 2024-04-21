const API_ENDPOINT = `https://v1.appbackend.io/v1/rows/qs57h6ZeWDpr`;
const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target); // Corrected 'new FormData'

  const title = formData.get("title");
  const author = formData.get("author");
  const year = formData.get("year");
  const desc = formData.get("desc");
  const publisher = formData.get("publisher");
  const category = formData.get("category");
  const cover = formData.get("cover");
  await createData(title, desc, author, year, publisher, category, cover);

  //   console.log({ title, author, year, desc, publisher, category, cover });
});

async function createData(
  title,
  desc,
  author,
  year,
  publisher,
  category,
  cover
) {
  const res = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        title,
        desc,
        author,
        year,
        publisher,
        category,
        cover,
      },
    ]),
  });
  const data = await res.json();
  return data;
}
