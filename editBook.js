document.addEventListener("DOMContentLoaded", async () => {
  const query = location.search;
  const params = new URLSearchParams(query);
  const id = params.get("id"); // ambil id

  const API_ENDPOINT = `https://v1.appbackend.io/v1/rows/qs57h6ZeWDpr/${id}`;

  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const yearInput = document.getElementById("year");
  const descInput = document.getElementById("desc");
  const form = document.getElementById("form");

  // Mengisi form dengan data buku saat ini
  const book = await fetch(API_ENDPOINT)
    .then((response) => response.json())
    .catch((error) => console.error("Failed to fetch book data:", error));

  if (book) {
    titleInput.value = book.title;
    authorInput.value = book.author;
    yearInput.value = book.year.split("-")[0];
    descInput.value = book.desc;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Update data buku
    const res = await fetch("https://v1.appbackend.io/v1/rows/qs57h6ZeWDpr", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        title: titleInput.value,
        desc: descInput.value,
        author: authorInput.value,
        year: yearInput.value,
      }),
    });

    if (res.ok) {
      alert("Book updated successfully!");
      // Mengirim pesan ke parent untuk menutup modal
      window.parent.postMessage("closeModal", "*"); // Gunakan origin yang lebih spesifik daripada '*' jika Anda tahu origin tepatnya
    } else {
      const errorData = await res.json();
      alert(`Failed to update book: ${errorData.message}`);
    }
  });
});
